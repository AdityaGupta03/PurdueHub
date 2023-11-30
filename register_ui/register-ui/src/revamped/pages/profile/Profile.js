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
import { useNavigate, useParams } from 'react-router-dom';


const Profile = () => {

  const navigate = useNavigate();
  const { username } = useParams();
  const user_id = localStorage.getItem('user_id');
  const my_username = localStorage.getItem('username');

  const [mutualFriends, setMutualFriends] = useState([]);
  const [noMutualFriends, setNoMutualFriends] = useState(false);

  const [isOpenMessage, setIsOpenMessage] = useState(false); // open up message dialog
  const [isOpenMore, setIsOpenMore] = useState(false);  // open up 'more' dialog
  const [isReporting, setIsReporting] = useState(false); // open up 'report' dialog
  const [isBlocked, setIsBlocked] = useState(false);
  const [isBanned, setIsBanned] = useState(false);

  const [bio, setBio] = useState(''); // bio is empty at first

  const [title, setTitle] = useState(''); // form data for messsaging (title)
  const [message, setMessage] = useState(''); // form data for messaging (message)

  const [titleError, setTitleError] = useState('');
  const [messageError, setMessageError] = useState('');

  const [reportMessage, setReportMessage] = useState('');
  const [reportError, setReportError] = useState('');

  const [isFollow, setIsFollow] = useState(false); // not followed yet

  const [openMutuals, setOpenMutuals] = useState(false);

  const handleMessageOpen = () => {
    setIsOpenMessage(true);
  }
  const handleMessageClose = () => {
    setTitleError('');
    setMessageError('');
    setTitle('');
    setMessage('');
    setIsOpenMessage(false);
  }

  useEffect(() => {
    // fix up error messages if a user fixes them up
    setTitleError('');
    setMessageError('');
    setReportError('');
    fetchProfileData();
  }, [title, message, reportMessage])

  useEffect(() => {
    fetchProfileData();
    fetchMutualData();
  }, [username])

  async function fetchMutualData() {
    try {
      let response = await fetch("http://127.0.0.1:5000/api/get_mutual_friends", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "user_id": user_id, "other_username": username }),
      });

      let data = await response.json();
      console.log(data);

      if (response.status === 200) {
        if (data.mutual_friends.length === 0) {
          setNoMutualFriends(true);
        } else {
          setNoMutualFriends(false);
        }
        setMutualFriends(data.mutual_friends);
      } else {
        const err_msg = "Error: " + data.error;
      }
    } catch (error) {
      console.log(error);
    } 
  }

  async function fetchProfileData() {
    console.log("Fetching profile data...")
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
        setIsFollow(false);
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

  const handleMessageSend = async () => {
    // message or title is empty validation errors
    if (title === '') {
      setTitleError('Missing Title');
      return;
    }
    else if (message === '') {
      setMessageError('Missing Body');
      return;
    }

    try {
      let res = await fetch('http://localhost:5000/api/msg_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "user_id": user_id, "username": username, "msg": message, "title": title }),
      });

      const data = await res.json();

      // if (res.status == 400 && data.error == "Sender is blocked by user.") {
      //   return;
      // } else if (res.status != 200) {
      //   return;
      // }
    } catch (error) {
      console.log(error);
    }

    // SUCCESS IN SENDING MESSAGE:
    handleMessageClose();
  }

  const handleMoreOpen = () => {
    setIsOpenMore(true);
  }
  const handleMoreClose = () => {
    setIsOpenMore(false);
  }

  const handleReportOpen = () => setIsReporting(true);

  const handleReportClose = () => {
    setReportError('');
    setReportMessage('');
    setIsReporting(false);
  }

  const handleBlock = async () => {
    if (isBlocked) {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/unblock_user", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "user_id": user_id, "unblock_username": username }),
        });

        console.log(response);
        const data = await response.json();

        if (response.status === 200) {
          // setIsBlocked(false);
        } else {
          const err_msg = "Error: " + data.error;
          console.log(err_msg);
        }
      } catch (error) {
        console.log('Error:', error);
      }

      setIsBlocked(false);
    }
    else {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/block_user", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "user_id": user_id, "block_username": username }),
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
      setIsBlocked(true);
    }
  }

  const toggleFollow = async () => {
    if (isBlocked) {
      return;
    }
    if (isFollow) {
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
    else {
      setIsFollow(true);
      try {
        const response = await fetch("http://127.0.0.1:5000/api/follow_user", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "user_id": user_id, "to_follow_username": username }),
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
  }

  const handleReportSend = async () => {
    // message or title is empty validation errors
    if (reportMessage === '') {
      setReportError('Missing Report');
      return;
    }

    let reportee_user = sessionStorage.getItem('username');
    try {
      console.log(username);
      console.log(reportee_user);
      console.log(reportMessage);
      const response = await fetch("http://127.0.0.1:5000/api/report_user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "reported": username, "reportee": reportee_user, "msg": reportMessage }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // setSuccess(true);
      } else {
        const error_msg = 'Error: ' + data.error;
        setReportError(error_msg);
        // setSuccess(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setReportError('Error occurred when submitting the report');
    }

    // SUCCESS IN SENDING REPORT:
    handleReportClose();
  }

  const handleOpenMutuals = () => { setOpenMutuals(true); }
  const handleCloseMutuals = () => { setOpenMutuals(false); }

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
    color: '#f0544f',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: '#333',
    },
    width: '100%',
    borderBottom: '1px solid grey',
  }

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
  const titleModal = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  }
  return (

    <div className="profile">

      {/* REPORT USER DIALOG */}
      <Dialog
        className='dialog'
        open={isReporting}
        onClose={handleReportClose}
        sx={{
          '& .MuiPaper-root': {
            width: '500px',
            background: '#222'
          },
        }}
      >
        <DialogTitle sx={{ color: 'whitesmoke' }}>Reporting User</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'whitesmoke' }}>
            Why are you reporting this user?
          </DialogContentText>
          <TextField
            inputProps={{
              style: {
                color: "whitesmoke"
              }
            }}
            autoFocus
            multiline
            rows={4}
            margin="dense"
            id="body"
            required
            label="Required: Report Claim"
            InputLabelProps={{
              style: {
                color: "grey"
              }
            }}
            onChange={(e) => setReportMessage(e.target.value)}
            error={!!reportError}
            helperText={reportError}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReportClose}>Cancel</Button>
          <Button onClick={handleReportSend}>Send Report</Button>
        </DialogActions>
      </Dialog>

      {/* MESSAGE USER DIALOG */}
      <Dialog
        className='dialog'
        open={isOpenMessage}
        onClose={handleMessageClose}
        sx={{
          '& .MuiPaper-root': {
            background: '#222'
          },
        }}
      >
        <DialogTitle sx={{ color: 'whitesmoke' }}>Message</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'whitesmoke' }}>
            To send a message to this user, include a title of your message as well as the body of your message.
          </DialogContentText>
          <TextField
            inputProps={{
              style: {
                color: "whitesmoke"
              }
            }}
            autoFocus
            required
            margin="dense"
            id="title"
            label="Required: Title of Message"
            InputLabelProps={{
              style: {
                color: "grey"
              }
            }}
            onChange={(e) => setTitle(e.target.value)}
            error={!!titleError}
            helperText={titleError}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            inputProps={{
              style: {
                color: "whitesmoke"
              }
            }}
            autoFocus
            multiline
            rows={4}
            margin="dense"
            id="body"
            required
            label="Required: Body Of Message"
            InputLabelProps={{
              style: {
                color: "grey"
              }
            }}
            onChange={(e) => setMessage(e.target.value)}
            error={!!messageError}
            helperText={messageError}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMessageClose}>Cancel</Button>
          <Button onClick={handleMessageSend}>Send Message</Button>
        </DialogActions>

      </Dialog>

      {/* OPEN MORE DIALOG */}
      <Modal
        open={isOpenMore}
        onClose={handleMoreClose}
      >
        <Box sx={{ ...style, width: '450px' }}>
          <Button onClick={handleReportOpen} sx={buttonStyle}>Report</Button>
          <Button onClick={handleBlock} sx={{ ...buttonStyle, borderBottom: 'none' }}>{isBlocked ? 'Unblock' : 'Block'}</Button>
        </Box>
      </Modal>


      {/* MUTUAL FRIENDS WITH USER */}
      <Modal
        open={openMutuals}
        onClose={handleCloseMutuals}
      >
        <Box sx={{ ...style, width: 400, overflowX: 'hidden', overflowY: 'scroll', maxHeight: '400px' }}>
          <Box sx={containTitle}>
            <Box sx={titleModal}>
              <Typography sx={{ fontWeight: 'bold' }}>Mutual Friends</Typography>
              <Box sx={exit}>
                <Button sx={{ borderRadius: '50%' }} onClick={handleCloseMutuals}>X</Button>
              </Box>
            </Box>
          </Box>
          <Box sx={containUsers}>
            <Box sx={containActualUser}>
              {
                noMutualFriends && (
                  <div>
                    <p>No Mutual Friends!</p>
                  </div>
                )
              }
              {
                noMutualFriends === false && (
                  <div>
                    {mutualFriends.map((item, index) => {
                      return (
                        <Box sx={userInfo}>
                          <Box sx={{ ...userProfile, "&:hover": { cursor: 'pointer' } }} component="img" src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" />
                          <Box sx={{ ...userName, "&:hover": { cursor: 'pointer' } }}>{item}</Box>
                        </Box>

                      )
                    })}
                  </div>
                )
              }
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
              <button className={isBlocked ? 'disabled' : 'isAble'} disabled={isBlocked ? true : false} onClick={toggleFollow}>{isFollow ? 'Unfollow' : 'Follow'}</button>
              <div className='bioSection'>
                <p>Bio: {bio}</p>
              </div>
            </div>

            <div className='right'>
              <Tooltip title="View Mutuals">
                <IconButton onClick={handleOpenMutuals} className='iconButton'>
                  <PeopleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Message">
                <IconButton onClick={handleMessageOpen} className='iconButton'>
                  <EmailIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="More">
                <IconButton onClick={handleMoreOpen} className='iconButton'>
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Profile