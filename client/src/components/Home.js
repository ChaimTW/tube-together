import React, { useEffect } from 'react';
import { useDataLayerValue } from '../global-state/DataLayer';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {  
    return (
        <div className="home">
            <Link to="/create-room"><button className="btn-1 create-icon">Create new room</button></Link>
            <Link to="/join-room"><button className="btn-1 join-icon">Join existing room</button></Link>
        </div>
    )
}

export default Home
