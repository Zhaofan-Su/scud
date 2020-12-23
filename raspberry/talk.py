from aip import AipSpeech
import wave
import pyaudio
import os


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
        with open('talk.wav', 'wb') as f:
            f.write(result)

        os.system('ffmpeg -i talk.wav talk_new.wav')
        os.remove('talk.wav')
        play('talk_new.wav')
        os.remove('talk_new.wav')
    else:
        print(result)
