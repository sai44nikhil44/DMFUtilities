from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource
from utils import *

app = Flask(__name__)
api = Api(app)
CORS(app)

data_ln2ln = {}


class ln2ln_generate_report(Resource):

    def post(self):
        xl_list = ['source', 'target', 'mig_run', 'rec_count']
        for xl in xl_list:
            if request.get_json().get(xl, 0):
                data_ln2ln[xl] = clean_data(request.get_json()[xl], xl)
        return 'SUCCESS', 201

    def get(self):
        return get_util(data_ln2ln, 'LN2LN')


data_a2ln = {}


class a2ln_generate_report(Resource):
    '''
    It Take 5 Excel Sheets - 2 exported from Access and 3 from LN.
    Access Exported Excels - Extarcts Import Results and Extracts Validation Results.
    LN Exported Excels - Migration Run(s) Exported, Count Rows of Tables before Migaration, Count Rows of Tables after Migaration
    '''

    def post(self):
        xl_list = ['import', 'validation', 'source',
                   'target', 'mig_run', 'rec_count']
        for xl in xl_list:
            if request.get_json().get(xl, 0):
                data_a2ln[xl] = clean_data(request.get_json()[xl], xl)

        return 'SUCCESS', 201

    def get(self):
        return get_util(data_a2ln, 'A2LN')


class duplicate_preview(Resource):
    def post(self):

        return dup_finder(**request.get_json())

    def get(self):
        pass


api.add_resource(ln2ln_generate_report, '/ln2ln')
api.add_resource(a2ln_generate_report, '/a2ln')
api.add_resource(duplicate_preview, '/dupfind')

if __name__ == '__main__':
    app.run(debug=True)
