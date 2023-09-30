import React from 'react';
import {useRef, useState, useEffect} from 'react';
import { Link, Route } from 'react-router-dom';

import Register from './Register';
import Home from './Home';


export const Login = () => {
    
    const userRef = useRef(); // set user focus on first input when the form loads 
    const errRef = useRef(); // set focus on errors if they occur, good for accessibility pursposes as well
    
    const [user, setUser] = useState(''); 
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false); // replace with react router

    // Set focus on first user input when page updates
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // When user inputs changes, error messages go away
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault(); // avoid reloading the page as default

        // INSERT BACKEND LOGIC HERE 

        console.log(user, pwd);
        setUser('');
        setPwd('');
        setSuccess(true);
    }
    return (
        <>
        {success ? (
            <section>
                <h1>Successful!</h1>
                <p>
                    <Link to="/">Back To Home</Link>
                </p>
            </section>
        ) : (
        <section>
            {/* If errmsg is true, display an error and put focus on it*/}
            <p ref={errRef} className={errMsg ? "errmsg" : "offsreen"}></p>
            <h1> Sign In </h1>
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
                <label htmlFor='password'>Password:</label>
                    <input 
                        type='password' // produces dots to obfuscate info
                        id='password'
                        onChange={(e) => setPwd(e.target.value)} // grab input whenever it changes
                        value={pwd}
                        required
                   />
                   <button>Sign In</button>
            </form>
            <p>Need An Account? <br />
                {/*<a href="#">Sign Up</a>  Will need to introduce router */}
                <Link to="/register">Register</Link>
            </p>
            <p>Forgot Password? <br /> 
                <Link to="/forgotpass">Reset Password</Link>
            </p>
        </section>
         )}
         </>
    )
}

export default Login; 