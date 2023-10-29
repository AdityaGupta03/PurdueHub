import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'
import './Club.css' // css pulled online

import temp from './temporary-profile.jpeg' // temp picture
import works from './fireworks-shape.jpg' // temp picture
import eventDATA from './ClubEventData'


function ClubPage() {

    const [viewingEvent, setViewingEvent] = useState(false);

    const [eventName, setEventName] = useState('X'); // specific event information
    const [eventDescription, setEventDescription] = useState('X'); // specific event information
    const [isInterested, setIsInterested] = useState(false);

    const [clubName, setClubName] = useState('Firework Connoisseurs'); // club name for general page
    const [clubDescription, setClubDescription] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. exercitation ullamco laboris nisi ut  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");

    const [isFollowingClub, setIsFollowingClub] = useState(false);

    // example
    const data = [
        {
            eventName:'Sightseeing',
            description: 'We are viewing fireworks near the Wabash river at 9PM, October 31st 9PM!'
        },
        {
            eventName:'DIY',
            description: 'We are building our own fireworks, this is not illegal haha, November 32nd, 1AM'
        },
        {
            eventName:'Blowing Up',
            description: 'We are lighting up the DIY fireworks, bring your Bomb suit, a lot of gunpowder and explosions, December 1st, 5AM'
        }
    ];
    const [ events, setEvents ] = useState(data);

    // if a user isn't following a club to be notified of all their events, they can choose an event to say there are interested in
    const followEvent = () => {
        if(isInterested) {
            setIsInterested(false);
        }
        else {
            setIsInterested(true)
        }
    }

    // notify a user of all events associated with the club
    const followClub = () => {
        if(isFollowingClub) {
            setIsFollowingClub(false);
        }
        else {
            setIsFollowingClub(true)
        }
    }

    const viewEventPageClick = (name, description) => {

        console.log(viewingEvent);
        if(viewingEvent) {
            setEventName('');
            setEventDescription('');
            setViewingEvent(false);
        }
        else {
            setEventName(name);
            setEventDescription(description);
            setViewingEvent(true);
        }
    }
    
    return (
        <>
            {viewingEvent ? (
                <div className='whole'>
                    <div className='containbtn'>
                        <button className='actualbtn' onClick={() => viewEventPageClick('X', 'X')}>Back</button>
                    </div>

                    <div className='intro'>
                        <img className='clubPF' src={works}/>
                        <h1 className='title'>Event: {eventName}</h1>
                    </div>

                    <div className='summaryText'>
                        <h3>Description:</h3>
                        <p>{eventDescription}</p>
                    </div>

                    <div className='containbtn' style={{paddingBottom: '100px'}}>
                        <button className={isFollowingClub ? "disabled" : "actualbtn"} onClick={followEvent} disabled={isFollowingClub ? true : false}>{isInterested ? "Unfollow Event": "Follow Event"}</button>
                    </div>
                </div>                
            ) : (
                <div className='whole'>
                <div className='containbtn'>
                    <button className='actualbtn' onClick={followClub}>{isFollowingClub ? "Unfollow Club": "Follow Club"}</button>
                </div>
                <div className='intro'>
                    <img className='clubPF' src={works}/>
                    <h1 className='title'>{clubName}</h1>
                </div>
        
                <div className='summaryText'>
                <h3>Summary:</h3>
                    <p>{clubDescription}</p>
                </div>
                
                <div className='info'>
                    <h3>General Info:</h3>
                    <p>West Lafayette, IN 47907-2034</p>
                    <p>United States</p>
                    <p>Email: fireworksconns@purdue.edu</p>
                </div>
        
                <div className='eventCtn'>
                    <h2>Upcoming Events:</h2>
                    <div>
                        {data.map((item, index) => {
                            return (
                                <Link style={{textDecorationLine: 'none'}} onClick={() => viewEventPageClick(item.eventName, item.description)}>
                                    <div key={index} className='event'>
                                        <h3>Event Name:</h3>
                                        <p>{item.eventName}</p>
                                        <h3>Event Description: </h3>
                                        <p>{item.description}</p>
                                    </div>
                                </Link>
                            )    
                        })}
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default ClubPage