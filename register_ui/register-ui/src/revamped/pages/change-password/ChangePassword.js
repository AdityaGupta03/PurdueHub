import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './changePassword.scss'
import '../login/LoadingSpinner.css';

const ChangePassword = () => {
  const username = sessionStorage.getItem('username');

  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const passwordMessage = <>
    8 to 24 characters. <br />
    Must include uppercase and lowercase letters,  <br />
    a number, and a special character: !@#$%<br />
  </>

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validPWD = PWD_REGEX.test(pwd);

    if (!validPWD) {
      setErrMsg(passwordMessage);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/update_password", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "password": pwd, "username": username }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setErrMsg(data.error);
      }
    } catch (error) {
      console.log('Error:', error);
      setErrMsg('Error occurred when changing password');
    }
  }
  
  useEffect(() => {
    setErrMsg('');
  }, [pwd])

  return (
    <div className='change-password'>
      {success && (
        <div className="loading-overlay">
          <div className="loading-text">Success!...Back To Login...</div>
        </div>
      )}
      <div className="card">
        <div className="left">
          <h1>Setup New Password!</h1>
          <p>Make sure your new password follows the guidelines: <br /> - 8 to 24 characters <br />
            - Must include uppercase and lowercase letters, a number, and a special character: !@#$% </p>
          <Link className='link-gen' to="/login">
            <span>Back To Login?</span>
          </Link>
        </div>
        <div className="right">
          <h1>New Password</h1>
          <form>
            <input
              type="text"
              placeholder="Password"
              required
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <button onClick={handleSubmit}>Change Password</button>
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

export default ChangePassword