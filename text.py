import json, requests


txt = "DedeUserID=78&DedeUserID__ckMd5=ba7282a8b10&Expires=155&SESSDATA=948a1a87%%2Ce8be3%2A91&bili_jct=40b9821413c9fd7770f&"
DedeUserID = txt.split('&')[0]
SESSDATA = txt.split('&')[3]
bili_jct = txt.split('&')[4]
headers = {'Content-Type': 'application/json'}
text = {'DedeUserID': 'DedeUserID=11573578', 'SESSDATA': 'SESSDATA=1b52aa9a%2C1647778515%2C8f737%2A91', 'bili_jct': 'bili_jct=d72daf2734e9a648ddec1954a40ccf14', 'email': '2461006717@qq.com'}
print(requests.request('post','http://127.0.0.1:8000/b/create_user/', json=text,headers=headers))