from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
import csv

app = Flask(__name__)
api = Api(app)
CORS(app)


class HelloWorld(Resource):
    def get(self):
        return {'Source': [1, 2, 3, 4], 'Target': [2, 3, 4, 5]}

    def post(self):
        return {'Tested': 'Posted'}


files = {}


class upload_file(Resource):

    def create_dict(self, file_string):
        line_count = 0
        return_dict = {}
        for i, row in enumerate(csv.DictReader(file_string.splitlines())):
            row = row[None][0].split('|')
            if i < 9 or len(row) < 3:
                continue
            return_dict[row[0].strip()] = int(row[2])
            line_count += 1
        return return_dict

    def post(self):
        files['f1'] = request.files['file1'].read().decode('ascii')
        files['f2'] = request.files['file2'].read().decode('ascii')

        return {'Done': 'Dona'}

    def get(self):
        source = self.create_dict(files['f1'])
        target = self.create_dict(files['f2'])
        output = []
        for k, v in source.items():
            tar_rec = target.get(k, 0)
            output.append({'table': k, 'SourceRecords': v,
                           'TargetRecords': tar_rec, 'Difference': v-tar_rec})

        return {'output': output}


api.add_resource(HelloWorld, '/utilities')
api.add_resource(upload_file, '/test')


if __name__ == '__main__':
    app.run(debug=True)
