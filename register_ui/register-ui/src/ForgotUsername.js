import {useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


export const ForgotUsername = () => {
const userRef = useRef(); // set user focus on first input when the form loads 
const errRef = useRef(); // set focus on errors if they occur, good for accessibility pursposes as well
    
const [email, setEmail] = useState(''); 
const [success, setSuccess] = useState(false); // replace with react router

const [errMsg, setErrMsg] = useState('');

// Set focus on first user input when page updates
useEffect(() => {
    userRef.current.focus();
}, [])

// When user inputs changes, error messages go away
useEffect(() => {
    setErrMsg('');
}, [email])

const handleSubmit = async (e) => {
    e.preventDefault(); // avoid reloading the page as default

    // INSERT BACKEND LOGIC HERE 

    console.log(email);
    setEmail('');
    setSuccess(true);
}

  return (
    <>
        {success ? (
            <section>
                <h1>Successful! <br /> Please check your email</h1>
                <p>
                    <Link to="/login">Back To Sign In</Link>
                </p>
            </section>
        ) : (
        <section>
            {/* If errmsg is true, display an error and put focus on it*/}
            <p ref={errRef} className={errMsg ? "errmsg" : "offsreen"}></p>
            <h1> Forgot Username </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email:</label>
                    <input 
                        type='text' 
                        id='email'
                        ref={userRef} // set user focus first on email
                        autoComplete='off'
                        onChange={(e) => setEmail(e.target.value)} // grab input whenever it changes
                        value={email}
                        required
                   />
                   <button>Reset Username</button>
            </form>
            <p>Back To Sign In<br />
                <Link to="/login">Sign In</Link>
            </p>
        </section>
         )}
    </>
  )
}

export default ForgotUsername;
