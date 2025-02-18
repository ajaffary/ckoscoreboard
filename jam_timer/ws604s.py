# taken from https://www.youtube.com/watch?v=2GFJjSsI5wY&t=1s
"""
import socket

# Create UDP socket object and set it to broadcast mode
udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# set broadcast option: socket.SO_BROADCAST
udp_socket.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)

# Broadcast address
dest_addr = ('192.168.1.200', 1234)

# send_data = b'#45645'    # Remote Control code: "M2"
# send_data = b'#22695'    # Remote Control code: "M3"
send_data = b'#39015'    # Remote Control code: "Play/Pause"

# Send UDP data
udp_socket.sendto(send_data, dest_addr)
"""

import asyncio
import websockets

async def send_data():
    uri = "ws://192.168.1.200:81"  # WebSocket server address
    async with websockets.connect(uri) as websocket:
        send_data = "#39015"  # Remote Control code: "Play/Pause"
        await websocket.send(send_data)
        print(f"Sent: {send_data}")

# Run the send_data coroutine
asyncio.get_event_loop().run_until_complete(send_data())