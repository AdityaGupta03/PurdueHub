import {useRef, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';


export const ChangePassword = () => {
    const navigate = useNavigate();
    
    const username = sessionStorage.getItem('username');

    const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const userRef = useRef();
    const errRef = useRef(); 

    const [pwd, setPwd] = useState(''); 
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])
    
    // When user inputs changes, error messages go away
    useEffect(() => {
        setErrMsg('');
    }, [pwd])

    const handleSubmit = async (e) => {
        e.preventDefault(); // avoid reloading the page as default
        const resultTemp = PWD_REGEX.test(pwd); // test validity (has @purdue.edu in it)
    
        if (!resultTemp) { // Not a valid password
            const str = <>
                8 to 24 characters. <br/>
                Must include uppercase and lowercase letters, a number, and a special character (!@#$%)<br />
            </>
            setErrMsg(str);
            setSuccess(false);
            errRef.current.focus();
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/api/update_password", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "password": pwd, "username": username }),
            });

            const data = await response.json();

            if (response.status === 200) {
                navigate("/login");
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
                    <h1>Successfully Changed Password!</h1>
                    <p>
                        <Link to="/login">Back To Sign In</Link>
                    </p>
                </section>
            ) : (
        <section>
            {/* If errmsg is true, display an error and put focus on it*/}
            <p ref={errRef} className={errMsg ? "errmsg" : "offsreen"}>{errMsg}</p>
            <h1> New Password </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='pwd'>Password:</label>
                    <input 
                        type='password' 
                        id='pwd'
                        ref={userRef} // set user focus first on email
                        autoComplete='off'
                        onChange={(e) => setPwd(e.target.value)} // grab input whenever it changes
                        value={pwd}
                        required
                   />
                   <button>Change Password</button>
            </form>
            <p>Back To Sign In<br />
                <Link to="/login">Sign In</Link>
            </p>
        </section>
         )}
    </>
    )
}

export default ChangePassword;