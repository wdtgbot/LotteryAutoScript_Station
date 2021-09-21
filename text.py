import re


txt = "DedeUserID=78&DedeUserID__ckMd5=ba7282a8b10&Expires=155&SESSDATA=948a1a87%%2Ce8be3%2A91&bili_jct=40b9821413c9fd7770f&"
DedeUserID = txt.split('&')[0]
SESSDATA = txt.split('&')[3]
bili_jct = txt.split('&')[4]
text = {
  "DedeUserID": "string",
  "SESSDATA": "string",
  "bili_jct": "string",
  "email": "string"
}
temp = dict()
print(type(temp))