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
    <section>
      <h1>Welcome to PurdueHub!</h1>
      <p>An application targeted to students of Purdue University</p>
      <Link to="/userprofile">View Profile</Link>
      <Link to="/viewlist">View your user lists!</Link>
      <Link to="/viewprofile/testing">View testing's profile</Link>
      <Link to="/viewprofile/banned">View banned's profile</Link>
      <Link to="/feedback">Provide Feedback</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/delete">Delete Account</Link>
    </section>
  )
}

