import requests

sample = {
    'source':
    [
        {"Table ": "bcdmp000 ", "Description": " Conversion Parameters                          ",
         "Records": "         1  "},
        {"Table ": "bcdmp006 ", "Description": " Table to store DLL Objects                     ",
         "Records": "      3621  "},
        {"Table ": "bcdmp420 ", "Description": " Tables for dump                                ",
         "Records": "      3621  "},
        {"Table ": "bcdmp988 ", "Description": " List of scripts for Repeated I/O               ",
         "Records": "      3621  "}
    ],
    'target':
    [
        {"Table ": "bcdmp000 ", "Description": " Conversion Parameters                          ",
         "Records": "         1  "},
        {"Table ": "bcdmp006 ", "Description": " Table to store DLL Objects                     ",
         "Records": "      3621  "},
        {"Table ": "bcdmp420 ", "Description": " Tables for dump                                ",
         "Records": "      3621  "},
        {"Table ": "bcdmp988 ", "Description": " List of scripts for Repeated I/O               ",
         "Records": "      3621  "}
    ]
}


BASE = 'http://127.0.0.1:5000/'
respone = requests.post(url=BASE + 'test', json=sample)
respone = requests.get(url=BASE + 'test')
print(respone.json())
