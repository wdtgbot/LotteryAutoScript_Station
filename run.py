from fastapi import FastAPI
import uvicorn
from fastapi.staticfiles import StaticFiles
from main import application



app = FastAPI(
    title='FastAPI by spiritlhl',
    description='FastAPI',
    version='1.0.0',
    docs_url='/docs',
    redoc_url='/redocs',
)

#app.mount(path='/static', app=StaticFiles(directory='./static'), name='static')


app.include_router(application, prefix='/b', tags=['Bilibili二叉树抽奖站点'])



if __name__ == '__main__':
    uvicorn.run('run:app', host='0.0.0.0', port=8000, reload=True, debug=True, workers=1)
