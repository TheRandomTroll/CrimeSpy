__all__ = [
    'c3d_model_weights',
    'classifier_model_weigts',
    'classifier_model_json',

    'input_folder',
    'output_folder',

    'sample_video_path',

    'frame_height',
    'frame_width',
    'channels',

    'frame_count',
    'features_per_bag',
]


# ====================================================================================================
# ====================================================================================================

c3d_model_weights = './models/c3d_sports1m.h5'
classifier_model_weigts = './models/weights_L1L2.mat'
classifier_model_json = './models/model.json'

input_folder  = './input'
output_folder = './output'

sample_video_path = './input/v2.mov'

# ====================================================================================================

frame_height = 240
frame_width = 320
channels = 3

frame_count = 16

features_per_bag = 32
