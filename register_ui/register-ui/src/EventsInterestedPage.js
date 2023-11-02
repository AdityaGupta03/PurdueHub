import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Club.css'
import works from './fireworks-shape.jpg' // temp picture

function EventsInterestedPage() {

    const navigate = useNavigate();

    const [notifyProfDev, setNotifyProfDev] = useState(true); // pull notification setting if they toggled this option
    const [notifyGeneralCallout, setNotifyGeneralCallout] = useState(true); // pull notification setting if they toggled this option
    const [isUpcoming, setIsUpcoming] = useState(true); // boolean to check if there upcoming events that a user followed for


    const [isInterested, setIsInterested] = useState(true); // general boolean used for removing events / adding back them back
    const [viewingEvent, setViewingEvent] = useState(false);

    const [index, setIndex] = useState(0);
    const [checkTag, setCheckTag] = useState('');
    const [wantsToRemove, setWantsToRemove] = useState(false);
    const [eventName, setEventName] = useState('X'); // specific event information
    const [eventDescription, setEventDescription] = useState('X'); // specific event information

    const shareOnFacebook = () => {
        const eventDetails = 'Come join us in this event!:'; // Replace with the actual URL of your event
        const url = 'https://www.example.com'; // Placeholder URL
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(eventDetails)}`;
        window.open(facebookShareUrl, '_blank', 'width=600,height=400');
    };

    const headBack = () => {
        navigate("/");
    }
    const profData = [
        {
            eventName: 'Java Workshop',
            description: 'Come and improve your skills in Java, we will teach you..',
        },
        {
            eventName: 'Resume Workshop',
            description: 'Come get your resumes looked at by trained professionals in your career of choice!',
        },
        {
            eventName: 'Soft Skills Workshop',
            description: 'Come get ready for recruiting season by polishing up on your intro to get that job you want!',
        },
    ];
    const callData = [
        {
            eventName: 'Calling Out All CS Majors!',
            description: 'We have our first meeting, come join us!!',
        },
        {
            eventName: 'First NERF Fight!',
            description: 'Come join us at the Clapping Circles for our first NERF Fight of the year!',
        },
        {
            eventName: 'Photography Callout!',
            description: 'Come join us at WALC XXX at 6PM for our first official meeting of the semester!',
        },
    ];

    const generalData = [
        {
            eventName: 'Plants vs Zombies Game Night!!',
            description: 'Come Join us for some Plants vs Zombies goodness!',
        },
        {
            eventName: 'NERF Fight At The Armory',
            description: 'Come join us at the Armory for our regulary scheduled NERF fight on Saturday 9PM',
        },
        {
            eventName: 'Watch Along: Across The Spiderverse',
            description: 'Come join us for this upcoming Halloween to watch Across The Spiderverse',
        },
    ];

    const [allEvents, setAllEvents] = useState(generalData);
    const [profDevEvents, setProfDevEvents] = useState(profData) // pull data of professional development tagged events
    const [calloutEvents, setCalloutEvents] = useState(callData) // pull data of club clalout tagged events

    const followEvent = async () => {
        if (isInterested) {
            // unfollows the event
            setIsInterested(false);
            setWantsToRemove(true); // indicate that you want to remove
            console.log("Unfollowed Event");
            try {
                let event_id;
                if (checkTag === "prof") {
                    event_id = profDevEvents[index].id;
                } else {
                    event_id = calloutEvents[index].id;
                }
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
            // follows the event
            setIsInterested(true);
            setWantsToRemove(false); // indicate that you don't want to remove
            console.log("Refollowed Event");
            try {
                let event_id;
                if (checkTag === "prof") {
                    event_id = profDevEvents[index].id;
                } else {
                    event_id = calloutEvents[index].id;
                }
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

    useEffect(() => {
        fetchData();
    }, [viewingEvent])

    async function fetchData() {
        let my_userid = sessionStorage.getItem('user_id');

        try {
            console.log("Getting events");
            let res = await fetch('http://localhost:5000/api/get_interested_events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "user_id": my_userid }),
            });

            let data = await res.json();
            console.log(data);
            if (res.status == 200) {
                setProfDevEvents(data.notifications.professional_development);
                setCalloutEvents(data.notifications.club_callouts);
                console.log(data.notifications.club_callouts.length);
            }

            console.log("Getting preferences");
            res = await fetch('http://localhost:5000/api/get_preferences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "user_id": my_userid }),
            });

            data = await res.json();
            console.log(data);
            if (res.status == 200) {
                if (data.user_options.professional_development == 1) {
                    setNotifyProfDev(true);
                } else {
                    setNotifyProfDev(false);
                }

                if (data.user_options.club_callouts == 1) {
                    setNotifyGeneralCallout(true);
                } else {
                    setNotifyGeneralCallout(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const viewEventPageClick = (name, description, indexOf, tag) => {
        if (viewingEvent) {
            // if no longer viewing the page of the event...
            setEventName('');
            setEventDescription('');

            if (wantsToRemove) {
                // remove event from list
                if (checkTag === "general") {
                    console.log(checkTag);
                    const events = allEvents;
                    events.splice(index, 1);
                    if (events.length === 0) {
                        setIsUpcoming(false); // this means there exists no events anymore since a user removed them all
                    }
                    setAllEvents(events);
                }
                else if (checkTag === "prof") {
                    console.log(checkTag);
                    const profEvents = profDevEvents;
                    profEvents.splice(index, 1);
                    if (profEvents.length === 0) {
                        setNotifyProfDev(false); // this means there exists no events anymore since a user removed them all
                    }
                    setProfDevEvents(profEvents);

                } else {
                    console.log(checkTag);
                    const callEvents = calloutEvents;
                    callEvents.splice(index, 1);
                    if (callEvents.length === 0) {
                        setNotifyGeneralCallout(false); // this means there exists no events anymore since a user removed them all
                    }
                    setCalloutEvents(callEvents);
                }
                setIsInterested(true);
            }
            setWantsToRemove(false);
            setCheckTag("x");
            setViewingEvent(false);
        }
        else {
            // if viewing the page of the event...
            setEventName(name);
            setIndex(indexOf);
            setCheckTag(tag);
            setEventDescription(description);
            setViewingEvent(true);
        }
    }

    return (
        <>
            {viewingEvent ? (
                <div className='interestedWhole'>
                    <div className='containbtn'>
                        <button className='actualbtn' onClick={() => viewEventPageClick('X', 'X', 0, "X")}>Back</button>
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

                    <div className='containbtn' style={{ paddingBottom: '10px' }}>
                        <button className="actualbtn" onClick={followEvent}>{isInterested ? "Remove Event" : "Add Event"}</button>
                    </div>
                    <br />
                    <div className='containbtn' style={{ paddingBottom: '10px' }}>
                        <button className="actualbtn" onClick={shareOnFacebook}>Share On Facebook</button>
                    </div>
                    <br />
                </div>
            ) : (
                <div className='whole'>
                    <div className='containbtn'>
                        <button className='actualbtn' onClick={headBack}>Back</button>
                    </div>

                    <div className='friendsIntro'>
                        <h1 className='title'>Upcoming Events</h1>
                    </div>

                    <div className='eventCtn'>
                        <h2 style={{ textDecoration: 'underline' }}>Professional Development:</h2>
                        {notifyProfDev ? (
                            <div>
                                    {profDevEvents.length != 0 ? (
                                        <div>
                                            {profDevEvents.map((item, index) => {
                                                return (
                                                    <Link className="clubEventLinks" style={{ textDecorationLine: 'none' }} onClick={() => viewEventPageClick(item.title, item.description, index, "prof")}>
                                                        <div key={index} className='event'>
                                                            <h3>Event Name:</h3>
                                                            <p className='wrapText'>{item.title}</p>
                                                            <h3>Event Description: </h3>
                                                            <p className='wrapText'>{item.description}</p>
                                                        </div>
                                                    </Link>
                                                )
                                            })}
                                        </div>) : (
                                        <p>Nothing Coming Up...</p>
                                    )}
                            </div>
                        ) : (
                            <p>Nothing Coming Up...</p>
                        )}
                    </div>

                    <div className='eventCtn'>
                        <h2 style={{ textDecoration: 'underline' }}>Club Callout:</h2>
                        {notifyGeneralCallout ? (
                            <div>
                                    {calloutEvents.length != 0 ?
                                        (
                                            <div>
                                                {calloutEvents.map((item, index) => {
                                                    return (
                                                        <Link className="clubEventLinks" style={{ textDecorationLine: 'none' }} onClick={() => viewEventPageClick(item.title, item.description, index, "callout")}>
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
                                        ) : (
                                            <p>Nothing Coming Up...</p>
                                        )
                                    }
                            </div>
                        ) : (
                            <p>Nothing Coming Up...</p>
                        )}
                    </div>
                </div>
            )}
        </>

    )
}

export default EventsInterestedPage