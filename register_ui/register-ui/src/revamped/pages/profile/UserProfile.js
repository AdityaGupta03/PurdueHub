import './profile.scss'

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';

import EmailIcon from '@mui/icons-material/Email';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // more info

import '@mui/material/IconButton/iconButtonClasses'
import background from './purdue-university-background.jpg'

import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Paper from '@mui/material';
import styled from '@emotion/styled';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

import './Notification.scss';

const UserProfile = () => {
    const show_advice = sessionStorage.getItem('show_advice');
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [isOpenMore, setIsOpenMore] = useState(false);

    const handleEditClose = () => {
        //setNewBio(bio); // same as below but for bio
        //setNewUser(username); // if they edit the field but don't want to save the new username, revert the input back to old
        setIsEditing(false);
    }
    const handleEditOpen = () => setIsEditing(true);

    const user_id = sessionStorage.getItem('user_id');
    let user = sessionStorage.getItem('username');

    const [usernameError, setUsernameError] = useState('');
    const [username, setUsername] = useState(user);
    //const [username, setUsername] = useState("Hello");
    const [newUser, setNewUser] = useState(username);

    const CHARACTER_LIMIT = 150;
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

    const [bio, setBio] = useState("Current User Bio");
    const [newBio, setNewBio] = useState(bio);

    const [nobodyBlocked, setNobodyBlocked] = useState(false); // if user doesn't have any blocked users
    const [nobodyFollows, setNobodyFollows] = useState(false); // if user doesn't have any followers
    const [nobodyFollowed, setNobodyFollowed] = useState(false); // if use doesn't have anyone added

    const [blockedUsernames, setBlockedUsernames] = useState([]);
    const [followedUsernames, setFollowedUsernames] = useState([]);
    const [followersUsernames, setFollowersUsernames] = useState([]);

    const handleEditPicture = () => {
        console.log('picture edit');
    }

    useEffect(() => {
        // fix up error messages if a user fixes them up
        setUsernameError('');
    }, [newUser])

    const [showNotification, setShowNotification] = useState(true);
    const [showTour, setShowTour] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [notifcationMessage, setNotificationMessage] = useState('');

    const sampleMessages =
        ["Checkout your personal calendar to schedule your events and get on top of your tasks!",
            "Enjoying PurdueHub? Give us your feedback located on your homescreen!",
            "Want to turn off these notifications? Head over to your settings page!",
            "Question about Purdue? Checkout the FAQ page for answers!",
            "Want to find a specific user? Go ahead and use the search bar in the Username Lookup page!"
        ]

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn == "false") {
           navigate('/login');
        }
        
        setUsername(user);

        if (show_advice == "1") {
            const notificationDiv = document.getElementById('notification');
            notificationDiv.classList.add('show');
    
            const randomTip = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
            setNotificationMessage(randomTip);
            setTimeout(() => {
                notificationDiv.classList.remove('show');
            }, 6000);
        }

        fetchProfileData();
        fetchRelationData();
    }, [])

    const handleCloseNotification = () => {
        setShowNotification(false);
    }

    async function fetchRelationData() {
        console.log("fetching relation data")
        try {
            let response = await fetch("http://127.0.0.1:5000/api/get_block_list", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username": username }),
            });

            let data = await response.json();
            console.log(data.blocked);

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

    async function fetchProfileData() {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/get_profile_info", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username": user }),
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
                // reader.onload = (e) => {
                //     setProfilePictrue(e.target.result);
                // };
                // reader.readAsDataURL(profile_pic_path);
                // setProfilePictrue(profile_pic_path);
            } else {
                console.log(data.error)
            }
        } catch (error) {
            console.log(error);
        }
    };

    {/*  MUI CSS: EDIT PROFILE */ }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 750,
        bgcolor: '#222',
        boxShadow: 24,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        color: 'whitesmoke',
    }
    const buttonStyle = {
        padding: '20px',
        color: '#32de84',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: '#333',
        },
        width: '100%',
        borderBottom: '1px solid grey',
    }
    const title = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    }
    const containTitle = {
        display: 'block',
        borderBottom: '1px solid grey',
        height: '60px',
        color: 'whitesmoke',
    }
    const exit = {
        position: 'absolute',
        right: '50px',
        top: '15px',
        color: 'whitesmoke',
        height: '30px',
        width: '30px',
    }
    const containPic = {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
    }
    const top = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
    const containActual = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
    const actual = {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        overflow: 'hidden',
        objectFit: 'cover',
    }
    const bottom = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }

    const handleEditSubmit = async () => {
        const a1 = USER_REGEX.test(newUser);
        if (!a1) {
            const message = <>
                4 to 24 characters.
                Must begin with a letter. <br />
                Letters, numbers, underscores, hyphens allowed.
            </>
            setUsernameError(message)
        }
        else {
            try {
                if (username != newUser) {
                    let response = await fetch("http://127.0.0.1:5000/api/update_username_id", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "newUsername": newUser, "user_id": user_id }),
                    });

                    let data = await response.json();

                    if (response.status === 200) {
                        setUsername(newUser);
                        user = newUser;
                        sessionStorage.setItem('username', newUser);
                    } else {
                        setUsernameError(data.error)
                        return;
                    }
                }

                let response = await fetch("http://127.0.0.1:5000/api/update_bio", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "bio": newBio, "user_id": user_id }),
                });

                let data = await response.json();

                if (response.status !== 200) {
                    setUsernameError(data.error)
                    return;
                }

                setBio(newBio);

                // if (profilePicture === undefined) {
                //     setIsEditing(false);
                //     return;
                // }

                // const formData = new FormData();
                // formData.append("username", user);
                // formData.append("user_id", user_id);
                // formData.append("file", profilePicture);

                // response = await fetch("http://127.0.0.1:5000/update_profile_picture", {
                //     method: "POST",
                //     body: formData,
                // });

                // data = await response.json();

                // if (response.status !== 200) {
                //     setErrMsg("Error: " + data.error);
                //     return;
                // }
            } catch (error) {
                console.log(error);
                setUsernameError("Error editing account");
                return;
            }
            handleEditClose();
        }
    }
    const handleOpenMore = () => {
        setIsOpenMore(true);
    }
    const handleCloseMore = () => {
        setIsOpenMore(false);
    }

    const [openFollowed, setOpenFollowed] = useState(false);
    const [openFollowers, setOpenFollowers] = useState(false);
    const [openBlocked, setOpenBlocked] = useState(false);

    const handleOpenFollowed = () => { setOpenFollowed(true); handleCloseMore() }
    const handleCloseFollowed = () => setOpenFollowed(false);

    const handleOpenFollowers = () => { setOpenFollowers(true); handleCloseMore() }
    const handleCloseFollowers = () => setOpenFollowers(false);

    const handleOpenBlocked = () => { setOpenBlocked(true); handleCloseMore() }
    const handleCloseBlocked = () => setOpenBlocked(false);


    const containUsers = {
        display: 'flex',
        flexDirection: 'column',
    }

    const containActualUser = {
        padding: '20px',
    }
    const userInfo = {
        display: 'flex',
        flexDirection: 'row'
    }

    const userProfile = {
        marginRight: '15px',
        height: '44px',
        width: '44px',
        borderRadius: '50%',
    }
    const userName = {
        display: 'flex',
        alignItems: 'center',
        width: '220px'
    }
    const userButton = {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '15px',
    }
    const userBut = {
        backgroundColor: '#444',
        color: 'whitesmoke',
        borderRadius: '10px',
        fontSize: '13px',
        "&:hover": { backgroundColor: '#333' }
    }

    return (

        <div className="profile">

            {showNotification && (
                <div id="notification" className="notification">
                    {notifcationMessage}
                    <span style={{ color: 'red' }} className="close" onClick={handleCloseNotification}>
                        &times;
                    </span>
                </div>
            )}

            {/* AS IN YOU ARE FOLLOWED BY: FOLLOWERS LIST */}
            <Modal
                open={openFollowers}
                onClose={handleCloseFollowers}
            >
                <Box sx={{ ...style, width: 400, overflowX: 'hidden', overflowY: 'scroll', maxHeight: '400px' }}>
                    <Box sx={containTitle}>
                        <Box sx={title}>
                            <Typography sx={{ fontWeight: 'bold' }}>Followed By</Typography>
                            <Box sx={exit}>
                                <Button sx={{ borderRadius: '50%' }} onClick={handleCloseFollowers}>X</Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={containUsers}>
                        <Box sx={containActualUser}>
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
                                                    <Box sx={userInfo} key={index}>
                                                        <Box sx={{ ...userProfile, "&:hover": { cursor: 'pointer' } }} component="img" src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" />
                                                        <Box sx={{ ...userName, "&:hover": { cursor: 'pointer' } }}>{item}</Box>
                                                    </Box>
                                                )
                                            })}
                                        </div>
                                    )
                                }
                            </div>
                        </Box>
                    </Box>
                </Box>
            </Modal>

            {/* AS IN YOU HAVE BLOCKED: BLOCKED LIST */}
            <Modal
                open={openBlocked}
                onClose={handleCloseBlocked}
            >
                <Box sx={{ ...style, width: 400, overflowX: 'hidden', overflowY: 'scroll', maxHeight: '400px' }}>
                    <Box sx={containTitle}>
                        <Box sx={title}>
                            <Typography sx={{ fontWeight: 'bold' }}>Blocked Users</Typography>
                            <Box sx={exit}>
                                <Button sx={{ borderRadius: '50%' }} onClick={handleCloseBlocked}>X</Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={containUsers}>
                        <Box sx={containActualUser}>
                            <div>
                                {
                                    nobodyBlocked && (
                                        <div>
                                            <p>You haven't blocked anyone!</p>
                                        </div>
                                    )
                                }
                                {
                                    nobodyBlocked === false && (
                                        <div>
                                            {blockedUsernames.map((item, index) => {
                                                console.log(item);
                                                return (
                                                    <Box sx={userInfo} key={index}>
                                                        <Box sx={{ ...userProfile, "&:hover": { cursor: 'pointer' } }} component="img" src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" />
                                                        <Box sx={{ ...userName, "&:hover": { cursor: 'pointer' } }}>{item}</Box>
                                                    </Box>
                                                )
                                            })}
                                        </div>
                                    )
                                }
                            </div>
                        </Box>
                    </Box>
                </Box>
            </Modal>

            {/* AS IN YOU ARE FOLLOWING PEOPLE: FOLLOWED LIST */}
            <Modal
                open={openFollowed}
                onClose={handleCloseFollowed}
            >
                <Box sx={{ ...style, width: 400, overflowX: 'hidden', overflowY: 'scroll', maxHeight: '400px' }}>
                    <Box sx={containTitle}>
                        <Box sx={title}>
                            <Typography sx={{ fontWeight: 'bold' }}>You Are Following</Typography>
                            <Box sx={exit}>
                                <Button sx={{ borderRadius: '50%' }} onClick={handleCloseFollowed}>X</Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={containUsers}>
                        <Box sx={containActualUser}>
                            <div>
                                {
                                    nobodyFollowed && (
                                        <div>
                                            <p>You haven't followed anyone!</p>
                                        </div>
                                    )
                                }
                                {
                                    nobodyFollowed === false && (
                                        <div>
                                            {followedUsernames.map((item, index) => {
                                                console.log(item);
                                                return (
                                                    <Box sx={userInfo} key={index}>
                                                        <Box sx={{ ...userProfile, "&:hover": { cursor: 'pointer' } }} component="img" src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" />
                                                        <Box sx={{ ...userName, "&:hover": { cursor: 'pointer' } }}>{item}</Box>
                                                    </Box>
                                                )
                                            })}
                                        </div>
                                    )
                                }
                            </div>
                        </Box>
                    </Box>
                </Box>
            </Modal>



            {/* OPEN MORE DIALOG */}
            <Modal
                open={isOpenMore}
                onClose={handleCloseMore}
            >
                <Box sx={{ ...style, width: '500px' }}>
                    <Button onClick={handleOpenFollowed} sx={buttonStyle}>Followed</Button>
                    <Button onClick={handleOpenFollowers} sx={buttonStyle}>Followers</Button>
                    <Button onClick={handleOpenBlocked} sx={{ ...buttonStyle, borderBottom: 'none' }}>Blocked</Button>
                </Box>
            </Modal>


            {/* OPEN EDIT PROFILE DIALOG */}
            <Modal
                open={isEditing}
                onClose={handleEditClose}
            >
                <Box sx={style}>
                    <Box sx={containTitle}>
                        <Box sx={title}>
                            <Typography sx={{ fontWeight: 'bold' }}>Edit Profile</Typography>
                            <Box sx={exit}>
                                <Button sx={{ borderRadius: '50%' }} onClick={handleEditClose}>X</Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={containPic}>
                        <Box sx={top}>
                            <Typography sx={{ fontWeight: 'bold' }}>Profile Picture</Typography>
                        </Box>
                        <Box sx={{ ...containActual }}>
                            <Box onClick={handleEditPicture} sx={{ ...actual, "&:hover": { cursor: 'pointer' } }} component="img" src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" />
                        </Box>
                    </Box>
                    <Box sx={containPic}>
                        <Box sx={top}>
                            <Typography sx={{ fontWeight: 'bold' }}>Username</Typography>
                        </Box>
                        <Box sx={{ ...containActual }}>
                            <TextField
                                defaultValue={username}
                                inputProps={{
                                    style: {
                                        color: "whitesmoke"
                                    },
                                    maxLength: 23,
                                }}
                                sx={{
                                    '& p': {
                                        color: 'whitesmoke',
                                    },
                                    fieldset: { borderColor: "whitesmoke" },
                                    '& label': {
                                        borderColor: 'white',
                                        color: 'white',
                                    },
                                    '& label.Mui-focused': {
                                        color: 'white',
                                    },
                                    '& .MuiOutlinedInput-root':
                                    {
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                    '&.MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                    }
                                }}
                                onChange={(e) => setNewUser(e.target.value)}
                                id="outlined-basic"
                                error={!!usernameError}
                                value={newUser}
                                //helperText={`${username.length}/${23}`}
                                //helperText={!!usernameError ? 'error' : 'no error'}
                                helperText={!!usernameError ? usernameError : `${newUser.length}/${23}`}
                                label="Username"
                                multiline
                                rows={4}
                            />
                        </Box>
                    </Box>
                    <Box sx={containPic}>
                        <Box sx={top}>
                            <Typography sx={{ fontWeight: 'bold' }}>Bio</Typography>
                        </Box>
                        <Box sx={{ ...containActual }}>
                            <TextField
                                defaultValue={bio}
                                inputProps={{
                                    style: {
                                        color: "whitesmoke"
                                    },
                                    maxLength: 150,
                                }}
                                sx={{
                                    width: 350,
                                    '& p': {
                                        color: 'whitesmoke',
                                    },
                                    fieldset: { borderColor: "whitesmoke" },
                                    '& label': {
                                        borderColor: 'white',
                                        color: 'white',
                                    },
                                    '& label.Mui-focused': {
                                        color: 'white',
                                    },
                                    '& .MuiOutlinedInput-root':
                                    {
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                    '&.MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                    }
                                }}
                                onChange={(e) => setNewBio(e.target.value)}
                                id="outlined-basic"
                                value={newBio}
                                helperText={`${newBio.length}/${CHARACTER_LIMIT}`}
                                label="Bio"
                                multiline
                                rows={4}
                            />
                        </Box>
                    </Box>
                    <Box sx={containPic}>
                        <Box sx={bottom}>
                            <Button onClick={handleEditSubmit}>Save</Button>
                            <Button onClick={handleEditClose}>Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>

            <div className='images'>
                <img src={background} className='cover' />
                <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' className='profilePic' />
                <div className='profileContainer'>
                    <div className='uInfo'>

                        <div className='left'>
                            <a className='fakeLink' href="https://www.facebook.com/" target="_blank">
                                <FacebookIcon fontSize='large' />
                            </a>
                            <a className='fakeLink' href="https://www.twitter.com/" target="_blank">
                                <TwitterIcon fontSize='large' />
                            </a>
                            <a className='fakeLink' href="https://www.instagram.com/" target="_blank">
                                <InstagramIcon fontSize='large' />
                            </a>
                            <a className='fakeLink' href="https://www.linkedin.com/" target="_blank">
                                <LinkedInIcon fontSize='large' />
                            </a>
                        </div>

                        <div className='center'>
                            <span>{username}</span>
                            <div className='info'>
                                <div className='item'>
                                    <PlaceIcon />
                                    <span>USA</span>
                                </div>
                                <div className='item'>
                                    <div className=''>
                                        <LanguageIcon />
                                    </div>
                                    <span>English</span>
                                </div>
                            </div>
                            <div className='bioSection'>
                                <p>Bio: {bio}</p>
                            </div>
                        </div>

                        <div className='right'>
                            <Tooltip title="View Friends">
                                <IconButton onClick={handleOpenMore} className='iconButton'>
                                    <PeopleIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Edit">
                                <IconButton onClick={handleEditOpen} className='iconButton'>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default UserProfile