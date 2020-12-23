#!/usr/bin/python  
# coding=utf-8  
#本段代码实现树莓派智能小车的红外避障效果
#代码使用的树莓派GPIO是用的BOARD编码方式。 
import RPi.GPIO as GPIO  
import time  
import sys 
 
#红外传感器接口
SensorRight = 16
SensorLeft  = 12

#运动控制接口
PWMA   = 18
AIN1   = 22
AIN2   = 27

#运动控制接口
PWMB   = 23
BIN1   = 25
BIN2   = 24

#按键接口
BtnPin  = 19
Gpin    = 5
Rpin    = 6
 
#运动函数
#前进
def t_up(speed,t_time):
        L_Motor.ChangeDutyCycle(speed)#左侧电机速度控制
        GPIO.output(AIN2,False)#AIN2正转
        GPIO.output(AIN1,True) #AIN1正转

        R_Motor.ChangeDutyCycle(speed)#右侧电机速度控制
        GPIO.output(BIN2,False)#BIN2正转
        GPIO.output(BIN1,True) #BIN1正转
        time.sleep(t_time)#运动时间
#停止        
def t_stop(t_time):
        L_Motor.ChangeDutyCycle(0)
        GPIO.output(AIN2,False)#AIN2
        GPIO.output(AIN1,False) #AIN1

        R_Motor.ChangeDutyCycle(0)
        GPIO.output(BIN2,False)#BIN2
        GPIO.output(BIN1,False) #BIN1
        time.sleep(t_time)
#后退        
def t_down(speed,t_time):
        L_Motor.ChangeDutyCycle(speed)
        GPIO.output(AIN2,True)#AIN2
        GPIO.output(AIN1,False) #AIN1

        R_Motor.ChangeDutyCycle(speed)
        GPIO.output(BIN2,True)#BIN2
        GPIO.output(BIN1,False) #BIN1
        time.sleep(t_time)
#左转
def t_left(speed,t_time):
        L_Motor.ChangeDutyCycle(speed)
        GPIO.output(AIN2,True)#AIN2
        GPIO.output(AIN1,False) #AIN1

        R_Motor.ChangeDutyCycle(speed)
        GPIO.output(BIN2,False)#BIN2
        GPIO.output(BIN1,True) #BIN1
        time.sleep(t_time)
#右转
def t_right(speed,t_time):
        L_Motor.ChangeDutyCycle(speed)
        GPIO.output(AIN2,False)#AIN2
        GPIO.output(AIN1,True) #AIN1

        R_Motor.ChangeDutyCycle(speed)
        GPIO.output(BIN2,True)#BIN2
        GPIO.output(BIN1,False) #BIN1
        time.sleep(t_time)

#按键控制        
def keysacn():
    val = GPIO.input(BtnPin)
    while GPIO.input(BtnPin) == False:
        val = GPIO.input(BtnPin)
    while GPIO.input(BtnPin) == True:
        time.sleep(0.01)
        val = GPIO.input(BtnPin)
        if val == True:
            GPIO.output(Rpin,1)
            while GPIO.input(BtnPin) == False:
                GPIO.output(Rpin,0)
        else:
            GPIO.output(Rpin,0)
            
def setup():
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)       # Numbers GPIOs by physical location
    GPIO.setup(Gpin, GPIO.OUT)     # Set Green Led Pin mode to output
    GPIO.setup(Rpin, GPIO.OUT)     # Set Red Led Pin mode to output
    GPIO.setup(BtnPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)    # Set BtnPin's mode is input, and pull up to high level(3.3V) 
    GPIO.setup(SensorRight,GPIO.IN)
    GPIO.setup(SensorLeft,GPIO.IN)
	
    GPIO.setup(AIN2,GPIO.OUT)
    GPIO.setup(AIN1,GPIO.OUT)
    GPIO.setup(PWMA,GPIO.OUT)

    GPIO.setup(BIN1,GPIO.OUT)
    GPIO.setup(BIN2,GPIO.OUT)
    GPIO.setup(PWMB,GPIO.OUT)
    
if __name__ == '__main__':
    setup()#初始化
    keysacn()#按键控制
    L_Motor= GPIO.PWM(PWMA,100)
    L_Motor.start(0)
    R_Motor = GPIO.PWM(PWMB,100)
    R_Motor.start(0)
    try:
        while True:
            SR_2 = GPIO.input(SensorRight)#右侧传感器
            SL_2 = GPIO.input(SensorLeft)#左侧传感器
            if SL_2 == True and SR_2 == True:
                print ("t_up")
                t_up(50,0)#直行
            elif SL_2 == True and SR_2 ==False:
                print ("Left")
                t_left(50,0)#左转
            elif SL_2==False and SR_2 ==True:
                print ("Right")
                t_right(50,0)#右转
            else:
                t_stop(0.3)#停机
                t_down(50,0.4)#后退
                t_left(50,0.5)#转向
    except KeyboardInterrupt:  # 使用'Ctrl+C'退出
        GPIO.cleanup()
