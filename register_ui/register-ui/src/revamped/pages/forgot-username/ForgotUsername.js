import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './forgotUsername.scss'
import '../login/LoadingSpinner.css';

const ForgotUsername = () => {
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@purdue\.edu$/;

  const emailInvalid = <>
    Invalid Email: must have @purdue.edu
  </>

  const exist = true; // testing
  const badUser = true; // testing 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const a1 = EMAIL_REGEX.test(email);
    if (!a1) {
      setErrMsg(emailInvalid);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/request_new_username", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        sessionStorage.setItem('user_email', email);
        setSuccess(true);
        setTimeout(() => {
          navigate('/username-auth');
        }, 1500);
      } else {
        const error_msg = "Error: " + data.error;
        setErrMsg(error_msg);
      }
    } catch (error) {
      console.log('Error:', error);
      setErrMsg('Error occurred when changing username');
    }
  }

  useEffect(() => {
    setErrMsg('');
  }, [email])


  return (
    <div className='forgot-username'>
      {success && (
        <div className="loading-overlay">
          <div className="loading-text">Please check your email</div>
        </div>
      )}
      <div className="card">
        <div className="left">
          <h1>Forgot Your Username?</h1>
          <p>Dont't sweat it! Enter the email associated with your account, and we will send an authcode to your email. Enter the authcode at the provided page in the email, and you can go ahead and change your username!</p>
          <Link className='link-gen' to="/login">
            <span>Back To Login?</span>
          </Link>
        </div>
        <div className="right">
          <h1>Email</h1>
          <form>
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubmit}>Request Change</button>
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

export default ForgotUsername