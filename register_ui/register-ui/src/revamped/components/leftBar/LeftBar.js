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

import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';

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
import './optionsModal.scss'


const LeftBar = () => {

  // FAVORITING CLUBS + CLASSES INFO
  const [openFavClubs, setOpenFavClubs] = useState(false);
  const [openFavClasses, setOpenFavClasses] = useState(false);

  // FEEDBACK INFO
  const [openFeedback, setOpenFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');


  // INTERESTED EVENTS INFO
  const [followingEvent, setFollowingEvent] = useState(false); // logic
  const [openInterested, setOpenInterested] = useState(false); // open modal (displays: followed evemts, prof dev events, or club callout events)
  const [showFollowed, setShowFollowed] = useState(false);
  const [showProffesional, setShowProfessional] = useState(false);
  const [showCallout, setShowCallout] = useState(false);


  // SETTINGS INFO:
  const [openSettings, setOpenSettings] = useState(false);
  const [isProfDevEnabled, setIsProfEnabled] = useState(false); // check if professional development setting is enabled
  const [isClubCallEnabled, setIsClubCallEnabled] = useState(false); // check if club callout setting is enabled
  const [isDirectMessageEnabled, setIsDirectMessageEnabled] = useState(false); // messaging setting
  const [isTipsEnabled, setIsTipsisTipsEnabled] = useState(false); // setting: allow notifcaitons in top right when loading in

  const sampleMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const handleCloseAll = () => {
    setOpenInterested(!openInterested);
    setShowFollowed(false);
    setShowProfessional(false);
    setShowCallout(false);
  }

  const interestedEvents = [
    {
      clubName: "ESEC",
      eventName: "Blowing Up Night",
      eventDescription: sampleMessage,
      followData: true,
    },
    {
      clubName: "Boiler League Of Tag",
      eventName: "NERF Armory Night",
      eventDescription: sampleMessage,
      followData: true,
    },
    {
      clubName: "PSUB",
      eventName: "Halloween Ball Event",
      eventDescription: sampleMessage,
      followData: true,
    },
    {
      clubName: "Ill Chess Players",
      eventName: "Competition #1",
      eventDescription: sampleMessage,
      followData: true,
    },
  ]

  const callouts = [
    {
      clubName: "NERF",
      eventName: "First NERF Meeting!",
      eventDescription: sampleMessage,
      followData: true,
    },
    {
      clubName: "HACKERS",
      eventName: "General Introductioary Meeting",
      eventDescription: sampleMessage,
      followData: true,
    },
    {
      clubName: "PSUB",
      eventName: "Join our team!",
      eventDescription: sampleMessage,
      followData: true,
    },
    {
      clubName: "Chess Clubbers",
      eventName: "Intro Golf",
      eventDescription: sampleMessage,
      followData: true,
    },
  ]

  const dev = [
    {
      clubName: "PSUB",
      eventName: "Resume Workshop",
      eventDescription: sampleMessage,
      followData: true,
    },
    {
      clubName: "Purdue's Young Entrepeneurs",
      eventName: "Soft Skills Workshop",
      eventDescription: sampleMessage,
      followData: true,
    },
    {
      clubName: "Business Club",
      eventName: "Learn Professional Practices",
      eventDescription: sampleMessage,
      followData: true,
    },
    {
      clubName: "Welders of Purdue",
      eventName: "Meet Our Speakers",
      eventDescription: sampleMessage,
      followData: true,
    },
  ]

  const [openProfesional, setOpenProf] = useState(false);
  const [openCallout, setOpenCallout] = useState(false);
  const [openFollowed, setOpenFollowed] = useState(false);

  const [dataUsed, setDataUsed] = useState(interestedEvents);

  const [viewingEvent, setViewingEvent] = useState('');
  const [givenEventName, setGivenEventName] = useState('');
  const [givenClubName, setGivenClubName] = useState('');
  const [givenEventDescription, setGivenEventDescription] = useState('');
  const [givenFollowData, setGivenFollowData] = useState(false);

  const sendEventDataView = async (eventName, clubName, eventDescription, followData) => {

    console.log(eventName);

    setViewingEvent(!viewingEvent);
    setGivenEventName(eventName);
    setGivenClubName(clubName);
    setGivenEventDescription(eventDescription);
    setGivenFollowData(followData);
  }
  const closeViewEvent = async () => {
    setViewingEvent(!viewingEvent);
    setGivenEventName("");
    setGivenClubName("");
    setGivenEventDescription("");
    setGivenFollowData("");
  }

  const profDevChange = async (e) => {
    setIsProfEnabled(e.target.checked);
  }
  const clubCalloutChange = async (e) => {
    setIsClubCallEnabled(e.target.checked);
  }
  const receiveMessagesChange = async (e) => {
    setIsDirectMessageEnabled(e.target.checked);
  }

  return (

    <div className='leftBar'>

      {/* SETTINGS */}
      <Modal
        open={openSettings}
        onClose={() => { setOpenSettings(!openSettings) }}>

        <div className="norm">
          <div className="modal-container">
            <div className='modal-title'>
              <span>Settings</span>
            </div>

            <div onClick={() => { setOpenSettings(!openSettings) }} className='modal-exit' >
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
              <span>Events</span>
            </div>
            <div className='settings-content-2'>
              <span>Professional Development</span>
              <Switch
                checked={isProfDevEnabled}
                onChange={profDevChange}
                color='success'
              />
            </div>
            <div className='settings-content-2'>
              <span>Club Callouts</span>
              <Switch
                checked={isClubCallEnabled}
                onChange={clubCalloutChange}
                color='success'
              />
            </div>
            <div className='line'></div>
            <div className='modal-content-1'>
              <span>Notifcations</span>
            </div>
            <div className='settings-content-2'>
              <span>{isDirectMessageEnabled ? 'Receive Direct Messages From: Everyone' :
                'Receive Direct Messages From: People I am Following'}</span>
              <Switch
                checked={isDirectMessageEnabled}
                onChange={receiveMessagesChange}
                color='success'
              />
            </div>
            <div className='line'></div>
            <div className='modal-content-1'>
              <span>Other</span>
            </div>
            <div className='settings-content-2'>
              <span>Allow tip notifications</span>
              <Switch
                checked={isClubCallEnabled}
                onChange={clubCalloutChange}
                color='success'
              />
            </div>
            <div className='modal-content-3'>
              <div className='contain-btn'>
                <button onClick={() => { setOpenSettings(!openSettings) }} className='cancel-btn'>Cancel</button>
              </div>
              <div className='contain-btn'>
                <button onClick={() => { setOpenSettings(!openSettings) }} className='submit-btn'>Save</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* FEEDBACK MODAL */}
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

          <Link to="/weather" className="removeStyleLink">
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



            {/* SETTINGS */}
            <div onClick={() => setOpenSettings(!openSettings)} className="removeStyleLink">
              <div className='item'>
                <SettingsIcon />
                <span>Settings</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* INTERESTED EVENTS MODAL */}
      <Modal onClose={handleCloseAll} open={openInterested}>
        <div className='interested-container'>
          <div className='interested-title'>
            <span>
              Interested Events
            </span>
            <div className='exit-modal' onClick={handleCloseAll}>
              <IconButton><CloseIcon /></IconButton>
            </div>
          </div>

          <div className='club-container'>

            {/* PROFESSIONAL DEVELOPMENT EVENTS */}
            <div className='test-ctn' onClick={() => setShowProfessional(!showProffesional)}>
              <div className='drop-item'>
                <div className='club-info'>
                  <div className='drop-container'>
                    <div className='arrow-contain'>
                      {showProffesional ? <ArrowDropUpIcon className='icon-drop' /> : <ArrowDropDownIcon className='icon-drop' />}
                    </div>
                    <span>Show Professional Development</span>
                  </div>
                </div>
              </div>
            </div>
            {isProfDevEnabled ? (
              <div>
                {showProffesional && (
                  <div className='club-drop'>
                    {dev.map((event, index) => (
                      <div className='club-item' key={index}>
                        <div className='club-info'>
                          <div onClick={() => sendEventDataView(event.eventName, event.clubName, event.eventDescription, event.followData)} className='club-profile'><img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" /></div>
                          <div onClick={() => sendEventDataView(event.eventName, event.clubName, event.eventDescription, event.followData)} className='club-name'><span>{event.eventName}</span></div>
                          <div className='button-container'>
                            <button onClick={() => setFollowingEvent(!followingEvent)} className={followingEvent ? "follow-btn" : "unfollow-btn"}>{followingEvent ? "Follow" : "Unfollow"}</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {showProffesional && (
                  <div className='club-drop'>
                    <div className='club-item'>
                      <div className='club-info'>
                        <div className='club-profile'></div>
                        <div style={{ fontSize: '15px', fontWeight: 700 }}><span>Nothing coming up...</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CLUB CALLOUT EVENTS */}
            <div className='test-ctn' onClick={() => setShowCallout(!showCallout)}>
              <div className='drop-item'>
                <div className='club-info'>
                  <div className='drop-container'>
                    <div className='arrow-contain'>
                      {showCallout ? <ArrowDropUpIcon className='icon-drop' /> : <ArrowDropDownIcon className='icon-drop' />}
                    </div>
                    <span>Show Club Callouts</span>
                  </div>
                </div>
              </div>
            </div>
            {isClubCallEnabled ? (
              <div>
                {showCallout && (
                  <div className='club-drop'>
                    {callouts.map((event, index) => (
                      <div className='club-item' key={index}>
                        <div className='club-info'>
                          <div onClick={() => sendEventDataView(event.eventName, event.clubName, event.eventDescription, event.followData)} className='club-profile'><img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" /></div>
                          <div onClick={() => sendEventDataView(event.eventName, event.clubName, event.eventDescription, event.followData)} className='club-name'><span>{event.eventName}</span></div>
                          <div className='button-container'>
                            <button onClick={() => setFollowingEvent(!followingEvent)} className={followingEvent ? "follow-btn" : "unfollow-btn"}>{followingEvent ? "Follow" : "Unfollow"}</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {showCallout && (
                  <div className='club-drop'>
                    <div className='club-item'>
                      <div className='club-info'>
                        <div className='club-profile'></div>
                        <div style={{ fontSize: '15px', fontWeight: 700 }}><span>Nothing coming up...</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* GENERAL INTERESTED EVENTS */}
            <div className='test-ctn' onClick={() => setShowFollowed(!showFollowed)}>
              <div className='drop-item'>
                <div className='club-info'>
                  <div className='drop-container'>
                    <div className='arrow-contain'>
                      {showFollowed ? <ArrowDropUpIcon className='icon-drop' /> : <ArrowDropDownIcon className='icon-drop' />}
                    </div>
                    <span>Show Followed Events</span>
                  </div>
                </div>
              </div>
            </div>
            {dataUsed.length != 0 ? (
              <div>
                {showFollowed && (
                  <div className='club-drop'>
                    {interestedEvents.map((event, index) => (
                      <div className='club-item' key={index}>
                        <div className='club-info'>
                          <div onClick={() => sendEventDataView(event.eventName, event.clubName, event.eventDescription, event.followData)} className='club-profile'><img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" /></div>
                          <div onClick={() => sendEventDataView(event.eventName, event.clubName, event.eventDescription, event.followData)} className='club-name'><span>{event.eventName}</span></div>
                          <div className='button-container'>
                            <button onClick={() => setFollowingEvent(!followingEvent)} className={followingEvent ? "follow-btn" : "unfollow-btn"}>{followingEvent ? "Follow" : "Unfollow"}</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {showFollowed && (
                  <div className='club-drop'>
                    <div className='club-item'>
                      <div className='club-info'>
                        <div className='club-profile'></div>
                        <div style={{ fontSize: '15px', fontWeight: 700 }}><span>Nothing followed...</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}


          </div>

        </div>
      </Modal >

      {/* ACTUAL EVENT PAGE INFO */}
      <Modal onClose={closeViewEvent} open={viewingEvent}>
        <div className='norm'>
          <div className="modal-container">

            <div className='modal-title'>
              <span>{givenEventName}</span>
            </div>

            <div onClick={closeViewEvent} className='modal-exit' >
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
              <span>Club: {givenClubName}</span>
            </div>

            <div className='modal-content-1'>
              <span>Description: </span>
              <div className='modal-content-2'>
                <span>{givenEventDescription}</span>
              </div>
            </div>

            <div className='modal-content-3'>
              <div className='contain-btn'>
                <button onClick={closeViewEvent} className='cancel-btn'>Back</button>
              </div>
              <div className='contain-btn'>
                <button className='submit-btn'>Follow</button>
              </div>
            </div>
          </div>
        </div>

      </Modal >

    </div >
  )
}

export default LeftBar