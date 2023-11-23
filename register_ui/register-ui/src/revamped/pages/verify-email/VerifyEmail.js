import React, { useState, useEffect, } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './verifyEmail.scss'

const VerifyEmail = () => {

    const [authCode, setAuthCode] = useState('');
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const authCode_regex = /^[0-9]{6}$/;
    const navigate = useNavigate();

    useEffect(() => {
        setErrMsg('');
    }, [authCode])

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidCode = authCode_regex.test(authCode);
        if (!isValidCode) { // Is invalid code
            setErrMsg("Please enter a valid authentication code (6 digits).");
            setSuccess(false);
            return;
        }
        else {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate('/login');
            }, 1500);
            return;
        }
    }
    return (
        <div className='register'>
            {success && (
                <div className="loading-overlay">
                    <div className="loading-text">
                        Successful! <br />
                        Loading...
                    </div>
                </div>
            )}
            <div className="card">
                <div className="left">
                    <h1>Verify Your Email</h1>
                    <p>You are almost ready for your journey at PurdueHub! Please check your email for a provided auth code</p>
                    <Link to="/login" className='link-login'>
                        <span className='non-span'>Back To Login?</span>
                    </Link>
                </div>
                <div className="right">
                    <h1>Auth Code</h1>
                    <form>
                        <div className='form-div'>
                            <input
                                type="text"
                                placeholder="Auth Code"
                                onChange={(e) => setAuthCode(e.target.value)}
                            />
                        </div>
                        <button onClick={handleSubmit} className='register-button'>Submit Code</button>
                    </form>
                    {!!errMsg && (
                        <div className='error-message'>
                            <span>{errMsg}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail