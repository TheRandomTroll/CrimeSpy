import os

import numpy as np

import CONFIG
from c3d import c3d_feature_extractor, preprocess_input
from classifier import build_classifier_model
from utils.array_util import extrapolate, interpolate
from utils.video_util import get_video_clips
from utils.visualization_util import visualize_predictions

__all__ = [
    'run_main',
]


def run_main():
    video_name = os.path.basename(CONFIG.sample_video_path).split('.')[0]

    # read video
    video_clips, num_frames = get_video_clips(CONFIG.sample_video_path)
    print()
    print('Number of clips in the video : ', len(video_clips))
    print('Number of frames in the video : ', num_frames)
    print('='*30)

    # build models
    feature_extractor = c3d_feature_extractor()
    classifier_model = build_classifier_model()
    print()
    print('Models initialized')
    print('='*30)

    # extract features
    rgb_features = []
    for i, clip in enumerate(video_clips, 1):
        clip = np.array(clip)
        if len(clip) < CONFIG.frame_count:
            continue

        clip = preprocess_input(clip)
        rgb_feature = feature_extractor.predict(clip)[0]
        rgb_features.append(rgb_feature)

        print(f"Processed clip : {i}/{len(video_clips)}")

    rgb_features = np.array(rgb_features)

    # bag features
    print('Bag features')
    rgb_feature_bag = interpolate(rgb_features, CONFIG.features_per_bag)

    # classify using the trained classifier model
    print('Classify using the trained classifier model')
    predictions = classifier_model.predict(rgb_feature_bag)

    # unbag features
    print('Unbag features')
    predictions = np.array(predictions).squeeze()
    predictions = extrapolate(predictions, num_frames)

    save_path = os.path.join(CONFIG.output_folder, video_name + '.gif')
    # visualize predictions
    print('Visualize predictions')
    visualize_predictions(CONFIG.sample_video_path, predictions, save_path)


if __name__ == '__main__':
    run_main()
