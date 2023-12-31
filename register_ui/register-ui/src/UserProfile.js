import React, { useState } from 'react'
import {useRef, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css' // css pulled online
import temp from './temporary-profile.jpeg' // temp picture

const UserProfile = () => {
    const navigate = useNavigate();
    const user_id = sessionStorage.getItem('user_id');
    let user = sessionStorage.getItem('username');
    const [username, setUsername] = useState(user);
    const[profilePicture, setProfilePictrue] = useState(temp); // profile picture info
    const[bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas integer eget aliquet. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus. Nunc sed blandit libero volutpat sed cras. At augue eget arcu dictum varius duis at consectetur. Ut consequat semper viverra nam libero. Mi eget mauris pharetra et ultrices neque ornare aenean. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus. Pellentesque sit amet porttitor eget dolor morbi. Gravida in fermentum et sollicitudin ac orci phasellus. Et netus et malesuada fames ac turpis. Nec nam aliquam sem et tortor consequat. Sit amet nulla facilisi morbi tempus iaculis.'); // bio info s
    const[isEditing, setIsEditing] = useState(false); // edit status check
    const [selectedImage, setSelectedImage] = useState(null);

    const [errMsg, setErrMsg] = useState('');
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;;

    const [validUserName, setValidUserName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    // FAKE DATA
    // Be able to set functions for buttons: save and edit
    // save = save information, no longer editing
    // edit = not saved yet, information will change

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSettings = () => {
        navigate('/settings');
    }

    const handleSaveClick = async () => {
        const a1 = USER_REGEX.test(username);

        if (!a1) {
            setIsEditing(true);
            const message = <>
                Username requirements: <br/>
                4 to 24 characters. <br/>
                Must begin with a letter. <br/>
                Letters, numbers, underscores, hyphens allowed.
            </>
            setErrMsg(message);
        }

        try {
            if (user != username) {
                let response = await fetch("http://127.0.0.1:5000/api/update_username_id", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "newUsername": username, "user_id": user_id }),
                });

                let data = await response.json();

                if (response.status === 200) {
                    setUsername(username);
                    user = username;
                    sessionStorage.setItem('username', username);
                } else {
                    setErrMsg("Error: " + data.error);
                    return;
                }
            }

            let response = await fetch("http://127.0.0.1:5000/api/update_bio", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "bio": bio, "user_id": user_id }),
            });

            let data = await response.json();

            if (response.status !== 200) {
                setErrMsg("Error: " + data.error);
                return;
            }

            if (profilePicture === undefined) {
                setIsEditing(false);
                return;
            }

            const formData = new FormData();
            formData.append("username", user);
            formData.append("user_id", user_id);
            formData.append("file", profilePicture);

            response = await fetch("http://127.0.0.1:5000/update_profile_picture", {
                method: "POST",
                body: formData,
            });

            data = await response.json();

            if (response.status !== 200) {
                setErrMsg("Error: " + data.error);
                return;
            }
        } catch (error) {
            console.log(error);
            setErrMsg("Error: Error editing account");
            return;
        }

        setIsEditing(false);
    }

    const handleImageChange = (e) => {
        console.log("handleImageChange");
        console.log(e.target.files);
        const file = e.target.files[0];
        console.log(file);
    
        if (file) {
          const reader = new FileReader();
    
          reader.onload = (e) => {
            setSelectedImage(e.target.result);
          };
    
          reader.readAsDataURL(file);
        }

        setProfilePictrue(file);
    };

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
                console.log(data);
                setUsername(user);
                setBio(data.user_info.bio);
                const profile_pic_path = "/Users/aditya/Programming/PurdueHub/server/" + data.user_info.profile_picture;
                console.log(profile_pic_path);
                const image = await fetch(profile_pic_path);
                console.log(image);

                const reader = new FileReader();
                reader.onload = (e) => {
                    setProfilePictrue(e.target.result);
                };
                reader.readAsDataURL(profile_pic_path);
                setProfilePictrue(profile_pic_path);
            } else {
                console.log(data.error)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const result = USER_REGEX.test(username); // peforms boolean to see if user follows the user_regex pattern
        setValidUserName(result); 
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn == "false") {
            navigate('/login');   
        }
        
        fetchProfileData();
        setErrMsg('');
    }, [username])
    
    return (
        <div style={{ background: 'black', padding: '30px' }}>
        {isEditing ? (
            <section>
                <p className={userFocus && username && !validUserName
                     ? "instructions": "offscreen"}>
                    4 to 24 characters. <br/>
                    Must begin with a letter. <br/>
                    Letters, numbers, underscores, hyphens allowed.
                </p>
                <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                <label htmlFor='username'> 
                    Username: 
                </label>
                <input
                    type="text"
                    placeholder={username}
                    id='username'
                    value={username}
                    autoComplete='off'
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setUserFocus(true)} // 
                    onBlur={() => setUserFocus(false)} // 
                />
                <label htmlFor='profilePic'> 
                    Profile Picture: 
                </label>
                <input
                    type="file"
                    id='profilePic'
                    accept="image/*"
                    autoComplete='off'
                    onChange={handleImageChange}
                    style={{display: 'none'}}
                />
                <img 
                        className='landscape'
                        src={selectedImage || profilePicture}
                        alt="Profile"
                    />
                <label htmlFor='bio'>Bio:</label>
                <textarea
                    id='bio'
                    placeholder={bio}
                    value={bio}
                    rows={11}
                    cols={40}
                    onChange={(e) => setBio(e.target.value)}
                />
                <button onClick={handleSaveClick}>Save</button>
            </section>
        ) : (
             <div style={{ background: 'black', padding: '20px' }}>
                <h1>User Profile</h1>
                <img className='landscape' src={selectedImage || profilePicture} alt="Profile Picture"/>
                <h2>Username: {username}</h2>
                <p>Bio: {bio}</p>
                <button onClick={handleEditClick}>Edit Profile</button>
                <button onClick={handleSettings}>View Your Settings</button>
             </div>
        )}
    </div>
    )
}

export default UserProfile