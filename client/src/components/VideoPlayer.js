import React, { useState, useEffect } from 'react';
import './VideoPlayer.css';
import YouTube from 'react-youtube';
import { useDataLayerValue } from '../global-state/DataLayer';


function VideoPlayer() {
    const [{ socket }, dispatch] = useDataLayerValue();
    const [videoId, setVideoId] = useState('yLOM8R6lbzg');

    const [player, setPlayer] = useState();
    function ready(e) {
        setPlayer(e.target);
    }

    const play = () => {
        socket.emit('play');
        console.log(player)
    }

    const pause = () => {
        socket.emit('pause');
    }

    useEffect(() => {
        if(player == null || socket == null) return
        socket.on('play', () => {
            console.log('play received');
            player.playVideo();
        })
        socket.on('pause', () => {
            console.log('pause received');
            player.pauseVideo();
        })
    }, [player, socket])

    useEffect(() => {
        if(socket == null || player == null) return

        socket.on('room-info', roomInfo => {
            setVideoId('BxV14h0kFs0');
            if(roomInfo.playing) return player.playVideo();
            return player.pauseVideo();
        })
    }, [socket, player])

    return (
        <div className="video-player">
            <YouTube 
            videoId={videoId}
            onPlay={play}
            onPause={pause}
            className="video"
            onReady={ready}
            />
        </div>
    )
}

export default VideoPlayer
