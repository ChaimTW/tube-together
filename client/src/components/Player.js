import React from 'react';
import './Player.css';
import VideoPlayer from './VideoPlayer';

function Player() {
    return (
        <div className="player">
            <div className="video-container">
                <VideoPlayer />
            </div>
            <div className="interaction-container">

            </div>
        </div>
    )
}

export default Player
