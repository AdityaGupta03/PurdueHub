import React from 'react'
import './leftBar.scss'

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
import ForumIcon from '@mui/icons-material/Forum'; const LeftBar = () => {
  return (
    <div className='leftBar'>
      <div className='container'>
        <div className='menu'>
          <div className='user'>
            <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
            <span>John Doe</span>
          </div>

          <div className='item'>
            <GolfCourseIcon />
            <span>Clubs</span>
          </div>

          <div className='item'>
            <CalendarMonthIcon />
            <span>Calendar</span>
          </div>

          <div className='item'>
            <PeopleIcon />
            <span>Friends</span>
          </div>

          <div className='item'>
            <EventIcon />
            <span>Upcoming Events</span>
          </div>

          <div className='item'>
            <ThermostatIcon />
            <span>Weather</span>
          </div>

          <div className='item'>
            <BookmarkIcon />
            <span>Favorited Items</span>
          </div>
          <hr/>
          <div className='menu'>
            <span>Others</span>

            <div className='item'>
              <ForumIcon />
              <span>Give Feedback</span>
            </div>

            <div className='item'>
              <SettingsIcon />
              <span>Settings</span>
            </div>
            <div className='item'>
              <ForumIcon />
              <span>Give Feedback</span>
            </div>

            <div className='item'>
              <SettingsIcon />
              <span>Settings</span>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default LeftBar