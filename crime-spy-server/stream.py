# import socket

# HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
# PORT = 65432        # Port to listen on (non-privileged ports are > 1023)

# with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
#     s.bind((HOST, PORT))
#     s.listen()
#     conn, addr = s.accept()
#     with conn:
#         print('Connected by', addr)

from time import sleep
from flask import Flask, Response

app = Flask(__name__)

@app.route('/')
def stream_pictures():
    def generate():
        i = 1
        f = open(f"images/test{i}.jpg", 'rb')
        LABEL = "\r\n--Ba4oTvQMY8ew04N8dcnM\r\nContent-Type: image/jpeg\r\n\r\n"
        data = LABEL
        while True:
            if not data:
                i %= 199
                i += 1
                f.close()
                sleep(0.03)
                f = open(f"images/test{i}.jpg", 'rb')
                data = LABEL
            yield data
            data = f.read(1024)
    return Response(generate(), content_type='multipart/x-mixed-replace;boundary="Ba4oTvQMY8ew04N8dcnM"')