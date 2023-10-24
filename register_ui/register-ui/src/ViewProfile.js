import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import './Profile.css' // css pulled online
import temp from './temporary-profile.jpeg' // temp picture

function ViewProfile() {
    const navigate = useNavigate();
    const { username } = useParams();
    const my_username = sessionStorage.getItem('username');
    const user_id = localStorage.getItem('user_id');
    const [bio, setBio] = useState(''); // bio is empty at first
    const [ isBlocked, setIsBlocked ] = useState(false); // not blocked yet
    const [ isBanned, setIsBanned ] = useState(false); // not banned yet
    const[isFollow, setIsFollow] = useState(false); // not followed yet

    // INITIAL RENDERING 

    // test 
    
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn == "false") {
            navigate('/login');
        }
        setIsBlocked(false);
        setIsFollow(false);

        fetchProfileData();
    }, [])

    async function fetchProfileData() {
        try {
            let response = await fetch("http://127.0.0.1:5000/api/get_profile_info", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username": username }),
            });

            let data = await response.json();

            if (response.status === 200) {
                console.log(data);
                setBio(data.user_info.bio);
                if (data.user_info.banned == 1) {
                    setIsBanned(true);
                }
            } else {
                console.log(data.error)
            }

            response = await fetch("http://127.0.0.1:5000/api/get_block_list", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username": my_username }),
            });

            data = await response.json();
            console.log(data);

            if (response.status === 200) {
                if (data.blocked.length === 0) {
                    setIsBlocked(false);
                } else {
                    for (let i = 0; i < data.blocked.length; i++) {
                        if (data.blocked[i] == username) {
                            console.log(data.blocked[i]);
                            setIsBlocked(true);
                            break;
                        }
                    }
                }
            } else {
                const err_msg = "Error: " + data.error;
                console.log(err_msg);
            }

            console.log(isBlocked);

            response = await fetch("http://127.0.0.1:5000/api/get_follow_list", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username": my_username }),
            });

            data = await response.json();
            console.log(data);

            if (response.status === 200) {
                for (let i = 0; i < data.following.length; i++) {
                    if (data.following[i] == username) {
                        console.log(data.following[i]);
                        setIsFollow(true);
                        break;
                    }
                }
            } else {
                const err_msg = "Error: " + data.error;
                console.log(err_msg);
            }

            console.log(isFollow);
        } catch (error) {
            console.log(error);
        }
    }

    const toggleBlock = async() => {
        if(isBlocked === false) {
            // If user becomes blocked logic here ...
            try {
                const response = await fetch("http://127.0.0.1:5000/api/block_user", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "user_id": user_id, "block_username": username}),
                });
    
                console.log(response);
                const data = await response.json();
    
                if (response.status === 200) {
                    // SET LOGIC HERE FOR WHENEVER BLOCK IS SUCCESSFUL
                } else {
                    const err_msg = "Error: " + data.error;
                    console.log(err_msg);
                }

                if (isFollow) {
                    await fetch("http://127.0.0.1:5000/api/unfollow_user", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "user_id": user_id, "to_unfollow_username": username }),
                    });

                    console.log(response);
                    const data = await response.json();

                    if (response.status === 200) {
                        setIsFollow(false);
                    } else {
                        const err_msg = "Error: " + data.error;
                        console.log(err_msg);
                    }
                }

                setIsBlocked(true);
                setIsFollow(false);
            } catch (error) {
                console.log('Error:', error);
            }
        }
        else {
            // If user becomes unblocked logic here ...
            try {
                const response = await fetch("http://127.0.0.1:5000/api/unblock_user", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "user_id": user_id, "unblock_username": username}),
                });
    
                console.log(response);
                const data = await response.json();
    
                if (response.status === 200) {
                    setIsBlocked(false);
                } else {
                    const err_msg = "Error: " + data.error;
                    console.log(err_msg);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        }
    }
    
    const toggleFollow = async () => {
        if (isBlocked) {
            return;
        }

        if(isFollow === false) {
            // If user becomes followed logic here ...
            setIsFollow(true);

            try {
                const response = await fetch("http://127.0.0.1:5000/api/follow_user", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "user_id": user_id, "to_follow_username": username}),
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
            try {
                const response = await fetch("http://127.0.0.1:5000/api/unfollow_user", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "user_id": user_id, "to_unfollow_username": username }),
                });
    
                console.log(response);
                const data = await response.json();
    
                if (response.status === 200) {
                    // SET LOGIC HERE FOR WHENEVER UNFOLLOW IS SUCCESSFUL
                    setIsFollow(false);
                } else {
                    const err_msg = "Error: " + data.error;
                    console.log(err_msg);
                }
                
            } catch (error) {
                console.log('Error:', error);
            }
        }
    }
    
  return (
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
            {/* <button onClick={reportUser}>Report</button> */}
        </span>
        {   
            isBlocked ? null : <p>Bio: {bio}</p>
        }
 </div>
  )
}

export default ViewProfile