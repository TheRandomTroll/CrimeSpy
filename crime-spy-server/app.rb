require 'sinatra'
require 'streamio-ffmpeg'

get '/' do
  movie = FFMPEG::Movie.new('http://192.168.43.1:3000')
  movie.resolution
end
