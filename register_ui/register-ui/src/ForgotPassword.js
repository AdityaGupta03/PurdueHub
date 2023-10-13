import React from 'react'
import {useRef, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
    const navigate = useNavigate();

    const userRef = useRef(); // set user focus on first input when the form loads 
    const errRef = useRef(); // set focus on errors if they occur, good for accessibility pursposes as well

    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;;
    
    const [user, setUser] = useState(''); 
    const [success, setSuccess] = useState(false); // replace with react router
    const [errMsg, setErrMsg] = useState('');
    
    // Set focus on first user input when page updates
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // When user inputs changes, error messages go away
    useEffect(() => {
        setErrMsg('');
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault(); // avoid reloading the page as default
        const isRegexValid = USER_REGEX.test(user);

        if (!isRegexValid) { // if the username is not valid
            const str = <>
                4 to 24 characters. <br/>
                Must begin with a letter. <br/>
                Letters, numbers, underscores, hyphens allowed.
            </>
            setErrMsg(str);
            setSuccess(false);
            errRef.current.focus();
            return;
        }

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
                navigate("/password-authentication-code");
            } else {
                setErrMsg(data.error);
            }
        } catch (error) {
            console.log('Error:', error);
            setErrMsg('Error occurred when changing password');
        }
    }


  return (
        <>
        {success ? (
            <section>
                <h1>Successful! <br /> Please check your email</h1>
                <p>
                    <Link to="/login">Back To Sign In</Link>
                </p>
                <p><Link to="/changepassword">Change Password Page</Link></p>
            </section>
        ) : (
        <section>
            {/* If errmsg is true, display an error and put focus on it*/}
            <p ref={errRef} className={errMsg ? "errmsg" : "offsreen"}>{errMsg}</p>
            <h1> Forgot Password </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                    <input 
                        type='text' 
                        id='username'
                        ref={userRef} // set user focus first on username
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)} // grab input whenever it changes
                        value={user}
                        required
                   />
                   <button>Reset Password</button>
            </form>
            <p>Forgot Username?<br />
                <Link to="/forgotusername">Request New Username</Link>
            </p>
            <p>Back To Sign In<br />
                <Link to="/login">Sign In</Link>
            </p>
        </section>
         )}
         </>
    )
}

export default ForgotPassword; 
