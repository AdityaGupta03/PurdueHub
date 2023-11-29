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
  const exist = true; // testing
  const badUser = true; // testing 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (badUser === false) {
      setErrMsg(usernameMessage);
      return;
    }
    else if (exist === false) {
      setErrMsg('Username does not exist');
      return;
    }
    else {
      setSuccess(true);
      setTimeout(() => {
        navigate('/password-auth');
      }, 1500);
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