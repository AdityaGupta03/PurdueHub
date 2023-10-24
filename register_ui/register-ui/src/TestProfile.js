import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import temp from './temporary-profile.jpeg' // temp picture
import './Profile.css' // css pulled online

function TestProfile() {
    const navigate = useNavigate();
    const username = useState("Billy Joel");
    const my_username = useState("Leo Delgado");
    const [bio, setBio] = useState('Lorem Ipsum random bio information here, blee bloo'); // bio is empty at first
    const [ isBlocked, setIsBlocked ] = useState(false); // not blocked yet
    const [ isBanned, setIsBanned ] = useState(false); // not banned yet
    const[isFollow, setIsFollow] = useState(false); // not followed yet


    const [errMsg, setErrMsg] = useState(''); // NEW
    const errRef = useRef(); // NEW
    const[isMessaging, setIsMessageing] = useState(false);  // NEW

    const messageUser = () => { // NEW 
        setIsMessageing(true);
    }


    
    const toggleBlock = () => {
        if(isBlocked === false) {
            setIsFollow(false);
            setIsBlocked(true);
        }
        else {
            setIsBlocked(false);
        }
    }

    const toggleFollow = () => {
        if (isBlocked) {
            return;
        }
        if(isFollow === false) {
            setIsFollow(true);
        }
        else {
            setIsFollow(false);
        }
    }
    return (
        <>
            {isMessaging ? (
                <div>
                    
                </div>
            ): (
                <div>
                    <h1>{username}'s Profile</h1>
                    <Link to="/report">Report user</Link>
                    {
                        isBlocked ? null : <img className='landscape' src={temp} alt="Profile Picture"/>
                    }
                    {
                        isBanned ? <h2>Account has been banned!</h2> : null
                    }
                    <span>
                        <h2>Username: {username}</h2>
                        <button onClick={toggleBlock}>{isBlocked ? 'Unblock' : 'Block'}</button>
                        <button disabled={isBlocked ? true : false} onClick={toggleFollow}>{isFollow ? 'Unfollow' : 'Follow'}</button>
                        <button onClick={messageUser}>Message</button>
                    {/* <button onClick={reportUser}>Report</button> */}
                    </span>
                    {   
                        isBlocked ? null : <p>Bio: {bio}</p>
                    }
                </div>
            )}
        </>
        
    )
}

export default TestProfile