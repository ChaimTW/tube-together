import React from 'react';
import './JoinRoom.css';
import { useForm } from "react-hook-form";
import { useDataLayerValue } from '../global-state/DataLayer';
import { useHistory } from "react-router-dom";

function JoinRoom() {
    const [{ socket }, dispatch] = useDataLayerValue();
    const { register, handleSubmit } = useForm();
    const history = useHistory();

    const onSubmit = async (data) => {
        dispatch({
            type: "SET_LOGGED_IN",
            loggedIn: true
        })
        const roomInfo = {
            room: data.room_code,
            user: data.username
        }
        console.log(roomInfo)
        await socket.emit('join-room', roomInfo);
        history.push('/player');
    }

    return (
        <div className="join-room">
            <form onSubmit={handleSubmit(onSubmit)} className="join-room-form">
                <input type="text" placeholder="Room code" required className="join-room-field" {...register("room_code")} />
                <input type="text" placeholder="Username" required {...register("username")} className="join-room-field" />
                <input type="submit" value="Join" className="join-icon"/>
            </form>   
        </div>
    )
}

export default JoinRoom
