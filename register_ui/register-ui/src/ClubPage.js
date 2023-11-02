import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'
import './Club.css'
import './Profile.css' // css pulled online

import temp from './temporary-profile.jpeg' // temp picture
import works from './fireworks-shape.jpg' // temp picture

import albert from './temp-icons/albert.jpg' // temp picture
import toby from './temp-icons/toby.jpg' // temp picture
import joel from './temp-icons/joel.jpg' // temp picture

function ClubPage() {

    const [viewingEvent, setViewingEvent] = useState(false);
    const [viewingFriends, setViewingFriends] = useState(false);

    const [eventName, setEventName] = useState('X'); // specific event information
    const [eventDescription, setEventDescription] = useState('X'); // specific event information
    const [isInterested, setIsInterested] = useState(false);

    const [clubName, setClubName] = useState('Firework Connoisseurs'); // club name for general page
    const [clubDescription, setClubDescription] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. exercitation ullamco laboris nisi ut  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    const [clubTags, setClubTags] = useState([]);

    const [isFollowingClub, setIsFollowingClub] = useState(false);

    const [indexOfEvent, setIndexOfEvent] = useState(0);
    // example

    const data = [
        {
            eventName: 'Calling Out Firework Fanatics!',
            description: 'We have our first meeting, come join us and let us get to using gunpowder!',
            tags: ["Callout", "Cops", "Crazy"],
            interest: false
        },
        {
            eventName: 'Sightseeing',
            description: 'We are viewing fireworks near the Wabash river at 9PM, October 31st 9PM!',
            tags: ["General"],
            interest: false
        },
        {
            eventName: 'DIY',
            description: 'We are building our own fireworks, this is not illegal haha, November 32nd, 1AM',
            tags: ["General", "DIY"],
            interest: false
        },
        {
            eventName: 'Blowing Up',
            description: 'We are lighting up the DIY fireworks, bring your Bomb suit, a lot of gunpowder and explosions, December 1st, 5AM',
            tags: ["Professional Development"],
            interest: false
        }
    ];

    const friendData = [
        {
            username: 'Billy Joel',
            profilePic: joel
        },
        {
            username: 'Alberty341',
            profilePic: albert
        },
        {
            username: 'tobyRuL3s',
            profilePic: toby
        },
    ];

    const [followedUsernames, setFollowedUsernames] = useState([]);
    const [events, setEvents] = useState(data);

    useEffect(() => {
        fetchEvents();
    }, []);

    async function fetchEvents() {
        let my_userid = sessionStorage.getItem('user_id');
        try {
            let res = await fetch('http://localhost:5000/api/get_club_events', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            let data = await res.json();
            let events = data.events;

            res = await fetch('http://localhost:5000/api/get_all_interested_events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "user_id": my_userid }),
            });

            data = await res.json();
            console.log("Inter");
            let inter = data.events;
            console.log(inter);
            const newEvents = events.map(event => {
                console.log(event);
                const tags = [];
                if (event.professional_development == 1) {
                    tags.push("Professional Development");
                }
                if (event.club_callouts == 1) {
                    tags.push("Club Callout");
                }
                const matchingInter = inter.find(item => item.id === event.id);
                if (matchingInter) {
                  return { ...event, interest: true, tags: tags };
                } else {
                    return { ...event, interest: false, tags: tags };
                }
            });
            console.log("NEW EVENTS");
            console.log(newEvents);
            setEvents(newEvents);
        } catch (error) {
            console.log(error);
        }
        
        try {
            let res = await fetch('http://localhost:5000/api/is_following_org', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "user_id": my_userid, "org_id": "1" }),
            });

            if (res.status == 200) {
                setIsFollowingClub(true);
            } else {
                setIsFollowingClub(false);
            }
        } catch (error) {

        }
    }

    const viewFriends = async () => {

        try {
            let my_userid = sessionStorage.getItem('user_id');
            let res = await fetch('http://localhost:5000/api/get_friends_org', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "user_id": my_userid, "org_id": "1" }),
            });

            let data = await res.json();
            if (res.status == 200) {
                setFollowedUsernames(data.friends);
            }
        } catch (error) {
            console.log(error);
            setViewingFriends(false);
        }

        if(viewingFriends) {
            setViewingFriends(false);
        }
        else {
            setViewingFriends(true);
        }
    }
    // if a user isn't following a club to be notified of all their events, they can choose an event to say there are interested in
    const followEvent = async () => {
        if (isInterested) {

            // If they are no longer interested in it...
            const updatedEvents = [...events];
            updatedEvents[indexOfEvent].interest = false;
            setEvents(updatedEvents);
            setIsInterested(false);

            try {
                let event_id = events[indexOfEvent].id;
                console.log("Removing");
                console.log(event_id);
                let my_userid = sessionStorage.getItem('user_id');
                let res = await fetch('http://localhost:5000/api/remove_interested_event', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "user_id": my_userid, "event_id": event_id }),
                });

                let data = await res.json();
                console.log(data);
            } catch (error) {
                console.log(error);
            }

        }
        else {
            // If they are interested in it....
            //console.log("BEFORE: " + events[indexOfEvent].interest);

            const updatedEvents = [...events];
            updatedEvents[indexOfEvent].interest = true;
            setEvents(updatedEvents);

            //console.log("AFTER: " + events[indexOfEvent].interest);
            setIsInterested(true)

            try {
                let event_id = events[indexOfEvent].id;
                console.log("Removing");
                console.log(event_id);
                let my_userid = sessionStorage.getItem('user_id');
                let res = await fetch('http://localhost:5000/api/add_interested_event', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "user_id": my_userid, "event_id": event_id }),
                });

                let data = await res.json();
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    // notify a user of all events associated with the club
    const followClub = async () => {
        let my_userid = sessionStorage.getItem('user_id');
        if (isFollowingClub) {
            // No longer following a club
            const updatedEvents = events.map(event => {
                // Create a copy of the event object with 'interest' set to false
                return { ...event, interest: false };
            });

            try {
                let res = await fetch('http://localhost:5000/api/remove_org_follower', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "user_id": my_userid, "org_id": "1" }),
                    });
    
                let data = await res.json();
                console.log(data);
            } catch (error) {
                console.log(error);
            }

            for (const ourEvent of events) {
                try {
                    let event_id = ourEvent.id;
                    let res = await fetch('http://localhost:5000/api/remove_interested_event', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "user_id": my_userid, "event_id": event_id }),
                    });
    
                    let data = await res.json();
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            }

            setEvents(updatedEvents);

            setIsFollowingClub(false);
        }
        else {
            // Following a club
            const updatedEvents = events.map(event => {
                // Create a copy of the event object with 'interest' set to false
                return { ...event, interest: true };
            });
            setEvents(updatedEvents);

            setIsFollowingClub(true);

            try {
                let res = await fetch('http://localhost:5000/api/add_org_follower', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "user_id": my_userid, "org_id": "1" }),
                    });
    
                let data = await res.json();
                console.log(data);
            } catch (error) {
                console.log(error);
            }

            for (const ourEvent of events) {
                try {
                    let event_id = ourEvent.id;
                    let res = await fetch('http://localhost:5000/api/add_interested_event', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "user_id": my_userid, "event_id": event_id }),
                    });
    
                    let data = await res.json();
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            }

        }
    }

    const viewEventPageClick = async (name, description, tags, interest, indexOf) => {
        console.log("Interest: " + interest)

        if (viewingEvent) {
            // If no longer on the viewing event page
            setEventName('');
            setEventDescription('');
            setViewingEvent(false);
        }
        else {
            // If viewing event page
            setEventName(name);
            setClubTags(tags);
            setIsInterested(interest);
            setIndexOfEvent(indexOf);
            setEventDescription(description);
            setViewingEvent(true);
        }
    }

    return (
        <>
            {viewingEvent ? (
                <div className='whole'>
                    <div className='containbtn'>
                        <button className='actualbtn' onClick={() => viewEventPageClick(eventName, eventDescription, clubTags, isInterested, indexOfEvent)}>Back</button>
                    </div>
        
                    <div className='intro'>
                        <img className='clubPF' src={works} />
                        <h1 className='title'>{eventName}</h1>
                    </div>

                    <div className='summaryText'>
                        <h3>Description:</h3>
                        <p>{eventDescription}</p>
                        <br />
                    </div>

                    <div className='summaryText'>
                        <h3>Associated Tags:</h3>
                        <br />
                        {clubTags.map((item, index) => {
                            return (
                                <div className='tags' style={{ paddingBottom: '10px' }}>
                                    <p className={item.length === 0 ? "tags" : 'actualTag'}>{item.length === 0 ? "No Tags Associated With Event" : item}</p>
                                </div>
                            )
                        }
                        )}
                    </div>

                    <div className='containbtn' style={{ paddingBottom: '100px' }}>
                        <button className={isFollowingClub ? "disabled" : "actualbtn"} onClick={followEvent} disabled={isFollowingClub ? true : false}>{isInterested ? "Unfollow Event" : "Follow Event"}</button>
                    </div>

                </div>
            ) : (

                <div className='whole'>
                    {viewingFriends ? (
                        <div>
                            <div className='containbtn'>
                                <button className='actualbtn' onClick={viewFriends}>Back</button>
                            </div>
                            <br />
                        <div className='friendsIntro'>
                            <h1 className='friendsTitle'>Users Who Are Interested:</h1>
                            {followedUsernames.map((item, index) => {
                                return (
                                    <div className="changeBox" key={index}>
                                        <div className='imageText'>
                                            <Link to={`/viewprofile/${item.username}`}>{item.username}</Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        </div>
                    ) : (
                        <div>
                        <div className='containbtn'>
                            <button className='actualbtn' onClick={followClub}>{isFollowingClub ? "Unfollow Club" : "Follow Club"}</button>
                            <button className='top-left-btn' onClick={viewFriends}>View Friends</button>
                        </div>
                        <br />
                    <div className='intro'>
                        <img className='clubPF' src={works} />
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
                            {events.map((item, index) => {
                                return (
                                    <Link style={{ textDecorationLine: 'none' }} onClick={() => viewEventPageClick(item.title, item.description, item.tags, item.interest, index)}>
                                        <div key={index} className='event'>
                                            <h3>Event Name:</h3>
                                            <p className='wrapText'>{item.title}</p>
                                            <h3>Event Description: </h3>
                                            <p className='wrapText'>{item.description}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    </div>
                    )}
                    
                </div>
            )}
        </>
    )
}

export default ClubPage