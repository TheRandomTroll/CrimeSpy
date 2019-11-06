import requests

r = requests.get('http://192.168.43.1:3000/video', stream=True)
if(r.status_code == 200):
    i = 1
    bytes = bytes()
    f = open('test{}.jpg'.format(i), 'wb')
    for chunk in r.iter_content(chunk_size=1024):
        bytes += chunk
        a = bytes.find(b'\xff\xd8')
        b = bytes.find(b'\xff\xd9')
        if a != -1 and b != -1:
            f.write(bytes[a:b+2])
            f.close()
            bytes = bytes[b+2:]
            i+=1
            f = open('test{}.jpg'.format(i), 'wb')
        if i >= 100:
            i = 1
else:
    print("Received unexpected status code {}".format(r.status_code))
