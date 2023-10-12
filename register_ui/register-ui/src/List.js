import React, { useState } from 'react'
import './Profile.css' // css pulled online
import temp from './temporary-profile.jpeg' // temp picture

const List = ({id, name, img}) =>  
{
  return (
    <section className='imagebox'>
        <div>
            <img src={img} alt={name} className='baseimage'/>
        </div>
        <div>{name}</div>
    </section>
  )
}

export default List