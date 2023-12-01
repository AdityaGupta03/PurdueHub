import React, { useEffect, useState } from 'react'

import defaultBG from './basic.jpeg'
import './class.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { is } from 'date-fns/locale'

const Class = () => {
  const navigate = useNavigate();

  const { className } = useParams();
  const user_id = localStorage.getItem('user_id');

  const [classDescription, setClassDescription] = useState("Digital logic: transistors, gates, and combinatorial circuits; clocks; registers and register banks; arithmetic-logic units; data representation: big-endian and little-endian integers; ones and twos complement arithmetic; signed and unsigned values; Von-Neumann architecture and bottleneck; instruction sets; RISC and CISC designs; instruction pipelines and stalls; rearranging code; memory and address spaces; physical and virtual memory; interleaving; page tables; memory caches; bus architecture; polling and interrupts; DMA; device programming; assembly language; optimizations; parallelism; data pipelining. Typically offered Fall Spring.");
  const [isFavorited, setIsFavorited] = useState(false);


  const handleFavorite = async () => {
    const course_name = className;
    if (!isFavorited) {
      console.log("Going to favorite course");
      try {
        const res = await fetch('http://localhost:5000/api/fav_course', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "user_id": user_id, "course_name": course_name  })
        });

        const data = await res.json();
        console.log(data);

        if (res.status == 200) {
          console.log("Favorited course");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await fetch('http://localhost:5000/api/unfav_course', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "user_id": user_id, "course_name": course_name })
        });

        const data = await res.json();
        console.log(data);

        if (res.status == 200) {
          console.log("Unfavorited course");
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsFavorited(!isFavorited);
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn == 'false') {
      navigate("/login");
    }

    fetchFavoriteData();
  }, [className])

  const fetchFavoriteData = async () => {
    const course_name = className;

    try {
      const res = await fetch('http://localhost:5000/api/is_fav_course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "user_id": user_id, "course_name": course_name })
      });

      const data = await res.json();
      console.log(data);

      if (res.status == 200) {
        if (data.isFav == true) {
          console.log("Is favorited");
          setIsFavorited(true);
        } else {
          console.log("Is not favorited");
          setIsFavorited(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='class-page'>
      <div className='images'>
        <img src={defaultBG} className='cover' />
        <img src={defaultBG} alt='' className='class-profile' />
        <div className='container'>
          <div className='class-info'>
            <div className='wrapper'>
              <div className='top-right'>
                <button 
                  className={isFavorited ? "un-fav" : "fav"}
                  onClick={handleFavorite}>
                    {isFavorited ? "Unfavorite" : "Favorite"}
                  </button>
              </div>
              <div className='class-name'>{className}</div>
              <div className='class-description'>
                <span>{classDescription}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Class