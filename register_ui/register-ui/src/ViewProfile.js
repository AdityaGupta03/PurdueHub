import React, { useState } from 'react'

import './Profile.css' // css pulled online
import temp from './temporary-profile.jpeg' // temp picture


function ViewProfile() {
    const username = "Billy Joel";


    const[user, setUser] = useState(''); // ACTUAL USER SIGNED IN
    const[viewUser, viewSetUser] = useState('Billy Joel'); // USER'S PROFILE WHO WE ARE VIEWING
    const[signedIn, setSignedIn] = useState(false); // SIGN IN VAR TO ALLOW CONDITIONAL RENDERING


    const bio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas integer eget aliquet. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus. Nunc sed blandit libero volutpat sed cras. At augue eget arcu dictum varius duis at consectetur. Ut consequat semper viverra nam libero. Mi eget mauris pharetra et ultrices neque ornare aenean. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus. Pellentesque sit amet porttitor eget dolor morbi. Gravida in fermentum et sollicitudin ac orci phasellus. Et netus et malesuada fames ac turpis. Nec nam aliquam sem et tortor consequat. Sit amet nulla facilisi morbi tempus iaculis.'; // bio info s
    const[isBlocked, setIsBlocked] = useState(false); // not blocked yet
    const[isFollow, setIsFollow] = useState(false); // not followed yet

    // INITIAL RENDERING 

    useEffect( () => {
        // ADD IN SIGN IN SESSION HERE, SET VAR TO TRUE OR FALSE, UPDATE CONDITIONAL RENDERING
        // ... code ^
        setUser('david'); // change username if they are signed in
        setSignedIn(true); // change this true if they are signed in, false otherwise

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
                    body: JSON.stringify({ "user_id": user, "unblock_username": viewUser}),
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
                    body: JSON.stringify({ "user_id": user, "unblock_username": viewUser}),
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
                    body: JSON.stringify({ "user_id": user, "to_follow_username": viewUser}),
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
                    body: JSON.stringify({ "user_id": user, "to_follow_username": viewUser}),
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
        <h1>{viewSetUser}'s Profile</h1>
        <img className='landscape' src={temp} alt="Profile Picture"/>
        <span>
            <h2>Username: {viewUser}</h2>
            <button onClick={toggleBlock}>{isBlocked ? 'Unblock' : 'Block'}</button>
            <button disabled={isBlocked ? true : false} onClick={toggleFollow}>{isFollow ? 'Unfollow' : 'Follow'}</button>
        </span>
        <p>Bio: {bio}</p>
 </div>
  )
}

export default ViewProfile