
import { set } from 'date-fns';
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
        if(title === '') {
            setErrMsg('Emtpy Title')
            return 
        }
        if(message === '') {
            setErrMsg('Emtpy Message')
            return 
        }
        e.preventDefault();
        setSuccess(true);
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
                        required
                    />
                    <label htmlFor='message'>Your Feedback:</label>
                    <textarea
                        id='message'
                        placeholder='Please Input A Message To Us'
                        rows={11}
                        cols={40}
                        onChange={(e) => setMessage(e.target.value)}
                        required
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