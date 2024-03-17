from random import randint
import requests
from bs4 import BeautifulSoup
import hashlib
import random
import string


def generate_random_string(length=10):
    # 랜덤 문자열 생성
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for _ in range(length))


def generate_random_hash():
    # 랜덤 문자열 생성
    random_string = generate_random_string()

    # SHA256 해시 계산
    hash_object = hashlib.sha256(random_string.encode())
    random_hash = hash_object.hexdigest()

    return random_hash

def login(login_id, login_pw):
    user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
    headers = {'User-Agent': user_agent,
               'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"}

    session = requests.Session()
    session.headers.update(headers)

    url_login_page = 'https://hi.hana.hs.kr/member/login.asp'
    session.get(url_login_page)

    url_login_proc = 'https://hi.hana.hs.kr/proc/login_proc.asp'
    login_data = {'login_id': login_id, 'login_pw': login_pw, 'x': str(randint(10, 99)), 'y': str(randint(10, 99))}
    res = session.post(url_login_proc, headers={'Referer': url_login_page}, data=login_data)
    if '로그인 정보가 잘못되었습니다.' in res.text:
        return False
    return session


def get_Id_Name(session):
    soup = BeautifulSoup(session.get('https://hi.hana.hs.kr/SYSTEM_Member/Member/MyPage/mypage.asp').text, 'html.parser')
    response = session.get('https://hi.hana.hs.kr/SYSTEM_Member/Member/MyPage/mypage.asp')
    start_index = response.text.find("학번 : ") + len("학번 : ")
    personal_code = response.text[start_index:start_index + 5]
    return personal_code, soup.select('[name="MUsr_Name"]')[0].get('value')
