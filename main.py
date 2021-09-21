from fastapi import APIRouter, BackgroundTasks, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import qrcode, base64, requests, os
from fake_useragent import UserAgent
from threading import Thread
from io import BytesIO
import http.cookiejar as cookielib
from PIL import Image
from typing import List


requests.packages.urllib3.disable_warnings()
status_qr = 0
session = requests.session()
ua = UserAgent(path='ua.json')
user_agent = ua.chrome
headers = {'User-Agent': user_agent, 'Referer': "https://www.bilibili.com/"}
headerss = {'User-Agent': user_agent,  'Host': 'passport.bilibili.com','Referer': "https://passport.bilibili.com/login"}
qrcodedata = '0'

class showpng(Thread):
    def __init__(self, data):
        Thread.__init__(self)
        self.data = data

    def run(self):
        img = Image.open(BytesIO(self.data))
        img.show()


def islogin(session):
    try:
        session.cookies.load(ignore_discard=True)
    except Exception:
        pass
    loginurl = session.get("https://api.bilibili.com/x/web-interface/nav", verify=False, headers=headers).json()
    if loginurl['code'] == 0:
        print('Cookies值有效，',loginurl['data']['uname'],'，已登录！')
        return session, True
    else:
        print('Cookies值已经失效，请重新扫码登录！')
        return session, False

application = APIRouter()


templates = Jinja2Templates(directory='./templates')

application.mount("/static", StaticFiles(directory="./static"), name="static")

@application.get("/")
def home(request: Request):
    return templates.TemplateResponse(
        "home.html",
        {
            "request": request
        }
    )

@application.get("/login")
def login():
    global oauthKey,session,status_qr
    if not os.path.exists('cookies.txt'):
        with open("cookies.txt", 'w') as f:
            f.write("")
    session = requests.session()
    session.cookies = cookielib.LWPCookieJar(filename='bzcookies.txt')
    session, status = islogin(session)
    if not status:
        getlogin = session.get('https://passport.bilibili.com/qrcode/getLoginUrl', headers=headers).json()
        loginurl = requests.get(getlogin['data']['url'], headers=headers).url
        oauthKey = getlogin['data']['oauthKey']
        qr = qrcode.QRCode()
        qr.add_data(loginurl)
        img = qr.make_image()
        a = BytesIO()
        img.save(a, 'png')
        png = a.getvalue()
        a.close()
        base64_data = base64.b64encode(png)  # 使用base64进行加密
        text = 'data:image/gif;base64,'+str(base64_data)[2:-1]
        status_qr = 1
        return text

def save_ck():
    try:
        tokenurl = 'https://passport.bilibili.com/qrcode/getLoginInfo'
        qrcodedata = session.post(tokenurl, data={'oauthKey': oauthKey, 'gourl': 'https://www.bilibili.com/'},
                                  headers=headerss).json()
        if '-4' in str(qrcodedata['data']):
            return '二维码未失效，请扫码！'
        elif '-5' in str(qrcodedata['data']):
            return '已扫码，请确认！'
        elif '-2' in str(qrcodedata['data']):
            return '二维码已失效，请重新运行！'
        elif 'True' in str(qrcodedata['status']):
            session.get(qrcodedata['data']['url'], headers=headers)
            with open('bilcookies.txt', 'a') as fp:
                fp.write(str(qrcodedata['data']['url'][42:-39])+'\n')
            return '已确认，登入成功！录入成功！'
        else:
            return '未知错误'
    except:
        return '未知错误, 录入失败, 大概率未扫码或扫码失败'
'''
@application.get('/login/sucess')
async def login_sucess(background_tasks: BackgroundTasks):
    text = background_tasks.add_task(save_ck)
    return text
'''

@application.get('/login/sucess')
async def login_sucess():
    text = save_ck()
    return text

@application.get('/readme')
async def readme():
    text = "使用说明：1.二维码加载失败或二维码失效请刷新页面更新;  2.请勿在未扫码成功时点击保存ck，否则系统无法录入ck;  3.保存ck如若见到录入失败，只能刷新页面再次扫码保存，二维码不会动态加载;  4.暂时没做好配置界面，默认只转已关注的up的动态。"
    return text

@application.post('/setting/data')
async def set(data: List):
    return data