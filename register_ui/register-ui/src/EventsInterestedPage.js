import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Club.css' 

function EventsInterestedPage() {

    const navigate = useNavigate();
    const[profDevData, setProfDevData] = useState([]); // pull data of professional development tagged events
    const[generalClubCallData, setGeneralCluCallbData] = useState([]); // pull data of club clalout tagged events
    const[notifyProfDev, setNotifyProfDev] = useState(false); // pull notification setting if they toggled this option
    const[notifyGeneralCallout, setNotifyGeneralCallout] = useState(false); // pull notification setting if they toggled this option
    
    const headBack = () => {
        navigate("/");
    }
    const profData = [
        {
            eventName:'Java Workshop',
            description: 'Come and improve your skills in Java, we will teach you..',
        },
        {
            eventName:'Resume Workshop',
            description: 'Come get your resumes looked at by trained professionals in your career of choice!',
        },
        {
            eventName:'Soft Skills Workshop',
            description: 'Come get ready for recruiting season by polishing up on your intro to get that job you want!',
        },
    ];
    const callData = [
        {
            eventName:'Calling Out All CS Majors!',
            description: 'We have our first meeting, come join us!!',
        },
        {
            eventName:'First NERF Fight!',
            description: 'Come join us at the Clapping Circles for our first NERF Fight of the year!',
        },
        {
            eventName:'Photography Callout!',
            description: 'Come join us at WALC XXX at 6PM for our first official meeting of the semester!',
        },
    ];

    return (
    <div className='whole'>
        <div className='containbtn'>
            <button className='actualbtn' onClick={headBack}>Back</button>
        </div>

        <div className='intro'>
            <h1 className='title'>Events I am Interested In</h1>
        </div>

        <div className='eventCtn'>
            <h2 style={{textDecoration: 'underline'}}>Professional Development:</h2>
                {notifyProfDev ? (
                     <div>
                        {profData.map((item, index) => {
                             return (
                                <div key={index} className='event'>
                                    <h3>Event Name:</h3>
                                    <p className='wrapText'>{item.eventName}</p>
                                    <h3>Event Description: </h3>
                                    <p className='wrapText'>{item.description}</p>
                                </div>
                                )    
                            })}
                     </div>
                ) : (
                    <p>You Don't Have Notifications For This Enabled</p>
                )}
        </div>

        <div className='eventCtn'>
            <h2 style={{textDecoration: 'underline'}}>Club Callout:</h2>
                {notifyGeneralCallout ? (
                     <div>
                        {callData.map((item, index) => {
                             return (
                                <div key={index} className='event'>
                                    <h3>Event Name:</h3>
                                    <p className='wrapText'>{item.eventName}</p>
                                    <h3>Event Description: </h3>
                                    <p className='wrapText'>{item.description}</p>
                                </div>
                                )    
                            })}
                     </div>
                ) : (
                    <p>You Don't Have Notifications For This Enabled</p>
                )}
        </div>
    </div>
  )
}

export default EventsInterestedPage