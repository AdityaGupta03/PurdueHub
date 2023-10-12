import {useRef, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const PasswordAuthCode = () => {
    const username = sessionStorage.getItem('username');

    const navigate = useNavigate();

    const authCode_regex = /^[0-9]{6}$/;

    const codeRef = useRef();
    const errRef = useRef(); 

    const [code, setCode] = useState(''); 
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    
    // When user inputs changes, error messages go away
    useEffect(() => {
        setErrMsg('');
    }, [code])

    const handleSubmit = async (e) => {
        e.preventDefault(); // avoid reloading the page as default
        const isValidCode = authCode_regex.test(code); // test validity (has @purdue.edu in it)
    
        if (!isValidCode) { // Is invalid code
            setErrMsg("Please enter a valid authentication code (6 digits).");
            setSuccess(false);
            errRef.current.focus();
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/api/verify_password_reset_code", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "authCode": code, "username": username }),
            });

            const data = await response.json();

            if (response.status === 200) {
                navigate("/changepassword");
            } else {
                const error_msg = "Error: " + data.error;
                setErrMsg(error_msg);
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
                    <h1>Successfully Authenticated Code!</h1>
                    <p>
                        <Link to="/login">Back To Sign In</Link>
                    </p>
                </section>
            ) : (
        <section>
            {/* If errmsg is true, display an error and put focus on it*/}
            <p ref={errRef} className={errMsg ? "errmsg" : "offsreen"}>{errMsg}</p>
            <h1> Success! Check your email for a authentication code! Enter Password Authentication Code </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='code'>Authentication Code:</label>
                    <input 
                        type='text' 
                        id='code'
                        ref={codeRef} // set user focus first on email
                        autoComplete='off'
                        onChange={(e) => setCode(e.target.value)} // grab input whenever it changes
                        value={code}
                        required
                   />
                   <button>Check Code</button>
            </form>
            <p>Back To Sign In<br />
                <Link to="/login">Sign In</Link>
            </p>
        </section>
         )}
    </>
    )
}

export default PasswordAuthCode;