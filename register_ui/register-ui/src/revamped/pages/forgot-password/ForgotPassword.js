import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './forgotPassword.scss'
import '../login/LoadingSpinner.css';

const ForgotPassword = () => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const usernameMessage = <>
    Invalid Username: 4 to 24 characters.
    Must begin with a letter. <br />
    Letters, numbers, underscores, hyphens allowed.
  </>
  const usernameNotExist = <>
    Username does not exist
  </>

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/request_new_password", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": user }),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        sessionStorage.setItem('username', user);
        navigate("/password-auth");
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
  }, [user])

  return (
    <div className='forgot-password'>
      {success && (
        <div className="loading-overlay">
          <div className="loading-text">Please check your email</div>
        </div>
      )}
      <div className="card">
        <div className="left">
          <h1>Forgot Your Password?</h1>
          <p>Dont't sweat it! Enter your username associated with your account, and we will send an authcode to your email. Enter the authcode at the provided page in the email, and you can go ahead and change your password!</p>
          <Link className='link-gen' to="/login">
            <span>Back To Login?</span>
          </Link>
          <Link className='link-gen' to="/forgot-username">
            <span>Forgot Username?</span>
          </Link>
        </div>
        <div className="right">
          <h1>Username</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              required
              value={user}
              onChange={(e) => setUser(e.target.value)}
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

export default ForgotPassword