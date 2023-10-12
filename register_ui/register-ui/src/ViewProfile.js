import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './Profile.css' // css pulled online
import temp from './temporary-profile.jpeg' // temp picture


function ViewProfile() {
    const navigate = useNavigate();
    const { username } = useParams();
    const [bio, setBio] = useState(''); // bio is empty at first
    const[isBlocked, setIsBlocked] = useState(false); // not blocked yet
    const[isFollow, setIsFollow] = useState(false); // not followed yet

    const toggleBlock = () => {
        if(isBlocked === false) {
            // If user becomes blocked logic here ...

            setIsBlocked(true);
            setIsFollow(false); 

            {/*if the user becomes blocked, 
                removed them from being followed, 
                add logic to remove them here:
            */}

        }
        else {
            // If user becomes unblocked logic here ...

            setIsBlocked(false);
        }
    }
    const toggleFollow = () => {
        if(isFollow === false) {
            // If user becomes followed logic here ...
            setIsFollow(true);
        }
        else {
            // If user becomes unfollowed logic here ...
            setIsFollow(false);
        }
    }

    async function fetchProfileData() {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/get_profile_info", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username": username }),
            });

            const data = await response.json();

            if (response.status === 200) {
                // setSuccess(true);
                // setErrMsg('');
                setBio(data.bio);
                console.log(data);
            } else {
                console.log(data.error)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');

        if (isLoggedIn == 'false') {
            navigate("/login");
        }

        fetchProfileData();
    }, [])

    
  return (
    <div>
        <h1>{username}'s Profile</h1>
        <img className='landscape' src={temp} alt="Profile Picture"/>
        <span>
            <h2>Username: {username}</h2>
            <button onClick={toggleBlock}>{isBlocked ? 'Unblock' : 'Block'}</button>
            <button disabled={isBlocked ? true : false} onClick={toggleFollow}>{isFollow ? 'Unfollow' : 'Follow'}</button>
        </span>
        <p>Bio: {bio}</p>
 </div>
  )
}

export default ViewProfile