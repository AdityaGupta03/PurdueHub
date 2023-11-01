import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import temp from './temporary-profile.jpeg' // temp picture
import './Profile.css' // css pulled online

import { ToastContainer, toast } from 'react-toastify'; // NEW
import 'react-toastify/dist/ReactToastify.css'; // NEW
import './Club.css' 


function MessagePage() {
  const [username, setUsername] = useState(''); // username of person being messaged
  const [formData, setFormData] = useState({ username: '', message: '', title: ''});

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false); 
  const [errMsg, setErrMsg] = useState(''); 

  const [ isBlocked, setIsBlocked ] = useState(false); // user1 (sender) to user2 (receiver), user1 blocked user2
  const [ youAreBlocked, setYouAreBlocked] = useState(false); // user1 (sender) to user2 (receiver), user1 is blocked by user2
  const [ isBanned, setIsBanned ] = useState(false); // user who is being messaged is banned

  const errRef = useRef(); // NEW

  useEffect(() => {
    setErrMsg('');
}, [formData.username, formData.title, formData.message])

  const headBack = () => {
    navigate("/");
  }

  const handleSubmit = async (e) => { // NEW
    e.preventDefault();

    if(formData.username === '') {
      setErrMsg('Empty Username');
      return;
    }
    if(formData.title === '') {
      setErrMsg('Empty Title');
      return;
    }
    if(formData.message === '') {
      setErrMsg('Empty Message');
      return;
    }
    if(formData.username != "Billy") {
      // IF USERNAME DOES NOT EXIST!
      setErrMsg("User does not exist, try again")
      return
    }
    if(isBlocked) {
        setErrMsg("You have this user blocked, can't send message");
        return;
    }
    if(youAreBlocked) {
        setErrMsg("You are blocked by this user, can't send message");
        return;
    }
    if(isBanned) {
      setErrMsg("User is banned, can't send message");
      return;
    }
    // IF INFORMATION IS CORRECT AND SENT SUCCESSFULLY LOGIC HERE:
    toast.success('Successfully Sent Your Message!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    }); 
    setFormData({ username: '', message: '' , title: ''});
  }


  return (
    <>
    <ToastContainer
            theme="colored"
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <div>
        <section style={{maxWidth: 'auto', minWidth: '600px'}}>
          <div className='containbtn'>
            <div>
              <button onClick={headBack} className='actualbtn'>Back</button>
            </div>
          </div>
          <h1>Message A User:</h1>
            <p ref={errRef} className={errMsg ? "errmsg" : "offsreen"}>{errMsg}</p>
              <form onSubmit={handleSubmit}>
                <label htmlFor='username'> 
                  Username:
                </label>
                <input
                  type="text"
                  value={formData.username}
                  placeholder='Please Input A Username'
                  id='username'
                  autoComplete='off'
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                <label htmlFor='title'> 
                  Title Of Your Message: 
                </label>
               <input
                  type="text"
                  value={formData.title}
                  placeholder='Please Input A Title'
                  id='title'
                  autoComplete='off'
                  onChange={(e) =>  setFormData({...formData, title: e.target.value})}
                />
                <label htmlFor='message'>Your Message:</label>
                  <textarea
                    id='message'
                    value={formData.message}
                    placeholder='Please Input A Message To Us'
                    rows={11}
                    cols={40}
                    onChange={(e) =>  setFormData({...formData, message: e.target.value})}
                  />  
                <button type='submit'>
                  Send Message
                </button>
              </form>
          </section>
        </div>
    </>
  )
}

export default MessagePage