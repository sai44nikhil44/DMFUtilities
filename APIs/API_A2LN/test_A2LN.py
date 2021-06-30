import requests

sample = {
    'import': [
        {
            'Import Date': 44256.4781597222,
            'Imported Table': "ItemsCosting",
            'Records Loaded': 810,
            'Records Rejected': 0},
        {'Imported Table': "Addresses", 'Import Date': 44253.3956365741,
            'Records Loaded': 193, 'Records Rejected': 6},
        {'Imported Table': "BankAccountsByPayByBP", 'Import Date': 44253.3956365741,
            'Records Loaded': 3, 'Records Rejected': 0},
        {'Imported Table': "BankAccountsByPayToBP", 'Import Date': 44253.3956365741,
            'Records Loaded': 10, 'Records Rejected': 0},
        {'Imported Table': "BusinessPartner", 'Import Date': 44253.3956365741,
            'Records Loaded': 110, 'Records Rejected': 6}
    ],
    'validation': [
        {'Source Table': "Addresses",
            'Message': "Duplicate Records found (2)"},
        {'Source Table': "AdjustmentOrders",
            'Message': "Duplicate Records found (2)"},
        {'Source Table': "BankAccountsByPayByBP",
            'Message': "Field [F10] doesn't exist in A2LN template"},
        {'Source Table': "BankAccountsByPayByBP",
            'Message': "Field [F11] doesn't exist in A2LN template"},
        {'Source Table': "BankAccountsByPayByBP",
            'Message': "Field [F12] doesn't exist in A2LN template"},
        {'Source Table': "BankAccountsByPayByBP",
            'Message': "Field [F13] doesn't exist in A2LN template"},
        {'Source Table': "BankAccountsByPayByBP",
            'Message': "Field [F14] doesn't exist in A2LN template"}
    ],
    'source': [
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table    			   Page      :    1':
            'Company: 0061                                        Company   : 0061'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            '----------------------------------------------------------------------------------------------------'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            'Table    | Description                                    | Number of  | Row        | Size (MB)'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            '         |                                                | Records    | length     |'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            '---------+------------------------------------------------+------------+------------+---------------'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            'bobod100 | BOD Metadata and Parameters                    |       229  |        166 |           0.04'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            'bpmdm000 | People Parameters                              |         8  |        261 |           0.00'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table		           Page      :    1':
            'bpmdm001 | Employee People Data					         |       252  |       1466 |           0.35'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            'bptmm100 | Time Data                                      |    238816  |        194 |          44.18'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            'bptmm120 | Production Order Data                          |    238816  |        216 |          49.19'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            'bptmm200 | Detailed History                               |    235215  |        313 |          70.21'}
    ],
    'target': [
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table    			   Page      :    1':
            'Company: 0061                                        Company   : 0061'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            '----------------------------------------------------------------------------------------------------'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            'Table    | Description                                    | Number of  | Row        | Size (MB)'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            '         |                                                | Records    | length     |'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            '---------+------------------------------------------------+------------+------------+---------------'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            'bobod100 | BOD Metadata and Parameters                    |       229  |        166 |           0.04'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            'bpmdm000 | People Parameters                              |         8  |        261 |           0.00'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table		           Page      :    1':
            'bpmdm001 | Employee People Data					         |       252  |       1466 |           0.35'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            'bptmm100 | Time Data                                      |    238816  |        194 |          44.18'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            'bptmm120 | Production Order Data                          |    238816  |        216 |          49.19'},
        {'Date   : 21-02-04 [12:11, Asi] Number of Records by Table                Page      :    1':
            'bptmm200 | Detailed History                               |    235215  |        313 |          70.21'}
    ],
    'mig_run':
    [
        {
            '__EMPTY_2': "IGF_26F",
            '__EMPTY_3': "IGF 26 Feb Run 1",
            '__EMPTY_4': 44253.46238425926,
            '__EMPTY_5': 4200,
            '__EMPTY_6': "IGF_26",
            '__EMPTY_7': "",
            '__EMPTY_8': "Yes",
            '__EMPTY_9': "Yes",
            '__EMPTY_10': 4,
            '__EMPTY_11': 6,
            '__EMPTY_12': 0,
            '__EMPTY_13': 6,
            '__EMPTY_14': "All tables loaded.",
            '__EMPTY_15': "",
            '__EMPTY_16': 0,
            '__EMPTY_17': "bobod100",
            '__EMPTY_18': 4200,
            '__EMPTY_19': "Yes",
            '__EMPTY_20': "Yes",
            '__EMPTY_21': "No",
            '__EMPTY_22': 1,
            '__EMPTY_23': "error t_bod",
        }
    ]

}


BASE = 'http://127.0.0.1:5000/'
respone = requests.post(url=BASE, json=sample)
respone = requests.get(url=BASE)
print(respone.json())
