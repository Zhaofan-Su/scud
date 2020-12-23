import cv2
import requests
import base64

from PIL import Image
from io import BytesIO


from Basic.Motor import t_stop, t_up


def frame2base64(frame):
    # convert every frame to image
    img = Image.fromarray(frame)
    output_buffer = BytesIO()
    # write to output buffer
    img.save(output_buffer, format='JPEG')
    # read the image from the disk
    byte_data = output_buffer.getvalue()
    # convert to base64
    base64_data = base64.b64encode(byte_data)
    return base64_data


def getToken():
    cliend_id = ''
    secret_key = ''
    host = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + \
        cliend_id+'&client_secret='+secret_key
    response = requests.get(host)
    if response:
        print(response.json())
        return response.json()['access_token']


request_url = "https://aip.baidubce.com/rest/2.0/image-classify/v1/gesture"
access_token = getToken()
request_url = request_url + "?access_token=" + access_token
headers = {'content-type': 'application/x-www-form-urlencoded'}

# init USB camera
cap = cv2.VideoCapture(0)
count = 0
while(cap.isOpened()):
    count += 1
    # read every frame
    ret, frame = cap.read()
    if count == 50:
        # call the baidu api
        img = frame2base64(frame)
        params = {"image": img}
        headers = {'content-type': 'application/x-www-form-urlencoded'}
        response = requests.post(request_url, data=params, headers=headers)
        print('call once')
        print(response.json())
        if response:
            print('give result')
            count = 0
            res_json = response.json()
            if len(res_json['result']) == 0:
                continue
            class_name = 'Five'
            for res in res_json['result']:
                if res['classname'] != 'Face':
                    class_name = res['classname']
            if class_name == 'Five':
                # STOP
                print('stop')
                t_stop(3)
            elif class_name == 'One':
                # the first level speed
                print('first level speed')
                t_up(20, 3)
            elif class_name == 'Two':
                # the second level speed
                print('second level speed')
                t_up(30, 3)
            elif class_name == 'Three':
                # the third level speed
                print('third level speed')
                t_up(40, 3)

    # show every frame
    cv2.imshow('Capture', frame)
    # press q to exit
    key = cv2.waitKey(1)
    #print( '%08X' % (key&0xFFFFFFFF) )
    if key & 0x00FF == ord('q'):
        break
# release and close the window
cap.release()
cv2.destroyAllWindows()
