import {useRef, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ChangeUsername = () => {
    const navigate = useNavigate();

    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;;

    const userRef = useRef();
    const errRef = useRef(); 

    const user_id = "1";
    // const user_id = localStorage.getItem('user_id');

    const [user, setUser] = useState(''); 
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])
    
    // When user inputs changes, error messages go away
    useEffect(() => {
        setErrMsg('');
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault(); // avoid reloading the page as default
        const resultTemp = USER_REGEX.test(user); // test validity (has @purdue.edu in it)

        if (!resultTemp) { // if the username is not valid
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
    
        try { // Make api call
            const response = await fetch("http://127.0.0.1:5000/api/update_username", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "newUsername": user, "user_id": user_id }),
            });

            const data = await response.json();

            if (response.status === 200) {
                navigate("/login");
            } else {
                setErrMsg(data.error);
            }
        } catch (error) {
            console.log('Error:', error);
            setErrMsg('An error occurred while creating the account');
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Successfully Changed Username!</h1>
                    <p>
                        <Link to="/login">Back To Sign In</Link>
                    </p>
                </section>
            ) : (
        <section>
            {/* If errmsg is true, display an error and put focus on it*/}
            <p ref={errRef} className={errMsg ? "errmsg" : "offsreen"}>{errMsg}</p>
            <h1> New Username </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                    <input 
                        type='text' 
                        id='username'
                        ref={userRef} // set user focus first on email
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)} // grab input whenever it changes
                        value={user}
                        required
                   />
                   <button>Change Username</button>
            </form>
            <p>Back To Sign In<br />
                <Link to="/login">Sign In</Link>
            </p>
        </section>
         )}
    </>
    )
}

export default ChangeUsername;