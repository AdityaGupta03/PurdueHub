import React, { useState } from 'react'
import data from './friend-data';
import List from './List';
import temp from './temporary-profile.jpeg' // temp picture

import './Profile.css' // css pulled online

function ViewList() {
    const [value, setValue] = useState(data);

    const [signedIn, setSignedIn] = useState(true); // if user isn't signed in

    const [nobodyBlocked, setNobodyBlocked] = useState(false); // if user doesn't have any blocked users
    const [nobodyFollows, setNobodyFollows] = useState(false); // if user doesn't have any followers
    const [nobodyFollowed, setNobodyFollowed] = useState(false); // if use doesn't have anyone added 

    const [user, setUser] = useState('');

    const [blockedUsernames, setBlockedUsernames] = useState([]);

    // Set focus on first user input when page initially updates
    useEffect(async () => {
        // ADD IN SIGN IN SESSION HERE, SET VAR TO TRUE OR FALSE, UPDATE CONDITIONAL RENDERING
        // ... code ^
        setUser('david'); // change username if they are signed in
        setSignedIn(true); // change this true if they are signed in, false otherwise
        // Fetch blocked users

        try {
            const response = await fetch("http://127.0.0.1:5000/api/get_block_list", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username": user }),
            });
            const data = await response.json();

            if (response.status === 200) {
                setBlockedUsernames(data.blocked);
            } else {
                const err_msg = "Error: " + data.error;
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }, [])

  return (
    <>
        {
            signedIn && (
                <div>
                    <div className='container'>
                        <h2>Friend's List</h2>

                        <div>
                        {
                            nobodyFollowed && (
                                <div>
                                    <p>You are following no one!</p>
                                </div>
                            )
                        }
                        {
                            nobodyFollowed === false && (
                                <div>
                                    {/* change 'key' to index which refers to array index of data provided if want to change easier */}
                                    {blockedUsernames.map((item) => {
                                        return (
                                        <section className='imagebox' key={index}>
                                            <div>
                                                <img src={temp} className='baseimage'/>
                                            </div>
                                            <div>{item}</div>
                                        </section>
                                    ) 
                                    })}
                                </div>
                            )
                        }
                        </div>
                </div>
                <div className='container'>
                    <h2>Followers List</h2>
                    <div>
                        {
                            nobodyFollows && (
                                <div>
                                    <p>Nobody Follows You!</p>
                                </div>
                            )
                        }
                        {
                            nobodyFollows === false && (
                                <div>
                                    {blockedUsernames.map((item) => {
                                        return (
                                        <section className='imagebox' key={index}>
                                            <div>
                                                <img src={temp} className='baseimage'/>
                                            </div>
                                            <div>{item}</div>
                                        </section>
                                    ) 
                                    })}
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='container'> 
                    <h2>Blocked List</h2>
                        {
                            nobodyBlocked && (
                                <div>
                                    <p>Nobody Users Blocked!</p>
                                </div>
                            )
                        }
                        {
                            nobodyBlocked === false && (
                                <div>
                                    {blockedUsernames.map((item) => {
                                        return (
                                        <section className='imagebox' key={index}>
                                            <div>
                                                <img src={temp} className='baseimage'/>
                                            </div>
                                            <div>{item}</div>
                                        </section>
                                    ) 
                                    })}
                                </div>
                            )
                        }
                </div>
            </div>
            )
        }
        {
            signedIn === false && (
                <div>
                    <h2>Friend's List</h2>
                    <p>Empty</p>
                    <h2>Followers List</h2>
                    <p>Empty</p>
                    <h2>Blocked List</h2>
                    <p>Empty</p>
                </div>
            )
        }
    </>
  )
}

export default ViewList