import {useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


export const ForgotUsername = () => {

    const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@purdue\.edu$/; // regex for email validity (has @purdue.edu in it)

    const TEMP_EMAIL = "david@purdue.edu" // testing (fake data for what happens when an email doesn't exist in database)

    const userRef = useRef(); // set user focus on first input when the form loads 
    const errRef = useRef(); // set focus on errors if they occur, good for accessibility pursposes as well

    const [email, setEmail] = useState(''); 
    const [success, setSuccess] = useState(false);


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
        const resultTemp = EMAIL_REGEX.test(email); // test validity (has @purdue.edu in it)

        // INSERT BACKEND LOGIC HERE 

        // if it isnt temp email = not exists error
        // if it isnt @purdue.edu = error 
        if(email === TEMP_EMAIL) {
            setEmail('');
            setSuccess(true);
        }
        else if(resultTemp){
            setErrMsg("Email Does Not Exist");
            errRef.current.focus();
        }   
        else {
            setErrMsg("Email is not valid, lacks @purdue.edu");
            errRef.current.focus();
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
                <p><Link to="/changeusername">Change Username Page</Link></p>
            </section>

        ) : (
        <section>
            {/* If errmsg is true, display an error and put focus on it*/}
            <p ref={errRef} className={errMsg ? "errmsg" : "offsreen"}>{errMsg}</p>
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
