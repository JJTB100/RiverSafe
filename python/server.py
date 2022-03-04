import serial
s = serial.Serial(port="/dev/ttyACM0", baudrate=115200,timeout=1)
while True:
 line = str(s.readline())
 print(line)
