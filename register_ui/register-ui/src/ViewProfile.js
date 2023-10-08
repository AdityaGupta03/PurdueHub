import React, { useState } from 'react'

import './Profile.css' // css pulled online
import temp from './temporary-profile.jpeg' // temp picture


function ViewProfile() {
    const username = "Billy Joel";
    const bio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas integer eget aliquet. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus. Nunc sed blandit libero volutpat sed cras. At augue eget arcu dictum varius duis at consectetur. Ut consequat semper viverra nam libero. Mi eget mauris pharetra et ultrices neque ornare aenean. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus. Pellentesque sit amet porttitor eget dolor morbi. Gravida in fermentum et sollicitudin ac orci phasellus. Et netus et malesuada fames ac turpis. Nec nam aliquam sem et tortor consequat. Sit amet nulla facilisi morbi tempus iaculis.'; // bio info s
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