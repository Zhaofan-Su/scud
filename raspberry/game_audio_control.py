import numpy as np
from datetime import datetime
import wave
import time
import requests
import pycurl
import base64
import json
import os
import sys
import RPi.GPIO as GPIO

import cv2


from Basic.Motor import t_up, t_down, t_left, t_right, t_stop
from talk import get_talk

save_count = 0
save_buffer = []
t = 0
sum = 0
time_flag = 0
flag_num = 0
filename = 'game_audio_control.wav'
commun = '1'
answer = '1'


flag1 = 0
flag2 = 0


def get_token():
    apiKey = ""
    secretKey = ""
    auth_url = "https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + \
        apiKey + "&client_secret=" + secretKey
    res = requests.get(auth_url)
    print(res.json())
    return res.json()['access_token']


def dump_res(buf):
    #global duihua
    global res

    # print(buf)
    a = eval(buf)
    # print(type(a))
    if a['err_msg'] == 'success.':
        res = a['result'][0]  # print the returned sentence
    else:
        res = ""
        # print duihua


def use_cloud(token):
    fp = wave.open(filename, 'rb')
    nf = fp.getnframes()
    f_len = nf * 2
    audio_data = fp.readframes(nf)
    # cuid = "9691607"  # product id
    cuid = "1537"
    srv_url = 'http://vop.baidu.com/server_api' + '?cuid=' + cuid + '&token=' + token
    http_header = [
        'Content-Type: audio/pcm; rate=16000',
        'Content-Length: %d' % f_len
    ]
    c = pycurl.Curl()
    c.setopt(pycurl.URL, str(srv_url))
    #c.setopt(c.RETURNTRANSFER, 1)
    c.setopt(c.HTTPHEADER, http_header)
    c.setopt(c.POST, 1)
    c.setopt(c.CONNECTTIMEOUT, 30)
    c.setopt(c.TIMEOUT, 30)
    c.setopt(c.WRITEFUNCTION, dump_res)
    c.setopt(c.POSTFIELDS, audio_data)
    c.setopt(c.POSTFIELDSIZE, f_len)
    c.perform()  # pycurl.perform() has no return val


# save the data into the wav file named filename
def save_wave_file(filename, data):
    wf = wave.open(filename, 'wb')
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(SAMPLING_RATE)
    wf.writeframes("".join(data))
    wf.close()


token = get_token()


try:
    while (True):
        count = 0
        print("..............等待中1................")
        os.system(
            'sudo arecord -D "plughw:2,0" -f S16_LE -d 2 -r 16000 /home/pi/workspace/game_audio_control.wav')
        if count == 50:
            use_cloud(token)
            print("-----> return result:"+commun[0])
            print("..............等待中2................")
            print(res)

        if '前进' in res:
            t_up(50, 3)
        elif '红灯' in res or '红灯停' in res or '停车' in res or '等待' in res:
            t_stop(3)
        elif '绿灯' in res or '绿灯行' in res:
            t_up(50, 3)
        elif '左转' in res:
            t_left(50, 3)
        elif '右转' in res:
            t_right(50, 3)
        elif '减速慢行' in res or '慢点走' in res:
            t_up(50, 3)
        elif '注意危险' in res:
            t_stop(3)
            get_talk('这个标志的意思是要注意危险，小朋友们在路上见到它要小心出行哦')
except KeyboardInterrupt:
    GPIO.cleanup()
