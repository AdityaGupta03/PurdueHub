import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css' // css pulled online

import { ToastContainer, toast } from 'react-toastify'; // NEW
import 'react-toastify/dist/ReactToastify.css'; // NEW
import './Club.css'
import { set } from 'date-fns';


function MessagePage() {
  const [username, setUsername] = useState(''); // username of person being messaged
  const [formData, setFormData] = useState({ username: '', message: '', title: '' });

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [isBlocked, setIsBlocked] = useState(false); // user1 (sender) to user2 (receiver), user1 blocked user2
  const [youAreBlocked, setYouAreBlocked] = useState(false); // user1 (sender) to user2 (receiver), user1 is blocked by user2
  const [isBanned, setIsBanned] = useState(false); // user who is being messaged is banned

  const errRef = useRef(); // NEW

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn == 'false') {
      navigate("/login");
    }

    setErrMsg('');
  }, [formData.username, formData.title, formData.message])

  const headBack = () => {
    navigate("/");
  }

  const handleSubmit = async (e) => { // NEW
    e.preventDefault();

    if (formData.username === '') {
      setErrMsg('Error: Empty Username');
      return;
    }

    if (formData.title === '') {
      setErrMsg('Error: Empty Title');
      return;
    }

    if (formData.message === '') {
      setErrMsg('Error: Empty Message');
      return;
    }

    let my_userid = localStorage.getItem('user_id')

    try {
      let res = await fetch('http://localhost:5000/api/msg_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "user_id": my_userid, "username": formData.username, "msg": formData.message, "title": formData.title }),
      });

      const data = await res.json();

      if (res.status == 400 && data.error == "Sender is blocked by user.") {
        setErrMsg("You are blocked by this user.");
        return;
      } else if (res.status != 200) {
        setErrMsg(data.error);
        return;
      }
    } catch (error) {
      console.log(error);
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
    setFormData({ username: '', message: '', title: '' });
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
        <section style={{ maxWidth: 'auto', minWidth: '600px' }}>
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
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <label htmlFor='message'>Your Message:</label>
            <textarea
              id='message'
              value={formData.message}
              placeholder='Please Input A Message To Us'
              rows={11}
              cols={40}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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