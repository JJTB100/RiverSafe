import serial
import re

# connect to serial port
s = serial.Serial(port="/dev/ttyACM0", baudrate=115200,timeout=1)
FILENAME = "/home/riversafe/RiverSafe/web/tds.js"

# keep reading sensor value from pico
while True:
 line = str(s.readline())
 match = re.search("b'(\d+)", line)
 if match: 
  f = open(FILENAME, "w")
  value = match.group(1)
  f.write(value)
  f.close()
  
