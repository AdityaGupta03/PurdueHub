import { Link, useNavigate } from 'react-router-dom'
import './register.scss'
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import '../login/LoadingSpinner.css'

const Register = () => {

  const usernameMessage = <>
    4 to 24 characters.
    Must begin with a letter. <br />
    Letters, numbers, underscores, hyphens allowed.
  </>
  const passwordMessage = <>
    8 to 24 characters. <br />
    Must include uppercase and lowercase letters,  <br />
    a number, and a special character: !@#$%<br />
  </>
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [matchError, setMatchError] = useState(false);

  const navigate = useNavigate();
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;;
  const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@purdue\.edu$/;


  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [matchPwd, setMatchPwd] = useState('a');

  const [success, setSuccess] = useState(false);
  useEffect(() => {
    setUsernameError(false);
  }, [user])
  useEffect(() => {
    setEmailError(false);
  }, [email])
  useEffect(() => {
    setPwdError(false);
  }, [pwd])
  useEffect(() => {
    setMatchError(false);
  }, [matchPwd])

  const handleSubmit = (e) => {
    e.preventDefault();

    const a1 = USER_REGEX.test(user);
    const a2 = PWD_REGEX.test(pwd);
    const a3 = EMAIL_REGEX.test(email);
    const a4 = matchPwd === pwd;

    if (!a4) {
      setMatchError(true);
    }
    if (!a1) {
      setUsernameError(true);
    }
    if (!a2) {
      setPwdError(true);
    }
    if (!a3) {
      setEmailError(true);
    }
    if (a1 && a2 && a3 && a4) {
      //SUCCESS DATA
      setSuccess(true);
      setTimeout(() => {
        navigate('/verify-email');
      }, 1000);
      return;
    }

  }

  return (
    <div className='register'>
      {success && (
        <div className="loading-overlay">
          <div className="loading-text">Purdue Hub</div>
        </div>
      )}
      <div className="card">
        <div className="left">
          <h1>Register For PurdueHub</h1>
          <p>Come and join in the fun at PurdueHub! Socialize with your friends, customize your own calendar, join clubs, look up class information, and so much more!</p>
          <Link to="/login" className='link-login'>
            <span>Already have an account?</span>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <div>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUser(e.target.value)}
                style={{
                  color: usernameError ? 'red' : 'white',
                  borderBottom: usernameError ? '1px solid red' : ''
                }}
              />
              <Tooltip title={usernameMessage} placement='right-start'>
                <IconButton className='iconButton'>
                  <InfoIcon sx={{ fontSize: '20px', color: usernameError ? 'red' : 'white' }} />
                </IconButton>
              </Tooltip>

            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                style={{
                  color: emailError ? 'red' : 'white',
                  borderBottom: emailError ? '1px solid red' : ''
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Tooltip title="Must include @purdue.edu" placement='right-start'>
                <IconButton sx={{}} className='iconButton'>
                  <InfoIcon sx={{
                    fontSize: '20px',
                    color: emailError ? 'red' : 'white',
                    // Optional: Center the icon
                  }} />
                </IconButton>
              </Tooltip>
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPwd(e.target.value)}
                style={{
                  color: pwdError ? 'red' : 'white',
                  borderBottom: pwdError ? '1px solid red' : ''
                }}
              />
              <Tooltip title={passwordMessage} placement='right-start'>
                <IconButton className='iconButton'>
                  <InfoIcon sx={{ fontSize: '20px', color: pwdError ? 'red' : 'white', }} />
                </IconButton>
              </Tooltip>

            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setMatchPwd(e.target.value)}
                style={{
                  color: matchError ? 'red' : 'white',
                  borderBottom: matchError ? '1px solid red' : ''
                }}
              />
              <Tooltip title="Must match password above" placement='right-start'>
                <IconButton className='iconButton'>
                  <InfoIcon sx={{ fontSize: '20px', color: matchError ? 'red' : 'white', }} />
                </IconButton>
              </Tooltip>

            </div>
            <button onClick={handleSubmit} className='register-button'>Register</button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Register