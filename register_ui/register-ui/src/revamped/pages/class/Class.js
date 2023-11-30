import React, { useEffect, useState } from 'react'

import defaultBG from './basic.jpeg'
import './class.scss'
import { useParams } from 'react-router-dom'
const Class = () => {

  const { className } = useParams();

  const [classDescription, setClassDescription] = useState("Digital logic: transistors, gates, and combinatorial circuits; clocks; registers and register banks; arithmetic-logic units; data representation: big-endian and little-endian integers; ones and twos complement arithmetic; signed and unsigned values; Von-Neumann architecture and bottleneck; instruction sets; RISC and CISC designs; instruction pipelines and stalls; rearranging code; memory and address spaces; physical and virtual memory; interleaving; page tables; memory caches; bus architecture; polling and interrupts; DMA; device programming; assembly language; optimizations; parallelism; data pipelining. Typically offered Fall Spring.");
  const [isFavorited, setIsFavorited] = useState(false);


  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
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
              <div className='class-prof'>
                <span>Professor X</span>
              </div>
              <div className='class-description'>
                <span>Credit Hours: X</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Class