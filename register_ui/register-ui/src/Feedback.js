import {useRef, useState, useEffect} from 'react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Feedback() {
    
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    
    const errRef = useRef(); /* Set focus on an error, to allow accessibility purposes */

    useEffect(() => {
        setErrMsg('');
    }, [title, message])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(title === '') {
            setErrMsg('Empty Title')
            return 
        }

        if(message === '') {
            setErrMsg('Empty Body')
            return 
        }

        let my_userid = sessionStorage.getItem('user_id');

        try {
            const response = await fetch("http://127.0.0.1:5000/api/submit_feedback", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "user_id": my_userid, "feedback_title": title, "feedback_body": message }),
            });

            const data = await response.json();
            console.log(data);

            if (response.status != 200) {
                setErrMsg(data.error);
            } else {
                setSuccess(true);
                setErrMsg('');
            }
        } catch (error) {
            console.log(error);
            setErrMsg('Something went wrong, please try again later.');
        }
    }

    return (
        <>
            {success ? (
                <div>
                    <section>
                        <h1>Feedback submitted, thank you!</h1>
                        <p>
                            <Link to="/">Back To Homepage</Link>
                        </p>
                    </section>
                </div>
            ) : (
                <div>
            <section style={{maxWidth: 'auto', minWidth: '600px'}}>
                <h1>Feedback on PurdueHub</h1>
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
                    />
                    <label htmlFor='message'>Your Feedback:</label>
                    <textarea
                        id='message'
                        placeholder='Please Input A Message To Us'
                        rows={11}
                        cols={40}
                        onChange={(e) => setMessage(e.target.value)}
                    />  
                    <button type='submit'>
                        Submit Feedback
                    </button>
            </form>
        </section>
    </div>
            )}
        </>
    )
}

export default Feedback