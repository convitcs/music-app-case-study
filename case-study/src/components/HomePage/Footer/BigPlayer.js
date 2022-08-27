import React from 'react';
import { nextIcon, pauseBlackIcon, playBlackIcon, prevIcon } from '../../../assets';
import { baseUrl } from '../../../config';

const BigPlayer = ({
    artist, avatar, title, duration, trackProgress, onChangeTrackProgress, 
    playPause, isPlaying, nextTrack, previousTrack
}) => {
    return (
        <div className='big-player'>
                    <div className="song-avt m-10">
                        <img src={`${baseUrl}/${avatar}`} alt="" />
                    </div>
                    <div className="song-info">
                        <h2 className="song-name">{title}</h2>
                        <h3 className="artist">{artist}</h3>
                    </div>
                    <div className="audio-player">
                        <input type="range" min={'0'} max={duration} value={trackProgress} onChange={onChangeTrackProgress}/>
                    </div>
                    <div className="audio-control flex justify-sb">
                        <button onClick={previousTrack}>
                            <img src={prevIcon} alt="" />
                        </button>
                        <button className='play-pause-button' onClick={playPause}>
                            {!isPlaying?<img src={pauseBlackIcon} alt="" />:<img src={playBlackIcon} alt="" />}
                        </button>
                        <button onClick={nextTrack}>
                            <img src={nextIcon} alt="" />
                        </button>
                    </div>
                </div>
    );
};

export default BigPlayer;