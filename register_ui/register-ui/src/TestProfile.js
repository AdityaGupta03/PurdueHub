import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import temp from './temporary-profile.jpeg' // temp picture
import './Profile.css' // css pulled online

import { ToastContainer, toast } from 'react-toastify'; // NEW
import 'react-toastify/dist/ReactToastify.css'; // NEW
import './Club.css' 

function TestProfile() {
    const navigate = useNavigate();
    const username = useState("Billy Joel");
    const my_username = useState("Leo Delgado");
    const [bio, setBio] = useState('Lorem Ipsum random bio information here, blee bloo'); // bio is empty at first
    const [ isBlocked, setIsBlocked ] = useState(false); // not blocked yet
    const [ isBanned, setIsBanned ] = useState(false); // not banned yet
    const[isFollow, setIsFollow] = useState(false); // not followed yet


    const [title, setTitle] = useState(''); // NEW
    const [message, setMessage] = useState(''); // NEW
    const [success, setSuccess] = useState(true); // NEW
    const [errMsg, setErrMsg] = useState(''); // NEW
    const errRef = useRef(); // NEW
    const[isMessaging, setIsMessaging] = useState(false);  // NEW

    const messageUser = () => { // NEW 
        setIsMessaging(true);
    }

    const handleSubmit = async (e) => { // NEW
        e.preventDefault();

        if(title === '') {
            setErrMsg('Emtpy Title')
            return 
        }
        if(message === '') {
            setErrMsg('Emtpy Message')
            return 
        }
        if(isBlocked) {
            setErrMsg("User is blocked, can't send message")
            return
        }
        if(success === true) {
            // IF A USER CAN SEND A MESSAGE SUCCESSFULLY!
            toast.success('Successfully Sent Your Message!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                }); 
                setIsMessaging(false); // conditional render back to main user page
            return
        }
        else {
            // IF A USER CAN NOT SEND A MESSAGE SUCCESSFULLY!
            toast.error('Error: Message Not Sent', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });  
            return
        }
    }
    
    const toggleBlock = () => {
        if(isBlocked === false) {
            setIsFollow(false);
            setIsBlocked(true);
        }
        else {
            setIsBlocked(false);
        }
    }

    const toggleFollow = () => {
        if (isBlocked) {
            return;
        }
        if(isFollow === false) {
            setIsFollow(true);
        }
        else {
            setIsFollow(false);
        }
    }
    return (
        <>
        <ToastContainer
            theme="colored"
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
            {isMessaging ? (
                <div>
                    <section style={{maxWidth: 'auto', minWidth: '600px'}}>
                        <h1>Message: {username}</h1>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offsreen"}>{errMsg}</p>
                        <form onSubmit={handleSubmit}>
                            {/* Title */}
                            <label htmlFor='title'> 
                                Title Of Your Message: 
                            </label>
                            <input
                                type="text"
                                placeholder='Please Input A Title'
                                id='title'
                                autoComplete='off'
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <label htmlFor='message'>Your Message:</label>
                            <textarea
                                id='message'
                                placeholder='Please Input A Message To Us'
                                rows={11}
                                cols={40}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />  
                            <button type='submit'>
                                Send Message
                            </button>
                        </form>
                    </section>
                </div>
            ): (
                <div style={{alignContent: 'center'}}className='whole'>
                    <h1>{username}'s Profile</h1>
                    <Link to="/report">Report user</Link>
                    {
                        isBlocked ? null : <img className='landscape' src={temp} alt="Profile Picture"/>
                    }
                    {
                        isBanned ? <h2>Account has been banned!</h2> : null
                    }
                    <span>
                        <h2>Username: {username}</h2>
                        <button onClick={toggleBlock}>{isBlocked ? 'Unblock' : 'Block'}</button>
                        <button disabled={isBlocked ? true : false} onClick={toggleFollow}>{isFollow ? 'Unfollow' : 'Follow'}</button>
                        <button onClick={messageUser}>Message</button>
                    {/* <button onClick={reportUser}>Report</button> */}
                    </span>
                    {   
                        isBlocked ? null : <p>Bio: {bio}</p>
                    }
                </div>
            )}
        </> 
        
    )
}

export default TestProfile