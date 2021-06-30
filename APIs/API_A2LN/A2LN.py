from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
import csv
from datetime import date, timedelta

app = Flask(__name__)
api = Api(app)
CORS(app)

data = {}


class generate_report(Resource):

    def clean_data(self, records, xl_type):
        date_1900 = date(1900, 1, 1)
        return_dict = {}
        if xl_type == 'import':
            for key, val in enumerate(records):
                return_dict[key] = {'TableName': val['Imported Table'], 'Date': (date_1900+timedelta(days=int(val['Import Date']))).strftime('%m/%d/%Y'),
                                    'RecordsLoaded': val['Records Loaded'], 'RecordsRejected': val['Records Rejected']}
        if xl_type == 'validation':
            for key, val in enumerate(records):
                return_dict[key] = {
                    'SourceTable': val['Source Table'], 'Message': val['Message']}

        if xl_type == 'mig_run':
            for key, val in enumerate(records):
                error = 'N/A' if val['__EMPTY_23'] == "" else val['__EMPTY_23']
                return_dict[val['__EMPTY_17']] = {'Company': val['__EMPTY_18'], 'Loaded': val['__EMPTY_20'], 'ErrorMessage': error,
                                                  'Date': (date_1900+timedelta(days=int(val['__EMPTY_4']))).strftime('%m/%d/%Y')}

        if xl_type in ['source', 'target']:
            for rec in records:
                value = list(rec.values())[0]
                if '|' in value:
                    row_list = value.split('|')
                    if len(row_list[0].strip()) == 8:
                        return_dict[row_list[0].lower().strip()] = (
                            row_list[1].strip(), int(row_list[2].strip()))

        return return_dict

    def calc_LN(self):
        data['output'] = {}
        for index, (s_tab, (s_des, s_rec)) in enumerate(data['source'].items()):
            t_des, t_rec = data['target'].get(s_tab, ['NOT FOUND', 0])
            mig = data['mig_run'].get(
                s_tab, {0: 'N/A', 1: 'N/A', 2: 'N/A', 3: 'N/A'})
            comp, loaded, error, l_date = mig.values()
            data['output'][index] = {'Table': s_tab, 'Description': s_des, 'CountBefore': s_rec,
                                     'CountAfter': t_rec, 'Difference': s_rec-t_rec,
                                     'Error': error, 'Company': comp, 'Loaded': loaded, 'Date': l_date}

    def post(self):
        xl_list = ['import', 'validation', 'source', 'target', 'mig_run']
        for xl in xl_list:
            if request.get_json().get(xl, 0):
                data[xl] = self.clean_data(request.get_json()[xl], xl)

        return 'SUCCESS', 201

    def get(self):
        keys = data.keys()
        if 'source' in keys and 'target' in keys and 'mig_run' in keys:
            self.calc_LN()
        data.pop('source', 0), data.pop('target', 0), data.pop('mig_run', 0)

        return list(data.values())


api.add_resource(generate_report, '/')


if __name__ == '__main__':
    app.run(debug=True)
