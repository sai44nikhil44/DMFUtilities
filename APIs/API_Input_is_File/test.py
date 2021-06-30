import requests

BASE = 'http://127.0.0.1:5000/'
myfiles = {'file1': open('count.xls', 'r'), 'file2': open('count.xls', 'r')}
respone = requests.post(url=BASE + 'test', files=myfiles)
respone = requests.get(url=BASE + 'test')
print(respone.json())
