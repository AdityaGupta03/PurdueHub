import React, { useState } from 'react'
import './club.scss'

import defaultBG from './purdue-university-background.jpg'
import defaultPF from './def-pf.jpg'
import defaultEventImage from './club-event-image.jpeg'

import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { Modal, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import "../../components/leftBar/modal.scss"
const Club = () => {
  const sampleMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const location = "Purdue Memorial Union";
  const time = "Wednesday, November 29 at 5:30PM EST";

  const [isFollowingClub, setIsFollowingClub] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isViewingEvent, setIsViewingEvent] = useState(false);

  const [eventName, setEventName] = useState(false);
  const [eventLocation, setEventLocation] = useState(false);
  const [eventDescription, setEvenDescription] = useState(false);
  const [eventTime, setEventTime] = useState(false);
  const [isFollowingEvent, setIsFollowingEvent] = useState(false);

  const setupEventInfo = async (nameOf, locationOf, timeOf, descriptionOf, isFollow) => {
    setEventName(nameOf);
    setEventLocation(locationOf);
    setEventTime(timeOf);
    setEvenDescription(descriptionOf);
    setIsFollowingEvent(isFollow);
  }

  const events = [
    {
      eventName: "Movie Watch Along",
      eventDescription: sampleMessage,
      eventLocation: location,
      eventTime: time
    },
    {
      eventName: "Dancing Lessons",
      eventDescription: sampleMessage,
      eventLocation: location,
      eventTime: time
    },
    {
      eventName: "Resume Workshop",
      eventDescription: sampleMessage,
      eventLocation: location,
      eventTime: time
    },
  ]
  return (
    <div className='club-page'>
      <div className='images'>
        <img src={defaultBG} className='cover' />
        <img src={defaultPF} alt='' className='club-profile' />

        <div className='container'>
          <div className='club-info'>
            <div className='wrapper'>
              <div className='top-right'>
                <button className={isFollowingClub ? "un-fav" : "fav"}>{isFollowingClub ? "Unfavorite" : "Favorite"}</button>
                <button className={isFavorite ? "unfollow" : "follow"}>{isFavorite ? "Unfollow" : "Follow"}</button>
              </div>
              <div className='club-name'>PSUB</div>
              <div className='club-description'>
                <span>The Purdue Student Union Board provides a variety of programs and services that enrich and entertain. Every day the Purdue Student Union Board (PSUB) works hard to bring fun-filled excitement to the lives of every students of Purdue University and every citizen of the Greater Lafayette area through programming, event planning, and project presentations.  PSUB members serve as the voice of Purdue students as they participate in cooperative management of the Purdue Memorial Union.  It's easy to get involved with PSUB! Simply come to our callout, stop by the office, email, or call us and we will set up a time to tell you more about PSUB.</span>
              </div>
            </div>
          </div>
          <div className='label'>
            <span>Upcoming Events</span>
          </div>

          <div className='card-container'>
            {events.map((event, index) => (
              <div className='card-wrap' key={index}>
                <div className='card' onClick={() => {setupEventInfo(event.eventName, event.eventLocation, event.eventTime, event.eventDescription, false); setIsViewingEvent(!isViewingEvent)}}>
                  <div className='card-pic'></div>
                  <div className='card-title'>
                    <span>{event.eventName}</span>
                  </div>
                  <div className='card-info-container'>
                    <div className='card-details'>
                      <span className='start-time'>{event.eventTime}</span>
                      <span>{event.eventLocation}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>



      {/* ACTUAL EVENT PAGE INFO */}
      <Modal onClose={() => setIsViewingEvent(!isViewingEvent)} open={isViewingEvent}>
        <div className='norm'>
          <div className="modal-container">

            <div className='modal-title'>
              <span>{eventName}</span>
            </div>

            <div onClick={() => setIsViewingEvent(!isViewingEvent)} className='modal-exit' >
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
              <span>Description: </span>
              <div className='modal-content-2'>
                <span>{eventDescription}</span>
              </div>
            </div>

            <div className='modal-content-3'>
              <div className='contain-btn'>
                <button onClick={() => setIsViewingEvent(!isViewingEvent)} className='cancel-btn'>Back</button>
              </div>
              <div className='contain-btn'>
                <button className='submit-btn'>Follow</button>
              </div>
            </div>
          </div>
        </div>

      </Modal >
    </div>
  )
}

export default Club