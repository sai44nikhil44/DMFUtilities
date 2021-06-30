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
        return_list = []
        for rec in records:
            return_list.append(
                {key.lower().strip(): val.strip() for key, val in rec.items()})
        return return_list

    def post(self):
        data['source'] = self.clean_data(request.get_json()['source'])
        data['target'] = self.clean_data(request.get_json()['target'])

        return 'SUCCESS', 201

    def get(self):
        output = []
        for s_tab in data['source']:
            for t_tab in data['target']:
                if t_tab['table'] == s_tab['table']:
                    src_rec = s_tab['records']
                    tar_rec = t_tab['records']
                    output.append({'table': s_tab['table'], 'Description': s_tab['description'], 'SourceRecords': src_rec,
                                   'TargetRecords': tar_rec, 'Difference': str(int(src_rec)-int(tar_rec))})
                    break
            else:
                output.append({'table': s_tab['table'], 'Description': s_tab['description'], 'SourceRecords': src_rec,
                               'TargetRecords': '0', 'Difference': str(int(src_rec)-int('0'))})

        return output


api.add_resource(generate_report, '/')


if __name__ == '__main__':
    app.run(debug=True)
