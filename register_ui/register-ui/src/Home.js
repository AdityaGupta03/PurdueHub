import React from 'react'
import {useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


export default function Home() {

  const errRef = useRef(); // set focus on errors if they occur, good for accessibility pursposes as well
  const [errMsg, setErrMsg] = useState('');

  
  return (
    <section>
      <h1>Welcome to PurdueHub!</h1>
      <p>An application targeted to students of Purdue University</p>
    </section>
  )
}

