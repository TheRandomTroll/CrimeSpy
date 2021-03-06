import keras
import scipy.io as sio
from keras import Sequential
from keras.layers import Dense, Dropout
from keras.regularizers import l2

import CONFIG

__all__ = [
    'classifier_model',
    'build_classifier_model',
    'conv_dict',
    'load_weights',
]


def classifier_model():
    model = Sequential()
    model.add(Dense(512, input_dim=4096, kernel_initializer='glorot_normal', kernel_regularizer=l2(0.001), activation='relu'))
    model.add(Dropout(0.6))
    model.add(Dense(32, kernel_initializer='glorot_normal', kernel_regularizer=l2(0.001)))
    model.add(Dropout(0.6))
    model.add(Dense(1, kernel_initializer='glorot_normal', kernel_regularizer=l2(0.001), activation='sigmoid'))

    return model


def build_classifier_model():
    model = classifier_model()
    model = load_weights(model, CONFIG.classifier_model_weigts)
    
    return model


def conv_dict(other):
    dict = {}

    for i in range(len(other)):
        if str(i) in other:
            if other[str(i)].shape == (0, 0):
                dict[str(i)] = other[str(i)]
            else:
                weights = other[str(i)][0]
                weights2 = []

                for weight in weights:
                    if weight.shape in [(1, x) for x in range(0, 5000)]:
                        weights2.append(weight[0])
                    else:
                        weights2.append(weight)

                dict[str(i)] = weights2
    
    return dict


def load_weights(model, weights_file):
    dict = conv_dict(sio.loadmat(weights_file))

    i = 0
    for layer in model.layers:
        weights = dict[str(i)]
        layer.set_weights(weights)
        i += 1
    
    return model


if __name__ == '__main__':
    model = build_classifier_model()
    model.summary()
