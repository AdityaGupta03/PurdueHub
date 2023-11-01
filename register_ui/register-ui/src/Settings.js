import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';

import { Link, useNavigate } from 'react-router-dom';
import React from 'react'

import {useRef, useState, useEffect} from 'react';
import './Club.css' // css pulled online


function Settings() {

    // Variables to hold true or false values for notification settings 
    const[profDevChecked, setProfDevChecked] = useState(false);
    const[calloutChecked, setCalloutChecked] = useState(false);
    const[disableNottifChecked, setDisableNotifChecked] = useState(false);
    const[checkNotifs, setCheckNotifs] = useState(false);
    
    const[directMessageCheck, setDirectMessageCheck] = useState(false);

    // Functions to grab true or false values if toggles are checked for respective inputs
    const disableNotifChange = (e) => {
        setDisableNotifChecked(e.target.checked);
    }
    const profDevChange = (e) => {
        setProfDevChecked(e.target.checked);
    }

    const clubCalloutChange = (e) => {
        setCalloutChecked(e.target.checked);
    }

    const receiveMessagesChange = async (e) => {
        setDirectMessageCheck(e.target.checked);
        console.log(directMessageCheck);
        let option = directMessageCheck ? "0" : "1";
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

    // Conditional Rendering For Showing Notification Page
    const viewNotif = () => {
        if(checkNotifs === true) {
            setCheckNotifs(false);
        }
        else {
            setCheckNotifs(true);
        }
    }

  return (
    <>
        { checkNotifs ? (
            <div className='whole'>
            <h1>Notifications:</h1>
            <br/>
            <h3>General:</h3>
            <FormControlLabel 
                label='Disable Notifcations'
                control={
                <Switch 
                    checked={disableNottifChecked} 
                    onChange={disableNotifChange}
                    color='success'
                />}
            />
            <br />
            <FormControlLabel 
                label='Professional Development'
                control={
                <Switch 
                    checked={profDevChecked} 
                    onChange={profDevChange}
                    color='success'
                />}
            />
            <br />
            <FormControlLabel 
                label='Club Callout'
                control={
                <Switch 
                    checked={calloutChecked} 
                    onChange={clubCalloutChange}
                    color='success'
                />}
            />
            <br/>
            <br/>
            <h3>Messages:</h3>
            <FormControlLabel 
                label={directMessageCheck ? 'Receive Direct Messages From: Everyone': 
                                            'Receive Direct Messages From: People I am Following'}
                control={
                <Switch 
                    checked={directMessageCheck} 
                    onChange={receiveMessagesChange}
                    color='success'
                />
            }
            />
            <br/>
            <Link className='link' onClick={viewNotif}>Back To Settings</Link>
        </div>
        ):(
            <div className='whole'>
                <h1>Settings:</h1>
                <Link className='link' onClick={viewNotif}>Notifications</Link>
                <Link className='link' to="/forgotpass">Reset Password</Link>
                <Link className='link' to="/forgotusername">Reset Username</Link>
                <Link className='link' to="/userprofile">View Profile</Link>
            </div>
        )}

    </>
  )
}

export default Settings