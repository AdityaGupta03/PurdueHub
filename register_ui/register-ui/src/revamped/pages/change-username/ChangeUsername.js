import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './changeUsername.scss'
import '../login/LoadingSpinner.css';

const ChangeUsername = () => {
  const user_email = sessionStorage.getItem('user_email');

  const [user, setUser] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;;

  const usernameMessage = <>
    Invalid Username: 4 to 24 characters.
    Must begin with a letter. <br />
    Letters, numbers, underscores, hyphens allowed.
  </>

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validUser = USER_REGEX.test(user);

    if (!validUser) {
      setErrMsg(usernameMessage);
      return;
    }

    try { // Make api call
      const response = await fetch("http://127.0.0.1:5000/api/update_username", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "newUsername": user, "email": user_email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        sessionStorage.setItem('user_email', "");
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setErrMsg(data.error);
      }
    } catch (error) {
      console.log('Error:', error);
      setErrMsg('An error occurred while creating the account');
    }
  }

  useEffect(() => {
    setErrMsg('');
  }, [user])

  return (
    <div className='change-username'>
      {success && (
        <div className="loading-overlay">
          <div className="loading-text">Success!...Back To Login...</div>
        </div>
      )}
      <div className="card">
        <div className="left">
          <h1>Setup New Username!</h1>
          <p>Make sure your new username follows the guidelines: <br /> - 4 to 24 characters <br />
            - Must begin with a letter. <br />
            - Letters, numbers, underscores, hyphens allowed.</p>
          <Link className='link-gen' to="/login">
            <span>Back To Login?</span>
          </Link>
        </div>
        <div className="right">
          <h1>New Username</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              required
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <button onClick={handleSubmit}>Change Username</button>
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

export default ChangeUsername