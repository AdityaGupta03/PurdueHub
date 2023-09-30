
/*
 * Resources Used: https://www.youtube.com/watch?v=brcHK3P6ChQ&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd
 * Followed along for understanding basic React terms and how to construct this page and others after it. 
 */

import {useRef, useState, useEffect} from 'react';
import React from 'react'
import { Link, Route } from 'react-router-dom';


const Register = () => {
    /* 
     * useRef understanding: ref doesn't reupdate when it gets changed,
     * has a 'current' property, as opposed to rerendering with state, ref 
     * doesn't require one to rerender. Persist values across renders.
     */

    const userRef = useRef(); /* Set focus on user input when the component loads*/
    const errRef = useRef(); /* Set focus on an error, to allow accessibility purposes */
    
    /* USER_REGEX = must start with lower or uppercase letter, 
     * followed by 3-23 characters that include lower or uppercase letters or digits,
     * hypens or underscores.
     */

    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;;

     /* PWD_REGEX = requires at least one lower case letter, one uppercase, and a one special charavter,
      * can be a total of 8-24 characters
      */
    const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@purdue\.edu$/;

    /* user = '', so user is the initial state (X) of whatever useState(X) says*/
    const [user, setUser] = useState('');
    /* Assume a username is already false to avoid complications */
    const [validUserName, setValidUserName] = useState(false);
    /* User is not focused on username input yet */
    const [userFocus, setUserFocus] = useState(false);

    /*
     * Similar to user state above, but in this case we have passwords.
     * Assume the password is invalid, empty, and is not yet focused on by the user
     */

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
        
    /*
     * Similar to password states above, but we are checking for matching passwords
     */

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    /*
     * Incorporate error messages and be adjustable on the type of error, and
     * incorporate success messages for usability 
     */
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    /* useEffect syntax understanding: empty array = run once when rendered, 
     * userState inside the array = update everytime that userState changes. 
     * No array means that it will run after rendering and after every update made.
     */

    /* Stay focused on user input */
    useEffect(() => {
        userRef.current.focus();
    }, [])

    /* Anytime username field changes, validate it */
    useEffect(() => {
        const result = USER_REGEX.test(user); // peforms boolean to see if user follows the user_regex pattern
        console.log(result); // log true or false
        console.log(user); // log user state
        setValidUserName(result); 
    }, [user])

    // Anytume password field changes, validate it
    useEffect(() => {
        const result = PWD_REGEX.test(pwd); // peforms boolean to see if user follows the user_pwd pattern
        console.log(result); // log true or false
        console.log(pwd); // log user pswrd
        setValidPwd(result);
        const match = pwd === matchPwd; // boolean to see if we have a valid match
        setValidMatch(match);
    }, [pwd, matchPwd])

     // Anytime email field changes, validate it
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    })

    // Whenever user changes their username, password the error goes away
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd, email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // avoid JS tricks from enabling user submit button,
        // by validating the existing fields and making sure they are valid
        const a1 = USER_REGEX.test(user);
        const a2 = PWD_REGEX.test(pwd);
        const a3 = EMAIL_REGEX.test(email);
        if (!a1 || !a2 || !a3) {
            setErrMsg("Invalid Entry");
            return; 
        }
        
        // INSERT DATA TO SEND TO BACKEND HERE ! 
        console.log(user, pwd, email);
        setSuccess(true);

    }  


    return (
        // If we have a successful state, return the success screen, otherwise bring back the sign in
        // <> = fragment
        <>
        {success ? (
            <section>
                <h1>Successful!</h1>
                <p>
                    <Link to="/login">Sign In</Link>
                </p>
            </section>
        ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}>{errMsg}</p>
            <h1>Register Into PurdueHub</h1>
            <form onSubmit={handleSubmit}>
                {/* USERNAME */}
                <label htmlFor='username'> 
                    Username: 
                    {/* If we have a valid username, apply valid class or otherwsie hide*/}
                    <span className={validUserName ? "valid" : "hide"}>*V*</span>
                    {/* If we have a valid username and the username state is not empty, hide this message, otherwise display error*/}
                    <span className={validUserName || !user ? "hide" : "invalid"}>*X*</span>
                </label>
                <input
                    type="text"
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    required
                    // onBlur = focus has left element, onFocus = otherwise
                    onFocus={() => setUserFocus(true)} // 
                    onBlur={() => setUserFocus(false)} // 
                />
                {/* if user focus is on the label, and the user
                    is not an empty field, and username is not valid
                    show instructions. 
                    */} 
                <p className={userFocus && user && !validUserName
                     ? "instructions": "offscreen"}>
                    4 to 24 characters. <br/>
                    Must begin with a letter. <br/>
                    Letters, numbers, underscores, hyphens allowed.
                </p>
                    
                {/* EMAIL */}
                <label htmlFor='email'>
                    Email: 
                    <span className={validEmail ? "valid" : "hide"}>*V*</span>
                    <span className={validEmail || !email ? "hide" : "invalid"}>*X*</span>
                </label>
                <input
                    type="text"
                    id='email'
                    autoComplete='off'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    // onBlur = focus has left element, onFocus = otherwise
                    onFocus={() => setEmailFocus(true)} // 
                    onBlur={() => setEmailFocus(false)} // 
                />
                <p className={emailFocus && email && !validEmail
                     ? "instructions": "offscreen"}>
                    Must include @purdue.edu
                </p>

                {/* PASSWORD */}

                <label htmlFor='password'> 
                    Password: 
                    {/* If we have a valid password, apply valid class or otherwsie hide*/}
                    <span className={validPwd ? "valid" : "hide"}>*V*</span>
                    {/* If we have an valid password or password state is empty, hide this message, otherwise display error*/}
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>*X*</span>
                </label>
                <input
                    type="password"
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    // onBlur = focus has left element, onFocus = otherwise
                    onFocus={() => setPwdFocus(true)} // 
                    onBlur={() => setPwdFocus(false)} // 
                />
                <p className={pwdFocus && !validPwd ?
                    "instructions" : "offscreen"}>
                    8 to 24 characters. <br/>
                    Must include uppercase and lowercase letters, a number, and a special character <br />
                    <span>!@#$%</span>
                </p>
                <label htmlFor='confirm_pwd'> 
                    Confirm Password: 
                    {/* Matching password and input password must have something in it */}
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>*V*</span>
                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>*X*</span>
                </label>
                <input
                    type="password"
                    id='confirm_pwd'
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p className={matchFocus && !validMatch ?
                    "instructions" : "offscreen"}>
                    Must match the first password input field.
                </p>
                {/* If we do not have a valid username, or password, or matching password in the confirm box, 
                    then disabled is true, otherwise it is false
                */}
                <button type='submit' disabled={!validUserName || !validPwd || !validMatch ? true : false}>
                    Sign Up
                </button>
            </form>
            <p>
                Already registered? <br />
                <span class> 
                <Link to="/login">Login</Link>
                </span>
            </p>
        </section>
        )}
        </>
    )
}

export default Register
