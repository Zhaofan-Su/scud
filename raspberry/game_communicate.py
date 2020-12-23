#!/usr/bin/python
# -*-coding:utf-8-*-
from aip import AipSpeech
import wave
import pyaudio
import os
import numpy as np
from datetime import datetime
import time
import requests
import pycurl
import base64
import json
import sys
import cv2

from Basic.Motor import t_up, t_down, t_left, t_right, t_stop

APP_ID = ''
API_KEY = ''
SECRET_KEY = ''

client = AipSpeech(APP_ID, API_KEY, SECRET_KEY)

chunk = 1024


def play(filename):
    wf = wave.open(filename, 'rb')
    p = pyaudio.PyAudio()
    stream = p.open(format=p.get_format_from_width(wf.getsampwidth()),
                    channels=wf.getnchannels(),
                    rate=wf.getframerate(),
                    output=True)
    data = wf.readframes(chunk)
    while len(data) > 0:
        stream.write(data)
        data = wf.readframes(chunk)
    stream.stop_stream()
    stream.close()
    p.terminate()


def get_talk(text):
    result = client.synthesis(text=text, options={'vol': 5, 'per': 103})
    if not isinstance(result, dict):
        with open('game_communicate.wav', 'wb') as f:
            f.write(result)

        os.system('ffmpeg -i game_communicate.wav game_communicate_new.wav')
        os.remove('game_communicate.wav')
        play('game_communicate_new.wav')
        os.remove('game_communicate_new.wav')
    else:
        print(result)

# 3


filename = 'game_communicate_child.wav'


def get_token():
    apiKey = ""
    secretKey = ""
    auth_url = "https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + \
        apiKey + "&client_secret=" + secretKey
    #res = urllib.urlopen(auth_url)
    res = requests.get(auth_url)
    print(res.json())
    return res.json()['access_token']


def dump_res(buf):
    global res
    a = eval(buf)
    if a['err_msg'] == 'success.':
        res = a['result'][0]  # print the returned sentence
    else:
        res = ""


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
    c.setopt(pycurl.URL, str(srv_url))  # curl doesn't support unicode
    #c.setopt(c.RETURNTRANSFER, 1)
    c.setopt(c.HTTPHEADER, http_header)  # must be list, not dict
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


get_talk('小朋友你好呀，欢迎来到交通知识小课堂。先由我来问你问题咯。')

get_talk('闪光警告信号灯是什么颜色呢?')
while(True):
    os.system(
        'sudo arecord -D "plughw:3,0" -f S16_LE -d 3 -r 16000 /home/pi/workspace/game_communicate_child.wav')
    use_cloud(token)
    if '黄色' in res or '黄的' in res:
        get_talk('答对啦！你真棒')
    else:
        get_talk('答错啦，闪光警告信号灯的颜色是黄色哦')
    break


get_talk('小朋友，你可以在路上滑滑板吗？')
while(True):
    os.system(
        'sudo arecord -D "plughw:3,0" -f S16_LE -d 3 -r 16000 /home/pi/workspace/game_communicate_child.wav')
    use_cloud(token)
    if '不可以' in res or '不' in res:
        get_talk('答对啦！你真棒')
    else:
        get_talk('答错啦，在路上不可以滑滑板哦')
    break

get_talk('小朋友，接下来由你来问我问题吧')
while(True):
    os.system(
        'sudo arecord -D "plughw:3,0" -f S16_LE -d 5 -r 16000 /home/pi/workspace/game_communicate_child.wav')
    use_cloud(token)
    if '几岁' in res or '骑自行车' in res:
        get_talk('小朋友，在路上驾驶自行车必须年满12周岁哦')
        get_talk('小朋友，你还有什么问题吗')
    elif '没有问题' in res or '没有' in res or '没有啦' in res or '没' in res:
        get_talk('你太棒啦，欢迎你下次再来交通知识小讲堂玩耍哦')
        break
    else:
        get_talk('小朋友你剛剛說的什么，可以再说一次吗？')
