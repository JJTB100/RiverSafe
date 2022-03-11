import picoexplorer as explorer
import time

width = explorer.get_width()
height = explorer.get_height()

display_buffer = bytearray(width * height * 2)  # 2-bytes per pixel (RGB565)
explorer.init(display_buffer)

explorer.clear()
explorer.set_pen(0, 0, 255)

explorer.rectangle(0, 0 ,240 ,240) 
explorer.set_pen(0, 255, 0)
#draw_tap()
print("Starting image")
    
print("Done")

explorer.text("RiverSafe", 25, 100, 100, 4)



time.sleep(1)

while True:
    time.sleep(1)
    print(explorer.get_adc(0))