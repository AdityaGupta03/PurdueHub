import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './usernameAuth.scss'
import '../login/LoadingSpinner.css';

const UsernameAuth = () => {
  const navigate = useNavigate();

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
    else {
      setSuccess(true);
      setTimeout(() => {
        navigate('/change-username');
      }, 750);
    }

  }
  useEffect(() => {
    setErrMsg('');
  }, [authCode])

  return (
    <div className='username-auth'>
      {success && (
        <div className="loading-overlay">
          <div className="loading-text">Authorized...redirecting</div>
        </div>
      )}
      <div className="card">
        <div className="left">
          <h1>Authorize New Username</h1>
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

export default UsernameAuth