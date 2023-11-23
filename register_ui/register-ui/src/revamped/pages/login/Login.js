import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss'
import './LoadingSpinner.css';


const Login = () => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const usernameMessage = <>
    Invalid Username: 4 to 24 characters.
    Must begin with a letter. <br />
    Letters, numbers, underscores, hyphens allowed.
  </>
  const passwordMessage = <>
     Invalid Password: 8 to 24 characters. <br />
    Must include uppercase and lowercase letters,  <br />
    a number, and a special character: !@#$%<br />
  </>

  const exist = false; // testing
  const badPass = false; // testing
  const badUser = false; // testing 

  const navigate = useNavigate();

  // When user inputs changes, error messages go away
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if(badUser) {
      setErrMsg(usernameMessage);
      return;
    }
    else if(badPass) {
      setErrMsg(passwordMessage);
      return;
    }
    else if(exist) {
      setErrMsg('Username does not exist');
      return;
    }
    else {
      setSuccess(true);
      setTimeout(() => {
        navigate('/profile/1'); 
    }, 1000);
    }

  }

  return (
    <div className='login'>
      {success && (
        <div className="loading-overlay">
          <div className="loading-text">Purdue Hub</div>
        </div>
      )}
      <div className="card">
        <div className="left">
          <h1>Welcome To PurdueHub</h1>
          <p>An application targeted to students of Purdue University to enrich their lives!</p>
          <Link className='link-gen' to="/register">
            <span>Don't have an account?</span>
          </Link>
          <Link className='link-gen' to="/forgot-password">
            <span>Forgot password?</span>
          </Link>
          <Link className='link-gen' to="/forgot-username">
            <span>Forgot username?</span>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              required
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPwd(e.target.value)} 
              value={pwd}
            />
            <button onClick={handleSubmit}>Login</button>
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

export default Login