import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './passwordAuth.scss'
import '../login/LoadingSpinner.css';

const PasswordAuth = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const authCode_regex = /^[0-9]{6}$/;
  const [authCode, setAuthCode] = useState('');

  useEffect(() => {
    setErrMsg('');
  }, [authCode])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidCode = authCode_regex.test(authCode);

    if (!isValidCode) {
      setErrMsg("Please enter a valid authentication code (6 digits).");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/verify_password_reset_code", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "authCode": authCode, "username": username }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/change-password');
        }, 750);
      } else {
        const error_msg = "Error: " + data.error;
        setErrMsg(error_msg);
      }
    } catch (error) {
      console.log('Error:', error);
      setErrMsg('Error occurred when changing password');
    }
  }

  useEffect(() => {
    setErrMsg('');
  }, [authCode])

  return (
    <div className='password-auth'>
      {success && (
        <div className="loading-overlay">
          <div className="loading-text">Authorized...redirecting</div>
        </div>
      )}
      <div className="card">
        <div className="left">
          <h1>Authorize New Password</h1>
          <p>Please enter the provided auth code sent to your email</p>
          <Link className='link-gen' to="/login">
            <span>Back To Login?</span>
          </Link>
        </div>
        <div className="right">
          <h1>Auth Code</h1>
          <form>
            <input
              type="text"
              placeholder="Auth Code"
              required
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
            />
            <button onClick={handleSubmit}>Authorize</button>
          </form>
          {!!errMsg && (
            <div>
              <span>{errMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PasswordAuth