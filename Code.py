import picoexplorer as explorer

width = explorer.get_width()
height = explorer.get_height()

display_buffer = bytearray(width * height * 2)  # 2-bytes per pixel (RGB565)
explorer.init(display_buffer)


explorer.clear()

#adc0 = int(explorer.get_adc(0) * 120)

explorer.set_pen(255, 255, 255)

explorer.text("RiverSafe", 20, 20, 100)
explorer.update()
