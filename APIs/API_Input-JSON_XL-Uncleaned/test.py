import requests

sample = {
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
    ]
}


BASE = 'http://127.0.0.1:5000/'
respone = requests.post(url=BASE, json=sample)
respone = requests.get(url=BASE)
print(respone.json())
