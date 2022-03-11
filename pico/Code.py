# Water quality sensor
# Designed for use with a pico explorer board and a TDS sensor attached to ADC0
import picoexplorer as display
import machine
import utime

# set up screen buffer and ADC
WIDTH = display.get_width()
HEIGHT = display.get_height()
display_buffer = bytearray(WIDTH * HEIGHT * 2)
display.init(display_buffer)

# Clear screen and draw title
display.set_pen(0,0,0)
display.clear()
display.set_pen(255, 0, 0)

# set up sensors
sensor = machine.ADC(0)
temp_sensor = machine.ADC(4)

while True:
    # read temperature
    temperature_voltage = temp_sensor.read_u16() * 3.3 / 65535
    temperature = int(27 - (temperature_voltage - 0.706)/0.001721)
    
    # clear screen
    display.set_pen(0,0,0)
    display.clear()
    
    # display temperatre
    display.set_pen(51, 242, 250)
    msg = str(temperature) +"'C"
    
    # read pollution level
    pollution_voltage = sensor.read_u16() / 65536 * 3.3
    
    # convert to Total Dissoluble Solids value
    compensation_coefficient = 1.0 + 0.02 *(temperature-25.0)
    compensation_voltage = pollution_voltage / compensation_coefficient
    tds_value = (133.42 * compensation_voltage * compensation_voltage * compensation_voltage - 255.86 * compensation_voltage * compensation_voltage + 857.39 * compensation_voltage) * 0.5
    
    # display readings
    display.text(str(int(tds_value)), 20, 50, 0, 10)
    display.text("RiverSafe", 0, 0, 0, 5)
    display.text(msg, 200, 100, 0, 2)
    
    # display interpretation of TDS value
    msg = ""
    if tds_value < 50:
        msg = "Ideal"
        display.set_pen(210,254,253)
    elif tds_value < 170:
        msg = "Hard Water"
        display.set_pen(159,205,255)
    elif tds_value < 300:
        msg = "Acceptable"
        display.set_pen(97,65,250)
    elif tds_value < 400:
        msg = "Bad"
        display.set_pen(133,139,7)
    else:
        msg = "DANGER"
        display.set_pen(128, 31, 0)
        
    display.text(msg, 0, 120, 0, 5)    
    
    # display bar at bottom of screen
    bar_width = int(tds_value / 600 * WIDTH)
    display.rectangle(0, HEIGHT - 10, bar_width, 10)
    
    # send tds value and temp. to raspberry pi
    print("{:},{:}".format(int(tds_value), temperature))
    
    # update display
    display.update()
    utime.sleep(1)


