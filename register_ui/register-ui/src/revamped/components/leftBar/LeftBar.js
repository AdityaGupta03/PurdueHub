import React from 'react';
import { useRef, useState, useEffect } from 'react';

import './leftBar.scss'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  Link
} from "react-router-dom";
// clubs
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
// delete acc
import DeleteIcon from '@mui/icons-material/Delete';
// calendar
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// friends
import PeopleIcon from '@mui/icons-material/People';
// upcoming events 
import EventIcon from '@mui/icons-material/Event';
// weather 
import ThermostatIcon from '@mui/icons-material/Thermostat';
// settings
import SettingsIcon from '@mui/icons-material/Settings';
// personal favorite items
import BookmarkIcon from '@mui/icons-material/Bookmark';
// feedback

// faq
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import ForumIcon from '@mui/icons-material/Forum';
import SchoolIcon from '@mui/icons-material/School';


import IconButton from '@mui/material/IconButton';
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

import Paper, { Icon } from '@mui/material';
import styled from '@emotion/styled';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import './modal.scss';

import './interestedModal.scss'

const LeftBar = () => {

  const [openFavClubs, setOpenFavClubs] = useState(false);
  const [openFavClasses, setOpenFavClasses] = useState(false);

  const [openFeedback, setOpenFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  const [openInterested, setOpenInterested] = useState(false);

  const [followingEvent, setFollowingEvent] = useState(false);

  const interestedEvents = [
    {
      clubName: "ESEC",
      eventName: "Callout",
    },
    {
      clubName: "Boiler League Of Tag",
      eventName: "NERF Armory Night",
    },
    {
      clubName: "PSUB",
      eventName: "Halloween Ball Event"
    },
    {
      clubName: "Ill Chess Players",
      eventName: "Competition #1"
    },
  ]

  return (

    <div className='leftBar'>

      <Modal
        open={openFeedback}
        onClose={() => { setOpenFeedback(!openFeedback) }}>

        <div className="norm">
          <div className="modal-container">

            <div className='modal-title'>
              <span>Feedback</span>
            </div>

            <div onClick={() => { setOpenFeedback(!openFeedback) }} className='modal-exit' >
              <IconButton sx={{
                backgroundColor: '#484a4d',
                width: '30px',
                height: '30px',
                padding: '20px',
                color: 'white',
              }}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className='modal-content-1'>
              <span>How can we improve?</span>
            </div>
            <div className='modal-content-2'>
              <span>Details</span>
              <textarea
                placeholder='Feedback Here'
                onChange={(e) => setFeedback(e.target.value)}
                value={feedback}
              ></textarea>
            </div>
            <div className='modal-content-3'>
              <div className='contain-btn'>
                <button onClick={() => { setOpenFeedback(!openFeedback) }} className='cancel-btn'>Cancel</button>
              </div>
              <div className='contain-btn'>
                <button disabled={feedback ? false : true} onClick={() => { setOpenFeedback(!openFeedback); setFeedback("") }} className='submit-btn'>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className='container'>
        <div className='menu'>
          <Link to="/user-profile" className="removeStyleLink">
            <div className='user'>
              <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
              <span>John Doe</span>
            </div>
          </Link>

          <Link to="/" className="removeStyleLink">
            <div className='item'>
              <CalendarMonthIcon />
              <span>Calendar</span>
            </div>
          </Link>

          <div onClick={() => setOpenInterested(!openInterested)} className="removeStyleLink">
            <div className='item'>
              <EventIcon />
              <span>Interested Events</span>
            </div>
          </div>

          <Link to="/" className="removeStyleLink">

            <div className='item'>
              <ThermostatIcon />
              <span>Weather</span>
            </div>
          </Link>

          <Link to="/" className="removeStyleLink">
            <div className='item'>
              <HelpOutlineIcon />
              <span>FAQ</span>
            </div>
          </Link>

          <div className="removeStyleLink">
            <div onClick={() => setOpenFavClasses(!openFavClasses)} className='item'>
              {openFavClasses ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              <span>Favorite Clubs:</span>
            </div>
          </div>

          {openFavClasses && (
            <div>
              <Link to="/club/Club Name 1" className="removeStyleLink">
                <div className='club'>
                  <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
                  <span>Club 1 Name</span>
                </div>
              </Link>
              <Link to="/club/Club Name 2" className="removeStyleLink">
                <div className='club'>
                  <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
                  <span>Club 2 Name</span>
                </div>
              </Link>
              <Link to="/club/Club Name 3" className="removeStyleLink">
                <div className='club'>
                  <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
                  <span>Club 3 Name</span>
                </div>
              </Link>
            </div>
          )}

          <div className="removeStyleLink">
            <div onClick={() => setOpenFavClubs(!openFavClubs)} className='item'>
              {openFavClubs ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              <span>Favorite Classes:</span>
            </div>
          </div>

          {openFavClubs && (
            <div>
              <Link to="/class/name1" className="removeStyleLink">
                <div className='class-choice'>
                  <SchoolIcon />
                  <span>Class Name 1</span>
                </div>
              </Link>
              <Link to="/class/name2" className="removeStyleLink">
                <div className='class-choice'>
                  <SchoolIcon />
                  <span>Class Name 2</span>
                </div>
              </Link>
              <Link to="/class/name3" className="removeStyleLink">
                <div className='class-choice'>
                  <SchoolIcon />
                  <span>Class Name 3</span>
                </div>
              </Link>
            </div>
          )}
          <hr />
          <div className='menu'>
            <span>Others</span>

            {/* FEED BACK */}
            <div onClick={() => setOpenFeedback(!openFeedback)} className="removeStyleLink">
              <div className='item'>
                <ForumIcon />
                <span>Give Feedback</span>
              </div>
            </div>



            <Link to="/feedback" className="removeStyleLink">
              <div className='item'>
                <SettingsIcon />
                <span>Settings</span>
              </div>
            </Link>
          </div>

        </div>
      </div>

      <Modal onClose={() => setOpenInterested(!openInterested)} open={openInterested}>
        <div className='interested-container'>
          <div className='interested-title'>
            <span>Interested Events</span>
            <div className='exit-modal' onClick={() => setOpenInterested(!openInterested)}>
              <IconButton><CloseIcon /></IconButton>
            </div>
          </div>
          <div className='club-container'>
            <div className='club-item'>
              <div className='club-info'>
                <div className='club-profile'><img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" /></div>
                <div className='club-name'>CS Memers Discord Night!</div>
                <div className='button-container'>
                  <button onClick={() => setFollowingEvent(!followingEvent)} className={followingEvent ? "follow-btn" : "unfollow-btn"}>{followingEvent ? "Follow" : "Unfollow"}</button>
                </div>
              </div>
            </div>
            <div className='club-item'>
              <div className='club-info'>
                <div className='club-profile'><img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" /></div>
                <div className='club-name'>1st Club Callout!</div>
                <div className='button-container'>
                  <button onClick={() => setFollowingEvent(!followingEvent)} className={followingEvent ? "follow-btn" : "unfollow-btn"}>{followingEvent ? "Follow" : "Unfollow"}</button>
                </div>
              </div>
            </div>
            <div className='club-item'>
              <div className='club-info'>
                <div className='club-profile'><img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" /></div>
                <div className='club-name'>NERF Armory Fight!</div>
                <div className='button-container'>
                  <button onClick={() => setFollowingEvent(!followingEvent)} className={followingEvent ? "follow-btn" : "unfollow-btn"}>{followingEvent ? "Follow" : "Unfollow"}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

    </div >
  )
}

export default LeftBar