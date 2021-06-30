from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
import csv

app = Flask(__name__)
api = Api(app)
CORS(app)

data = {}


class generate_report(Resource):

    def clean_data(self, records):
        return_dict = {}
        for rec in records:
            value = list(rec.values())[0]
            if '|' in value:
                row_list = value.split('|')
                if len(row_list[0].strip()) == 8:
                    return_dict[row_list[0].lower().strip()] = (
                        row_list[1].strip(), int(row_list[2].strip()))
        return return_dict

    def post(self):
        data['source'] = self.clean_data(request.get_json()['source'])
        data['target'] = self.clean_data(request.get_json()['target'])

        return 'SUCCESS', 201

    def get(self):
        output = []
        for s_tab, (s_des, s_rec) in data['source'].items():
            t_des, t_rec = data['target'].get(s_tab, ['NOT FOUND', 0])
            output.append({'table': s_tab, 'Description': s_des, 'SourceRecords': s_rec,
                           'TargetRecords': t_rec, 'Difference': s_rec-t_rec})
        return output


api.add_resource(generate_report, '/')


if __name__ == '__main__':
    app.run(debug=True)
