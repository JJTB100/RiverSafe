# Simple oscilloscope for a Raspberry Pi Pico
# Press the buttons to toggle the traces
# Designed for use with an pcio explorer board
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


sensor = machine.ADC(0)


temperature = 26

while True:
    display.set_pen(0,0,0)
    display.clear()
    
    display.set_pen(51, 242, 250)
    voltage = sensor.read_u16() / 65536 * 3.3
    display.text("RiverSafe", 0, 0, 0, 5)
    
    # temperature compensation formula: fFinalResult(25^C) = fFinalResult(current)/(1.0+0.02*(fTP-25.0));
    compensation_coefficient = 1.0 + 0.02 *(temperature-25.0)
    
    # temperature compensation
    compensation_voltage = voltage / compensation_coefficient
    
    # convert voltage value to tds value
    tds_value = (133.42 * compensation_voltage * compensation_voltage * compensation_voltage - 255.86 * compensation_voltage * compensation_voltage + 857.39 * compensation_voltage) * 0.5
    display.text(str(int(tds_value)), 20, 50, 0, 10)
    msg = ""
    if tds_value < 50:
        msg = "Ideal"
        display.set_pen(210,254,253)
    elif tds_value < 170:
        msg = "Hard Water"
        display.set_pen(159,205,255)
    elif tds_value < 300:
        msg = "Slightly Bad"
        display.set_pen(97,65,250)
    elif tds_value < 400:
        msg = "Bad"
        display.set_pen(133,139,7)
    else:
        msg = "DANGER"
        display.set_pen(128, 31, 0)
        
    display.text(msg, 0, 120, 0, 7)    
    
    bar_width = int(tds_value / 600 * WIDTH)
    display.rectangle(0, HEIGHT - 10, bar_width, 10)
    
    print(int(tds_value))
    display.update()
    utime.sleep(1)
