import ffmpeg

stream = ffmpeg.input('http://192.168.43.1:3000/video')
stream = ffmpeg.output(stream, 'res.mp4')
ffmpeg.run(stream)
