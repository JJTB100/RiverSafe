import serial
import re

# connect to serial port
s = serial.Serial(port="/dev/ttyACM0", baudrate=115200,timeout=1)
FILENAME = "/home/riversafe/RiverSafe/web/tds.json"

# keep reading sensor value from pico
while True:
 line = str(s.readline())
 match = re.search("b'(\d+),(\d+)", line)
 if match: 
  f = open(FILENAME, "w")
  tds = match.group(1)
  temperature = match.group(2)
  f.write('{{"temp":{},"tds":{}}}'.format(temperature, tds))

  f.close()
  
