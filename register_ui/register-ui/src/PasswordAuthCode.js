import {useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

export const PasswordAuthCode = () => {

    const test_code = "123456"

    const authCode_regex = /^[0-9]{6}$/;

    const codeRef = useRef();
    const errRef = useRef(); 

    const [code, setCode] = useState(''); 
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])
    
    // When user inputs changes, error messages go away
    useEffect(() => {
        setErrMsg('');
    }, [code])

    const handleSubmit = async (e) => {
        e.preventDefault(); // avoid reloading the page as default
        const isValidCode = authCode_regex.test(code); // test validity (has @purdue.edu in it)
    
        // INSERT BACKEND LOGIC HERE 

        if (!isValidCode) {
            setErrMsg("Please enter a valid authentication code (6 digits).");
            setSuccess(false);
            errRef.current.focus();
        } else if (code !== test_code) {
            setErrMsg("Please enter the correct authentication code.");
            setSuccess(false);
            errRef.current.focus();
        } else {
            setSuccess(true);
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
            <h1> Enter Password Authentication Code </h1>
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