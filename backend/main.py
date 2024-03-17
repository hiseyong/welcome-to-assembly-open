from fastapi import FastAPI, Request, Response, HTTPException, status
from starlette.background import BackgroundTask
from starlette.types import Message
from pydantic import BaseModel
from starlette.middleware.base import BaseHTTPMiddleware
from utils import *
from starlette.middleware.cors import CORSMiddleware
import pymysql
import logging

app = FastAPI()

db_config = {
#     DB 정보는 비공개...
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class intranetData(BaseModel):
    id: str
    pw: str

class acceptData(BaseModel):
    id: str
    hash: str
    isaccept: str

people_pass_name = ['김민준','김수아','김재환','박성현','손우정','손현진','이동현B','이호준','조용준','하진유']
people_pass_id = ['24021','24027','24038','24067','24096','24098','24123','24155','24176','24198','23105']
people_fail_name = ['경민지','김지민','김지우','김한비','이승재','이윤수','이준서A','이창현','정우찬','조예준','최원우']
people_fail_id = ['24002','24042','24043','24050','24131','24136','24142','24147','24169','24175','24196']

@app.post("/api/login")
def index(userInfo:intranetData):
    session = login(userInfo.id, userInfo.pw)
    if not session:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    personal_id, name = get_Id_Name(session)
    ispass = personal_id in people_pass_id# and name in people_pass_name
    isfail = personal_id in people_fail_id# and name in people_fail_name
    isunknown = not ispass and not isfail
    if isunknown:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    connection = pymysql.connect(**db_config)
    cursor = connection.cursor()
    query = f'SELECT * FROM users WHERE id="{personal_id}"'
    cursor.execute(query)
    user = cursor.fetchall()
    hash = generate_random_hash()
    if len(user):
        query = f'UPDATE users SET hash="{hash}" WHERE id="{personal_id}"'
        cursor.execute(query)
        connection.commit()
    else:
        query = f'INSERT INTO users VALUES ("{personal_id}", "{name}", "{hash}","0")'
        cursor.execute(query)
        connection.commit()
    connection.close()
    if len(user):
        return {'id':personal_id, 'name':name, 'ispass':ispass, 'isfail':isfail, 'isunknown':isunknown, 'isaccept':user[0][-1], 'hash':hash}
    else:
        return {'id': personal_id, 'name': name, 'ispass': ispass, 'isfail': isfail, 'isunknown': isunknown, 'isaccept':"0", 'hash': hash}

@app.post("/api/accept")
def index(userInfo:acceptData):
    connection = pymysql.connect(**db_config)
    cursor = connection.cursor()
    query = f'SELECT * FROM users WHERE id="{userInfo.id}"'
    cursor.execute(query)
    user = cursor.fetchall()
    if len(user):
        if user[0][2] == userInfo.hash:
            query = f'UPDATE users SET isaccept="{userInfo.isaccept}" WHERE id="{userInfo.id}"'
            cursor.execute(query)
            connection.commit()
            return
        else:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="BadRequest")