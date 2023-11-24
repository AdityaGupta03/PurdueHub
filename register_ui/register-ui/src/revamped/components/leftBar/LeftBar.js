import React, { useState } from 'react'
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

const LeftBar = () => {
  const [openFavClubs, setOpenFavClubs] = useState(false);
  const [openFavClasses, setOpenFavClasses] = useState(false);

  return (
    <div className='leftBar'>
      <div className='container'>
        <div className='menu'>
          <Link to="/user-profile" className="removeStyleLink">
            <div className='user'>
              <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
              <span>John Doe</span>
            </div>
          </Link>

          <Link to="/feedback" className="removeStyleLink">
            <div className='item'>
              <CalendarMonthIcon />
              <span>Calendar</span>
            </div>
          </Link>

          <Link to="/feedback" className="removeStyleLink">

            <div className='item'>
              <EventIcon />
              <span>Interested Events</span>
            </div>
          </Link>
          <Link to="/feedback" className="removeStyleLink">

            <div className='item'>
              <ThermostatIcon />
              <span>Weather</span>
            </div>
          </Link>
          <Link to="/feedback" className="removeStyleLink">
            <div className='item'>
              <BookmarkIcon />
              <span>Favorited Items</span>
            </div>
          </Link>

          <Link to="/feedback" className="removeStyleLink">
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

            <Link to="/feedback" className="removeStyleLink">
              <div className='item'>
                <ForumIcon />
                <span>Give Feedback</span>
              </div>
            </Link>

            <Link to="/feedback" className="removeStyleLink">

              <div className='item'>
                <SettingsIcon />
                <span>Settings</span>
              </div>
            </Link>
          </div>


        </div>
      </div>
    </div>
  )
}

export default LeftBar