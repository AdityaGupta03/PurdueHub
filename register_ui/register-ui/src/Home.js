import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


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
    </section>
  )
}

