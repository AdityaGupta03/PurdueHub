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

    // INITIAL RENDERING 

    useEffect( () => {
        // ADD IN SIGN IN SESSION HERE, SET VAR TO TRUE OR FALSE, UPDATE CONDITIONAL RENDERING
        // ... code ^
        //setUser('david'); // change username if they are signed in
        //setSignedIn(true); // change this true if they are signed in, false otherwise

    }, [])

    const toggleBlock = async() => {
        if(isBlocked === false) {
            // If user becomes blocked logic here ...

            setIsBlocked(true);
            setIsFollow(false); 

            {/*if the user becomes blocked, 
                removed them from being followed, 
                add logic to remove them here:
            */}
            
            try {
                const response = await fetch("http://127.0.0.1:5000/api/block_user", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    //body: JSON.stringify({ "user_id": user, "unblock_username": viewUser}),
                });
    
                console.log(response);
                const data = await response.json();
    
                if (response.status === 200) {
                    // SET LOGIC HERE FOR WHENEVER BLOCK IS SUCCESSFUL
                } else {
                    const err_msg = "Error: " + data.error;
                }
            } catch (error) {
                console.log('Error:', error);
            }

        }
        else {
            // If user becomes unblocked logic here ...

            setIsBlocked(false);

            try {
                const response = await fetch("http://127.0.0.1:5000/api/unblock_user", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    //body: JSON.stringify({ "user_id": user, "unblock_username": viewUser}),
                });
    
                console.log(response);
                const data = await response.json();
    
                if (response.status === 200) {
                    // SET LOGIC HERE FOR WHENEVER BLOCK IS SUCCESSFUL
                } else {
                    const err_msg = "Error: " + data.error;
                }
            } catch (error) {
                console.log('Error:', error);
            }
        }
    }
    
    const toggleFollow = async () => {
        if(isFollow === false) {
            // If user becomes followed logic here ...
            setIsFollow(true);

            try {
                const response = await fetch("http://127.0.0.1:5000/api/follow_user", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    //body: JSON.stringify({ "user_id": user, "to_follow_username": viewUser}),
                });
    
                console.log(response);
                const data = await response.json();
    
                if (response.status === 200) {
                    // SET LOGIC HERE FOR WHENEVER FOLLOW IS SUCCESSFUL
                } else {
                    const err_msg = "Error: " + data.error;
                }
            } catch (error) {
                console.log('Error:', error);
            }

        }
        else {
            // If user becomes unfollowed logic here ...
            setIsFollow(false);

            try {
                const response = await fetch("http://127.0.0.1:5000/api/unfollow_user", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    //body: JSON.stringify({ "user_id": user, "to_follow_username": viewUser}),
                });
    
                console.log(response);
                const data = await response.json();
    
                if (response.status === 200) {
                    // SET LOGIC HERE FOR WHENEVER UNFOLLOW IS SUCCESSFUL
                } else {
                    const err_msg = "Error: " + data.error;
                }
            } catch (error) {
                console.log('Error:', error);
            }
        }
    }
    
  return (
    <div>
        <h1>'s Profile</h1>
        <img className='landscape' src={temp} alt="Profile Picture"/>
        <span>
            <h2>Username: </h2>
            <button onClick={toggleBlock}>{isBlocked ? 'Unblock' : 'Block'}</button>
            <button disabled={isBlocked ? true : false} onClick={toggleFollow}>{isFollow ? 'Unfollow' : 'Follow'}</button>
            <button>Report</button>
        </span>
        <p>Bio: {bio}</p>
 </div>
  )
}

export default ViewProfile