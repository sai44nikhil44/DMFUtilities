from datetime import date, timedelta
import csv


def clean_data(records, xl_type):
    date_1900 = date(1900, 1, 1)
    return_dict = {}
    if xl_type == 'import':
        print("import")
        for key, val in enumerate(records):
            return_dict[key] = {'TableName': val['Imported Table'], 'Date': (date_1900+timedelta(days=int(val['Import Date']))).strftime('%m/%d/%Y'),
                                'RecordsLoaded': val['Records Loaded'], 'RecordsRejected': val['Records Rejected']}
    if xl_type == 'validation':
        for key, val in enumerate(records):
            return_dict[key] = {
                'SourceTable': val['Source Table'], 'Message': val['Message']}

    if xl_type == 'mig_run':
        for key, val in enumerate(records):
            if key == 0:
                continue
            error = 'N/A' if val['__EMPTY_23'] == "" else val['__EMPTY_23']
            return_dict[val['__EMPTY_17']] = {'Company': val['__EMPTY_18'], 'Loaded': val['__EMPTY_20'], 'ErrorMessage': error,
                                              'Date': (date_1900+timedelta(days=int(val['__EMPTY_4']))).strftime('%m/%d/%Y')}

    if xl_type == 'rec_count':
        for key, val in enumerate(records):
            if key == 0:
                continue
            error = 'N/A' if val['__EMPTY_15'] == "" else val['__EMPTY_15']
            return_dict[val['__EMPTY_19']] = {'RecordsLoaded': val['__EMPTY_20'], 'RecordsRejected': val['__EMPTY_21'],
                                              'ErrorMessage': error, 'Company': val['__EMPTY_17'],
                                              'Date': (date_1900+timedelta(days=int(val['__EMPTY_4']))).strftime('%m/%d/%Y'), }

    if xl_type in ['source', 'target']:
        for rec in records:
            value = list(rec.values())[0]
            if '|' in value:
                row_list = value.split('|')
                if len(row_list[0].strip()) == 8:
                    return_dict[row_list[0].lower().strip()] = (
                        row_list[1].strip(), int(row_list[2].strip()))

    return return_dict


def calc_LN(data_dict, usage):
    data_dict['output'] = {}
    for index, (s_tab, (s_des, s_rec)) in enumerate(data_dict['source'].items()):
        _, t_rec = data_dict['target'].get(s_tab, ['NOT FOUND', 0])
        mig = data_dict.get('mig_run', {1: 1}).get(s_tab, 0)
        if mig:
            comp, loaded, error, l_date = mig.values()
        else:
            if usage == 'A2LN':
                continue
            comp, loaded, error, l_date = ('N/A',)*4
        rec = data_dict.get('rec_count', {1: 1}).get(s_tab, 0)
        if rec:
            rec_load, rec_rejected = rec['RecordsLoaded'], rec['RecordsRejected']
            da2_count = rec_load + rec_rejected
        else:
            if usage == 'A2LN':
                continue
            da2_count, rec_load, rec_rejected = (0,)*3
        data_dict['output'][index] = {'Table': s_tab, 'Description': s_des, 'CountBefore': s_rec,
                                      'CountAfter': t_rec, 'Difference': s_rec-t_rec,
                                      'Error': error, 'Company': comp, 'Loaded': loaded,
                                      'RecordsLoaded': rec_load, 'RecordsRejected': rec_rejected,
                                      'da2_count': da2_count, 'Date': l_date}
    data_dict.pop('source', 0)
    data_dict.pop('target', 0)
    data_dict.pop('mig_run', 0)
    data_dict.pop('rec_count', 0)


def a2ln_combined(data_dict):
    with open('AccessTableNames.csv', 'r') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        database_dict = {}
        for row in csv_reader:
            # Converting Table Numbers string to List
            row[2] = row[2].split(',')
            if row[2][0]:  # The Tables List has any table number
                for tab in row[2]:
                    database_dict[tab] = row[1]
    for k, v, in data_dict['output'].items():
        data_dict['output'][k]['TableName'] = database_dict.get(
            v['Table'], 'Other')


def get_util(data_dict, usage):
    dict_keys = data_dict.keys()
    if 'source' in dict_keys and 'target' in dict_keys:
        calc_LN(data_dict, usage)
        a2ln_combined(data_dict)

    return data_dict


def dup_finder(file_name: 'name of the da2 file' = 'bpmdm001.da2',
               delim: 'delimiter in the da2' = '',
               primary_keys: 'index of the primary keys' = [0, 2, 4, 6]):
    with open(file_name, 'r') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=delim)
        row_dict = dict()
        for row in csv_reader:
            row_key = []
            for index in primary_keys:
                row_key.append(row[index])
            row_key = tuple(row_key)
            row_dict[row_key] = row_dict.get(row_key, 0) + 1

    return_list = []
    for k, x in row_dict.items():
        if x > 1:
            return_list.append(k)

    return return_list


def dup_remover():
    raise NotImplementedError
