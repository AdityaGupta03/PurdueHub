import React, { useState, useEffect } from 'react'
import temp from './temporary-profile.jpeg' // temp picture

import './Profile.css' // css pulled online

function ViewList() {
    const [signedIn, setSignedIn] = useState(true); // if user isn't signed in
    const [nobodyBlocked, setNobodyBlocked] = useState(false); // if user doesn't have any blocked users
    const [nobodyFollows, setNobodyFollows] = useState(false); // if user doesn't have any followers
    const [nobodyFollowed, setNobodyFollowed] = useState(false); // if use doesn't have anyone added 


    const [blockedUsernames, setBlockedUsernames] = useState([]);
    const [ followedUsernames, setFollowedUsernames ] = useState([]);
    const [ followersUsernames, setFollowersUsernames ] = useState([]);

    async function fetchData() {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        console.log(isLoggedIn);
        if (isLoggedIn == 'false') {
            setSignedIn(false);
            return;
        }
        setSignedIn(true);
        const username = sessionStorage.getItem('username');

        try {
            let response = await fetch("http://127.0.0.1:5000/api/get_block_list", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username": username }),
            });

            let data = await response.json();
            console.log(data.blocked.length);

            if (response.status === 200) {
                if (data.blocked.length === 0) {
                    setNobodyBlocked(true);
                }
                setBlockedUsernames(data.blocked);
            } else {
                const err_msg = "Error: " + data.error;
                console.log(err_msg);
            }

            response = await fetch("http://127.0.0.1:5000/api/get_follow_list", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username": username }),
            });

            data = await response.json();
            console.log(data);
            console.log(data.following.length);

            if (response.status === 200) {
                if (data.following.length === 0) {
                    setNobodyFollowed(true);
                }
                console.log(data.following);
                setFollowedUsernames(data.following);
            } else {
                const err_msg = "Error: " + data.error;
                console.log(err_msg);
            }

            response = await fetch("http://127.0.0.1:5000/api/get_followed_by", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username": username }),
            });

            data = await response.json();
            console.log(data);
            console.log(data.followed_by.length);

            if (response.status === 200) {
                if (data.followed_by.length === 0) {
                    setNobodyFollows(true);
                }
                setFollowersUsernames(data.followed_by);
            } else {
                const err_msg = "Error: " + data.error;
                console.log(err_msg);
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchData();
    }, [])

  return (
    <>
        {
            signedIn && (
                <div>
                    <div className='container'>
                        <h2>Followers List:</h2>

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
                                    {followersUsernames.map((item, index) => {
                                        console.log(item);
                                        return (
                                            <div>{item}</div>
                                    ) 
                                    })}
                                </div>
                            )
                        }
                        </div>
                </div>
                <div className='container'>
                    <h2>Followed List:</h2>
                    <div>
                        {
                            nobodyFollowed && (
                                <div>
                                    <p>You are following nobody!</p>
                                </div>
                            )
                        }
                        {
                            nobodyFollowed === false && (
                                <div>
                                    {followedUsernames.map((item,  index) => {
                                        return (
                                            <div>{item}</div>
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
                                    <p>No Users Blocked!</p>
                                </div>
                            )
                        }
                        {
                            nobodyBlocked === false && (
                                <div>
                                    {blockedUsernames.map((item,  index) => {
                                        return (
                                            <div>{item}</div>
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