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
    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": user, "password": pwd }),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log("Logged in successfully");
        console.log(data);
        sessionStorage.setItem("user_id", data.user_id);
        sessionStorage.setItem("username", user);
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("show_advice", data.show_advice);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("username", user);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("show_advice", data.show_advice);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/user-profile");
        }, 1500);
      return;
      } else {
        const error_msg = "Error: " + data.error;
        console.log(error_msg);
        setErrMsg(error_msg);
        setSuccess(false);
      }
    } catch (error) {
      console.log('Error:', error);
      setErrMsg('Error occurred when logging in');
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