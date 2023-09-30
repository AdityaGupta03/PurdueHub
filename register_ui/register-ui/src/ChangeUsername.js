import {useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

export const ChangeUsername = () => {

    const previousUsername = "david123"; // testing (check if the username already is the same)
    const alreadyExistsUsername = "mikey54"; // testing (check if entered username already exists)

    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;;

    const userRef = useRef();
    const errRef = useRef(); 

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
    
        // INSERT BACKEND LOGIC HERE 

        if(user === previousUsername) {
            setErrMsg('Username was already used previously, set a new username');
            setSuccess(false);
            errRef.current.focus();

        }
        else if(user === alreadyExistsUsername) {
            setErrMsg('Username already exists');
            setSuccess(false);
            errRef.current.focus();
        }
        else if(!resultTemp){
            const str = <>
                4 to 24 characters. <br/>
                Must begin with a letter. <br/>
                Letters, numbers, underscores, hyphens allowed.
            </>
            setErrMsg(str);
            setSuccess(false);
            errRef.current.focus();
        }
        else {
            setSuccess(true);
        }

    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Successful!</h1>
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