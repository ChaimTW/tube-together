import React, { useEffect, useState } from 'react';
import './CreateRoom.css';
import { useForm } from "react-hook-form";
import { useDataLayerValue } from '../global-state/DataLayer';
import { useHistory } from "react-router-dom";

function CreateRoom() {
    const [{ socket }, dispatch] = useDataLayerValue();
    const [roomCode, setRoomCode] = useState("");
    const history = useHistory();

    useEffect(() => {
        if(socket === "") return;
        
        setRoomCode(socket.id.substr(0, 5).toUpperCase());
    }, [socket]);

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const roomInfo = {
            room: roomCode,
            host: data.username,
            user: data.username
        }
        dispatch({
            type: "SET_LOGGED_IN",
            loggedIn: true
        })
        await socket.emit('create-room', roomInfo);
        await socket.emit('join-room', roomInfo);
        history.push('/player');
    }
    
    return (
        <div className="create-room">
            <form onSubmit={handleSubmit(onSubmit)} className="create-room-form">
                <input type="text" value={roomCode} disabled required className="create-room-field" />
                <input type="text" placeholder="Username" required {...register("username")} className="create-room-field" />
                <input type="submit" value="Create" className="create-icon"/>
            </form>            
        </div>
    )
}

export default CreateRoom
