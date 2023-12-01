import React from 'react';
import { useRef, useState, useEffect } from 'react';

import SmartToyIcon from '@mui/icons-material/SmartToy';
import MapIcon from '@mui/icons-material/Map';
import SortIcon from '@mui/icons-material/Sort';

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

// CALENDAR IMPORTS
import './calendar.scss'
import { set } from "date-fns";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddIcon from '@mui/icons-material/Add';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import CustomToolbar from './CustomToolBar';

//import Shepherd from "./shepherd.js;"
import "shepherd.js/dist/css/shepherd.css";
import './shepherd.css';
import Shepherd from 'shepherd.js';

const LeftBar = () => {

  const navigate = useNavigate();

  // SHOW TUTORIAL INFO

  const [showTour, setShowTour] = useState(false);
  const [completed, setCompleted] = useState(false);

  const tour = new Shepherd.Tour({
    defaultStepOptions: {
      classes: 'shadow-md bg-purple-dark',
      scrollTo: true,
    },
    useModalOverlay: true,
  });

  const buttonConfig = [
    {
      classes: 'shepherd-button-secondary',
      text: 'Exit',
      action: () => {
        setCompleted(true);
        tour.cancel();
      },
    },
    {
      text: 'Back',
      action: () => {
        tour.back();
      },
    },
    {
      text: 'Next',
      action: () => {
        tour.next();
      },
    },
  ]
  
  tour.addStep({
    id: '1',
    title: 'Welcome to PurdueHub!',
    text: 'Glad to have you here, this is a general layout view of our application to get you started!',
    attachTo: {
      element: '.base-home',
      on: 'right',
    },
    arrow: true,
    classes: 'example-step-extra-class',
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        action: () => {
          console.log('Exited');
          setCompleted(true);
          tour.cancel();
        },
      },
      {
        text: 'Next',
        action: () => {
          console.log('Yo');
          tour.next();
        },
      },
    ],
  },
  );

  tour.addStep({
    id: '2',
    title: 'Viewing Your Profile',
    text: 'You can click on this profile icon to be able to see a list of items, including navigation to your personal profile page!',
    attachTo: {
      element: '.user',
      on: 'right',
    },
    arrow: true,
    classes: 'example-step-extra-class',
    buttons: buttonConfig,
  },
  );

  tour.addStep({
    id: '3',
    title: 'Viewing Your Profile PT2',
    text: 'You can click on this profile icon to be able to your personal profile page directly',
    attachTo: {
      element: '.user-tut',
      on: 'right',
    },
    arrow: true,
    classes: 'example-step-extra-class',
    buttons: buttonConfig,
  },
  );

  tour.addStep({
    id: '4',
    title: 'Viewing Your Calendar',
    text: 'You can click on this calendar icon to be show your own personal calendar which you can personalize',
    attachTo: {
      element: '.calendar-tut',
      on: 'right',
    },
    arrow: true,
    classes: 'example-step-extra-class',
    buttons: buttonConfig,
  },
  );

  tour.addStep({
    id: '5',
    title: 'Viewing Your Interested Events',
    text: 'When you follow a club, you can click here to view all the events you are automatically signed up for and remove any you wish not to partake in',
    attachTo: {
      element: '.interested-tut',
      on: 'right',
    },
    arrow: true,
    classes: 'example-step-extra-class',
    buttons: buttonConfig,
  },
  );
  tour.addStep({
    id: '6',
    title: 'Viewing Weather',
    text: 'If you are wondering how is the weather today, you can checkout this weather page to view it',
    attachTo: {
      element: '.weather-tut',
      on: 'right',
    },
    arrow: true,
    classes: 'example-step-extra-class',
    buttons: buttonConfig,
  },
  );
  tour.addStep({
    id: '7',
    title: 'Viewing FAQ',
    text: 'Checkout this page to view FAQs regarding our application but also tips if you are new to Purdue. We also gave the ability for people to ask a question to the team here at PurdueHub if they would like to',
    attachTo: {
      element: '.faq-tut',
      on: 'right',
    },
    arrow: true,
    classes: 'example-step-extra-class',
    buttons: buttonConfig,
  },
  );

  tour.addStep({
    id: '8',
    title: 'Viewing Favorite Classes',
    text: 'This dropdown will display all the classes you have personally favorited for quick access',
    attachTo: {
      element: '.fav-classes-tut',
      on: 'right',
    },
    arrow: true,
    classes: 'example-step-extra-class',
    buttons: buttonConfig,
  },
  );
  tour.addStep({
    id: '9',
    title: 'Providing Feedback',
    text: 'If you have feedback regarding our application, you can check out this page and send it over to us. We appreciate it!',
    attachTo: {
      element: '.feedback-tut',
      on: 'right',
    },
    arrow: true,
    classes: 'example-step-extra-class',
    buttons: buttonConfig,
  },
  );
  tour.addStep({
    id: '10',
    title: 'Managing settings',
    text: 'If you want to disable or enable certain features of our application, you can do so here',
    attachTo: {
      element: '.settings-tut',
      on: 'right',
    },
    arrow: true,
    classes: 'example-step-extra-class',
    buttons: buttonConfig,
  },
  );

  tour.addStep({
    id: '11',
    title: 'Chatbot',
    text: 'Interact with our AI chatbot, ask it anything!',
    attachTo: {
      element: '.chatbot-tut',
      on: 'right',
    },
    arrow: true,
    classes: 'example-step-extra-class',
    buttons: buttonConfig,
  },
  );
  tour.addStep({
    id: '12',
    title: 'Map View',
    text: 'Want to find events happening around campus, or just figure out the route between classes? Just use our map view and plan your destination.',
    attachTo: {
      element: '.map-tut',
      on: 'right',
    },
    arrow: true,
    classes: 'example-step-extra-class',
    buttons: buttonConfig,
  },
  );

  tour.addStep({
    id: '13',
    title: 'Filter Courses',
    text: 'Normal Search just is not cutting it? Use our filter search and find the exact class with detailed filter features at your disposal!',
    attachTo: {
      element: '.filter-courses-tut',
      on: 'right',
    },
    arrow: true,
    classes: 'example-step-extra-class',
    buttons: [
      {
        text: 'Finish',
        action: () => {
          console.log('Finished');
          setCompleted(true);
          tour.next();
        },
      },
    ],
  },
  );
  // **************************************************************************************************************

  // FAVORITING CLUBS + CLASSES INFO
  const [openFavClubs, setOpenFavClubs] = useState(false);
  const [openFavClasses, setOpenFavClasses] = useState(false);

  // FEEDBACK INFO
  const [openFeedback, setOpenFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');


  // **************************************************************************************************************

  const show_advice = sessionStorage.getItem('show_advice');

  // SETTINGS INFO:
  const [openSettings, setOpenSettings] = useState(false);
  const [isProfDevEnabled, setIsProfEnabled] = useState(false); // check if professional development setting is enabled
  const [isClubCallEnabled, setIsClubCallEnabled] = useState(false); // check if club callout setting is enabled
  const [isDirectMessageEnabled, setIsDirectMessageEnabled] = useState(false); // messaging setting
  const [isTipsEnabled, setIsTipsisTipsEnabled] = useState(false); // setting: allow notifcaitons in top right when loading in

  // **************************************************************************************************************

  const my_username = sessionStorage.getItem('username');
  const my_userid = sessionStorage.getItem('user_id');

  // FAKE DATA

  const sampleMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

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

  // **************************************************************************************************************

  // VIEWING INTERESTED EVENTS DATA

  const [followingEvent, setFollowingEvent] = useState(false); // logic
  const [openInterested, setOpenInterested] = useState(false); // open modal (displays: followed evemts, prof dev events, or club callout events)
  const [showFollowed, setShowFollowed] = useState(true);
  const [showProffesional, setShowProfessional] = useState(false);
  const [showCallout, setShowCallout] = useState(false);

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
    const choice = e.target.checked ? "1" : "0";
    setIsClubCallEnabled(e.target.checked);
    sessionStorage.setItem("show_advice", choice);

    try {
      let res = await fetch('http://localhost:5000/api/set_advice_setting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "user_id": my_userid, "toggleAdvice": choice }),
      });
      const data = await res.json();
      if (res.status == 200) {
      } else {
        console.log("Something went wrong in changing advice toggle: " + res.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("Setting show advice: " + show_advice);
    if (show_advice == "1") {
      setIsClubCallEnabled(true);
    } else {
      setIsClubCallEnabled(false);
    }
  }, [])

  const receiveMessagesChange = async (e) => {
    setIsDirectMessageEnabled(e.target.checked);

    console.log(isDirectMessageEnabled);
    let option = isDirectMessageEnabled ? "0" : "1";
    console.log(option);

    let my_userid = sessionStorage.getItem('user_id');
    try {
      let res = await fetch('http://localhost:5000/api/toggle_dm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "user_id": my_userid, "option": option }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const [openChatbot, setOpenChatbot] = useState(false);

  const handleCloseAll = () => {
    setOpenInterested(!openInterested);
    setShowFollowed(false);
    setShowProfessional(false);
    setShowCallout(false);
  }

  const handleSubmitFeedback = async () => {
    let my_userid = sessionStorage.getItem('user_id');

    try {
      const response = await fetch("http://127.0.0.1:5000/api/submit_feedback", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "user_id": my_userid, "feedback_title": "PurdueHub General Feedback", "feedback_body": feedback }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    setOpenFeedback(!openFeedback);
    // send feedback to the database here
    setFeedback(""); // clear existing feedback
  }


  // **************************************************************************************************************

  // CALENDAR DATA

  const locales = {
    "en-US": require("date-fns/locale/en-US")
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
  });

  //const my_username = sessionStorage.getItem('username');

  const [openCalendar, setOpenCalendar] = useState(false);
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const [openEditEvent, setOpenEditEvent] = useState(false);

  const [editedEvent, setEditedEvent] = useState({ title: "", start: "", end: "" });
  const [oldEditEvent, setOldEditEvent] = useState({ title: "", start: "", end: "" });
  const errRef = useRef(); /* Set focus on an error, to allow accessibility purposes */
  const ref = useRef(null);

  const [errMsg, setErrMsg] = useState('');
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [isCreating, setisCreating] = useState(false);
  const [isAdding, setisAdding] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [calEvents, setCalEvents] = useState([]);

  const [interestedEventsArr, setInterestedEvents] = useState(interestedEvents);

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  useEffect(() => {
    setErrMsg('');
    getEvents();
  }, [newEvent.title, newEvent.start, newEvent.end])

  useEffect(() => {
    if (showTour) {
      tour.start();
    }

    fetchFavClasses();
  }, []);

  const [favClasses, setFavClasses] = useState([]);

  async function fetchFavClasses() {
    try {
      let res = await fetch('http://localhost:5000/api/get_fav_courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "user_id": my_userid }),
      });

      const data = await res.json();
      if (res.status == 200) {
        console.log("Fetched favorite classes");
        console.log(data.courses.rows[0]);
        if (data.courses.rows[0].saved_courses == null) {
          console.log("Empty");
          setFavClasses([]);
        } else {
          console.log("Set it!");
          setFavClasses(data.courses.rows[0].saved_courses);
        }
      } else {
        console.log("Something went wrong in fetching favorite classes: " + res.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddEvent() {
    console.log("Adding event!");
    if (newEvent.title === "") {
      setErrMsg('Event Not Possible: Empty Title!');
      return;
    }

    if (newEvent.start === "") {
      setErrMsg('Event Not Possible: Empty Start Date!');
      return;
    }

    if (newEvent.end === "") {
      setErrMsg('Event Not Possible: Empty End Date!');
      return;
    }

    let body_vals = {
      "username": my_username,
      "title": newEvent.title,
      "start": newEvent.start,
      "end": newEvent.end,
      "description": "",
      "location": "",
      "organization_id": "0"
    }

    try {
      let res = await fetch('http://localhost:5000/api/add_calendar_event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body_vals),
      });

      const data = await res.json();

      if (res.status != 200) {
        setErrMsg(data.error);
        console.log(data.error)
        return;
      } else {
        setNewEvent({ title: "", start: new Date(), end: new Date() });
        setOpenAddEvent(!openAddEvent);
        getEvents();
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  const handleSave = async () => {
    if (editedEvent.title === "") {
      setErrMsg('Event Not Possible: Empty Title!');
      return;
    }

    if (editedEvent.start === "") {
      setErrMsg('Event Not Possible: Empty Start Date!');
      return;
    }

    if (editedEvent.end === "") {
      setErrMsg('Event Not Possible: Empty End Date!');
      return;
    }

    const matchingEvent = calEvents.find((event) =>
      event.title === oldEditEvent.title
    );

    let body_vals = {
      "username": my_username,
      "title": editedEvent.title,
      "start": editedEvent.start,
      "end": editedEvent.end,
      "description": "",
      "location": "",
      "organization_id": "0",
      "id": matchingEvent.id
    }

    // try {
    //   let res = await fetch('http://localhost:5000/api/update_calendar_event', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(body_vals),
    //   });

    //   const data = await res.json();
    //   if (res.status != 200) {
    //     setErrMsg(data.error);
    //     console.log(data.error)
    //     return;
    //   } else {
    //     setEditedEvent({ title: "", start: "", end: "" });
    //     setisCreating(false);
    //     getEvents();
    //   }
    // } catch (error) {
    //   setErrMsg(error);
    //   console.log(error);
    //   return;
    // }

    setOpenEditEvent(!openEditEvent);
  }

  const what = true;

  async function getEvents() {
    // console.log("Getting calendar events for user " + my_username);
    // try {
    //   let res = await fetch('http://localhost:5000/api/get_calendar', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ "username": my_username }),
    //   });

    //   const data = await res.json();
    //   console.log(data);

    //   if (res.status == 500) {
    //     setErrMsg(data.error);
    //     return;
    //   } else if (res.status == 200) {
    //     setCalEvents(data.calendar);
    //     setAllEvents(data.calendar.map(event => ({
    //       title: event.title,
    //       start: new Date(event.start_date),
    //       end: new Date(event.end_date),
    //     })));
    //     return;
    //   }
    // } catch (error) {
    //   setErrMsg(error);
    //   console.log(error);
    //   return;
    // }
  }

  const handleTitleChange = (e) => {
    setEditedEvent({ ...editedEvent, title: e.target.value });
  };

  const handleStartChange = (date) => {
    setEditedEvent({ ...editedEvent, start: date });
  };

  const handleEndChange = (date) => {
    setEditedEvent({ ...editedEvent, end: date });
  };

  const onAddCancel = () => {
    setOpenAddEvent(!openAddEvent);
  }

  const handleEdit = (e) => {
    console.log(e);
    setEditedEvent(e);
    setOldEditEvent(e);
    setOpenEditEvent(!openEditEvent);
  }

  const onCancel = () => {
    setOpenEditEvent(!openEditEvent);
  }

  const onDelete = async () => {
    console.log("Deleting event");
    const matchingEvent = calEvents.find((event) =>
      event.title === oldEditEvent.title
    );

    console.log(calEvents);
    console.log(matchingEvent);

    let body_vals = {
      "username": my_username,
      "id": matchingEvent.id
    }

    try {
      let res = await fetch('http://localhost:5000/api/delete_calendar_event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body_vals),
      });

      const data = await res.json();
      if (res.status != 200) {
        setErrMsg(data.error);
        console.log(data.error)
        return;
      } else {
        setEditedEvent({ title: "", start: "", end: "" });
        setisCreating(false);
        getEvents();
      }
    } catch (error) {
      setErrMsg(error);
      console.log(error);
      return;
    }

    setOpenEditEvent(!openEditEvent);
  }

  function unfollowEvent(index) {
    const updateEvents = [...interestedEventsArr];
    updateEvents.splice(index, 1);
    console.log(updateEvents);
    setInterestedEvents(updateEvents);
  }
  // **************************************************************************************************************
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
              <span>Silence Notification: Intro Message</span>
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
                <button disabled={feedback ? false : true} onClick={() => { handleSubmitFeedback(); }} className='submit-btn'>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* CONTENT INSIDE LEFT NAV BAAR */}
      <div className='container'>
        <div className='menu'>
          <Link to="/user-profile" className="removeStyleLink">
            <div className='user user-tut'>
              <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
              <span>Your Profile</span>
            </div>
          </Link>

          <div onClick={() => setOpenCalendar(!openCalendar)} className="removeStyleLink">
            <div className='item calendar-tut'>
              <CalendarMonthIcon />
              <span>Calendar</span>
            </div>
          </div>

          <div onClick={() => setOpenInterested(!openInterested)} className="removeStyleLink">
            <div className='item interested-tut'>
              <EventIcon />
              <span>Interested Events</span>
            </div>
          </div>

          <Link to="/weather" className="removeStyleLink">
            <div className='item weather-tut'>
              <ThermostatIcon />
              <span>Weather</span>
            </div>
          </Link>

          <Link to="/faq" className="removeStyleLink">
            <div className='item faq-tut'>
              <HelpOutlineIcon />
              <span>FAQ</span>
            </div>
          </Link>

          <div className="removeStyleLink">
            <div onClick={() => setOpenFavClasses(!openFavClasses)} className='item fav-classes-tut'>
              {openFavClasses ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              <span>Favorite Classes:</span>
            </div>
          </div>

          {openFavClasses && (
            <div>
              {favClasses.map((favClass, index) => (
                <div key={index}>
                  <Link to={`/class/${favClass}`} className="removeStyleLink">
                    <div className='class-choice'>
                      <SchoolIcon />
                      <span>{favClass}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          <hr />
          <div className='menu'>
            <span>Others</span>

            {/* FEED BACK */}
            <div onClick={() => setOpenFeedback(!openFeedback)} className="removeStyleLink">
              <div className='item feedback-tut'>
                <ForumIcon />
                <span>Give Feedback</span>
              </div>
            </div>



            {/* SETTINGS */}
            <div onClick={() => setOpenSettings(!openSettings)} className="removeStyleLink">
              <div className='item settings-tut'>
                <SettingsIcon />
                <span>Settings</span>
              </div>
            </div>

            {/* Chatbot */}
            <div onClick={() => navigate('/chat-bot')} className="removeStyleLink">
              <div className='item chatbot-tut'>
                <SmartToyIcon />
                <span>Chatbot</span>
              </div>
            </div>

            {/* Map */}
            <div onClick={() => navigate('/map')} className="removeStyleLink">
              <div className='item map-tut'>
                <MapIcon />
                <span>Map</span>
              </div>
            </div>

            {/* Filter Courses */}
            <div onClick={() => navigate('/filter-courses')} className="removeStyleLink">
              <div className='item filter-courses-tut'>
                <SortIcon />
                <span>Filter Courses</span>
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
            <div>
              <div className='club-drop'>
                {interestedEventsArr.map((event, index) => (
                  <div className='club-item' key={index}>
                    <div className='club-info'>
                      <div onClick={() => sendEventDataView(event.eventName, event.clubName, event.eventDescription, event.followData)} className='club-profile'><img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" /></div>
                      <div onClick={() => sendEventDataView(event.eventName, event.clubName, event.eventDescription, event.followData)} className='club-name'><span>{event.eventName}</span></div>
                      <div className='button-container'>
                        <button onClick={() => unfollowEvent(index)} className={"unfollow-btn"}>{"Unfollow"}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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


      {/* CALENDAR */}

      <Modal onClose={() => { setOpenCalendar(!openCalendar) }} open={openCalendar}>
        <div className='calendar-container'>
          <div onClick={() => { setOpenCalendar(!openCalendar) }} className='modal-exit' >
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
          <div onClick={() => { setOpenAddEvent(!openAddEvent) }} className='modal-create' >
            <div className='create-container'>
              <div className='create-button'>
                <AddIcon className='add-icon' />
                <span >Create</span>
              </div>
            </div>
          </div>
          <div className='modal-title'>
          </div>
          <Calendar localizer={localizer}
            className="calendar-itself"
            startAccessor="start" endAccessor="end"
            events={allEvents}
            onSelectEvent={handleEdit}
            components={{
              toolbar: (toolbarProps) => <CustomToolbar {...toolbarProps} />,
            }}
          />
        </div>
      </Modal>

      {/* ADDING EVENT MODAL */}
      <Modal onClose={() => { setOpenAddEvent(!openAddEvent) }} open={openAddEvent}>
        {/* <div>
          <div style={{ background: 'black', padding: '20px' }}>
            <h2>Add New Event:</h2>
            <div>
              <input type="text"
                placeholder="Add Title"
                style={{ width: "20%", marginRight: "10px" }}
                value={newEvent.title}
                onChange={(e) => setNewEvent(
                  { ...newEvent, title: e.target.value }
                )}
              />
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} style={{ color: "red" }}>{errMsg}</p>
              <DatePicker placeholderText="Start Date"
                showTimeSelect
                minDate={new Date()}
                filterTime={filterPassedTime}
                style={{ marginRight: "10px" }}
                selected={newEvent.start}
                onChange={(start) => setNewEvent({ ...newEvent, start })}
              />
              <DatePicker placeholderText="End Date"
                showTimeSelect
                filterTime={filterPassedTime}
                minDate={new Date()}
                style={{ marginRight: "10px" }}
                selected={newEvent.end}
                onChange={(end) => setNewEvent({ ...newEvent, end })}
              />
              <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
                Add Event
              </button>
              <button onClick={onAddCancel}>Cancel</button>
            </div>
          </div>
        </div> */}
        <div className='norm'>
          <div className="modal-container">

            <div className='modal-title'>
              <span>Adding Event</span>
            </div>

            <div onClick={onAddCancel} className='modal-exit' >
              <IconButton>
                <CloseIcon />
              </IconButton>
            </div>

            <div className='modal-content-1'>
              <input type="text"
                placeholder="Add Title"
                className="calendar-input"
                value={newEvent.title}
                onChange={(e) => setNewEvent(
                  { ...newEvent, title: e.target.value }
                )}
              />
            </div>

            <div className='calendar-content-1'>
              <span>Start Date:</span>
              <DatePicker placeholderText="Start Date"
                showTimeSelect
                minDate={new Date()}
                filterTime={filterPassedTime}
                style={{ marginRight: "10px" }}
                selected={newEvent.start}
                onChange={(start) => setNewEvent({ ...newEvent, start })}
              />
            </div>

            <div className='calendar-content-1'>
              <span>End Date:</span>
              <DatePicker placeholderText="End Date"
                showTimeSelect
                filterTime={filterPassedTime}
                minDate={new Date()}
                style={{ marginRight: "10px" }}
                selected={newEvent.end}
                onChange={(end) => setNewEvent({ ...newEvent, end })}
              />
            </div>
            <div className="err-msg-container">
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} style={{ color: "red" }}>{errMsg}</p>
            </div>
            <div className='modal-content-3'>
              <div className='contain-btn'>
                <button onClick={onAddCancel} className='cancel-btn'>Cancel</button>
              </div>
              <div className='contain-btn'>
                <button className='submit-btn' onClick={handleAddEvent}>Add Event</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* openEditEvent */}
      {/* EDITING EVENT MODAL */}
      <Modal onClose={() => setOpenEditEvent(!openEditEvent)} open={openEditEvent}>
        {/* <div>
          <h2>Editing Event:</h2>
          <input type="text"
            value={editedEvent.title}
            onChange={handleTitleChange}
            filterTime={filterPassedTime}
            placeholder={editedEvent.title} />
          <DatePicker
            minDate={new Date()}
            showTimeSelect
            selected={editedEvent.start}
            onChange={handleStartChange} />
          <DatePicker
            showTimeSelect
            selected={editedEvent.end}
            filterTime={filterPassedTime}
            minDate={new Date()}
            onChange={handleEndChange} />
          <button onClick={handleSave}>Save</button>
          <button onClick={onDelete}>Delete</button>
          <button onClick={onCancel}>Cancel</button>
        </div> */}

        <div className='norm'>
          <div className="modal-container">

            <div className='modal-title'>
              <span>Editing An Event</span>
            </div>

            <div onClick={onAddCancel} className='modal-exit' >
              <IconButton>
                <CloseIcon />
              </IconButton>
            </div>

            <div className='modal-content-1'>
              <input type="text"
                className="calendar-input"
                value={editedEvent.title}
                onChange={handleTitleChange}
                filterTime={filterPassedTime}
                placeholder={editedEvent.title} />
            </div>

            <div className='calendar-content-1'>
              <span>Start Date:</span>
              <DatePicker
                className=""
                minDate={new Date()}
                showTimeSelect
                selected={editedEvent.start}
                onChange={handleStartChange} />
            </div>

            <div className='calendar-content-1'>
              <span>End Date:</span>
              <DatePicker
                showTimeSelect
                selected={editedEvent.end}
                filterTime={filterPassedTime}
                minDate={new Date()}
                onChange={handleEndChange} />
            </div>

            <div className='modal-content-3'>

              <div className='contain-btn'>
                <button onClick={onCancel} className='cancel-btn'>Cancel</button>
              </div>
              <div className='contain-btn'>
                <button className='submit-btn' onClick={onDelete}>Delete</button>
              </div>
              <div className='contain-btn'>
                <button className='submit-btn' onClick={handleSave}>Save</button>
              </div>

            </div>
          </div>
        </div>
      </Modal>
    </div >
  )
}

export default LeftBar