import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (isLoggedIn == 'false') {
      navigate("/login");
    }

  }, []);

  return (
    <div>
      <div>
        <section>
        <h1 style={{ paddingBottom: '20px' }}>Welcome to PurdueHub!</h1>
        <p style={{ paddingBottom: '20px' }}>An application targeted to students of Purdue University!</p>
        <Link to="/userprofile">View Your Profile</Link>
        <Link to="/calendar">View Your Calendar</Link>
        <Link to="/viewlist">View your user lists!</Link>
        <Link to="/feedback">Provide Feedback</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/delete">Delete Account</Link>
        <Link to="/message-user">Message A User</Link>
        <Link to="/interested-events">Upcoming Events</Link>
        <Link to="/username-lookup">Username Lookup</Link>
        </section>
      </div>
    </div>
  )
}

