"""C3D model for Keras

# Reference:

- [Learning Spatiotemporal Features with 3D Convolutional Networks](https://arxiv.org/abs/1412.0767)

Based on code from @albertomontesg
"""

import keras.backend as K
import numpy as np
from keras.layers.convolutional import Conv3D, MaxPooling3D, ZeroPadding3D
from keras.layers.core import Dense, Dropout, Flatten
from keras.models import Model, Sequential
from keras.utils.data_utils import get_file
from PIL import Image

import CONFIG

__all__ = [
    'C3D_MEAN_PATH',
    'preprocess_input',
    'C3D',
    'build_c3d_encoder',
]


C3D_MEAN_PATH = 'https://github.com/adamcasson/c3d/releases/download/v0.1/c3d_mean.npy'

def preprocess_input(video):
    """Resize and subtract mean from video input

    Keyword arguments:
    video -- video frames to preprocess. Expected shape
        (frames, rows, columns, channels). If the input has more than 16 frames
        then only 16 evenly samples frames will be selected to process.

    Returns:
    A numpy array.

    """

    intervals = np.ceil(np.linspace(0, video.shape[0] - 1, 16)).astype(int)
    frames = video[intervals]

    # Reshape to CONFIG{ (frame_height, frame_width) }
    reshape_frames = np.zeros((frames.shape[0], CONFIG.frame_height, CONFIG.frame_width, frames.shape[3]))
    for i, img in enumerate(frames):
        img = np.array(Image.fromarray(img).resize((CONFIG.frame_width, CONFIG.frame_height), Image.BICUBIC))
        reshape_frames[i, :, :, :] = img

    mean_path = get_file('c3d_mean.npy',
                         C3D_MEAN_PATH,
                         cache_subdir='models',
                         md5_hash='08a07d9761e76097985124d9e8b2fe34')

    # Subtract mean
    mean = np.load(mean_path)
    reshape_frames -= mean
    # Crop to 112x112
    reshape_frames = reshape_frames[:, 8:120, 30:142, :]
    # Add extra dimension for samples
    reshape_frames = np.expand_dims(reshape_frames, axis=0)

    return reshape_frames


def C3D(weights='sports1M'):
    """Creates a C3D Keras model
    """
    
    if weights not in ['sports1M', None]:
        raise ValueError('weights should be either be sports1M or None')
    
    if K.image_data_format() == 'channels_last':
        shape = (16, 112, 112, CONFIG.channels)
    else:
        shape = (CONFIG.channels, 16, 112, 112)
        
    model = Sequential()
    model.add(Conv3D(64, 3, activation='relu', padding='same', name='conv1', input_shape=shape))
    model.add(MaxPooling3D(pool_size=(1,2,2), strides=(1,2,2), padding='same', name='pool1'))
    
    model.add(Conv3D(128, 3, activation='relu', padding='same', name='conv2'))
    model.add(MaxPooling3D(pool_size=(2,2,2), strides=(2,2,2), padding='valid', name='pool2'))
    
    model.add(Conv3D(256, 3, activation='relu', padding='same', name='conv3a'))
    model.add(Conv3D(256, 3, activation='relu', padding='same', name='conv3b'))
    model.add(MaxPooling3D(pool_size=(2,2,2), strides=(2,2,2), padding='valid', name='pool3'))
    
    model.add(Conv3D(512, 3, activation='relu', padding='same', name='conv4a'))
    model.add(Conv3D(512, 3, activation='relu', padding='same', name='conv4b'))
    model.add(MaxPooling3D(pool_size=(2,2,2), strides=(2,2,2), padding='valid', name='pool4'))
    
    model.add(Conv3D(512, 3, activation='relu', padding='same', name='conv5a'))
    model.add(Conv3D(512, 3, activation='relu', padding='same', name='conv5b'))
    model.add(ZeroPadding3D(padding=(0,1,1)))
    model.add(MaxPooling3D(pool_size=(2,2,2), strides=(2,2,2), padding='valid', name='pool5'))
    
    model.add(Flatten())
    
    model.add(Dense(4096, activation='relu', name='fc6'))
    model.add(Dropout(0.5))
    model.add(Dense(4096, activation='relu', name='fc7'))
    model.add(Dropout(0.5))
    model.add(Dense(487, activation='softmax', name='fc8'))

    if weights == 'sports1M':
        model.load_weights(CONFIG.c3d_model_weights)
    
    return model


def build_c3d_encoder(layer_name='fc6'):
    model = C3D()
    return Model(inputs=model.input, outputs=model.get_layer(layer_name).output)


if __name__ == '__main__':
    model = C3D()
    model.summary()
