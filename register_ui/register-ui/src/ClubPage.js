import React from 'react'
import './Club.css' // css pulled online

import temp from './temporary-profile.jpeg' // temp picture
import works from './fireworks-shape.jpg' // temp picture

function ClubPage() {
  return (
    <div className='whole'>
        <div className='containbtn'>
            <button className='actualbtn'>Follow Club</button>
        </div>
        <div className='intro'>
            <img className='clubPF' src={works}/>
            <h1 className='title'>Firework Conossieuisrs</h1>
        </div>

        <div className='summaryText'>
        <h3>Summary:</h3>
            <p>Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut 
                aliquip ex ea commodo consequat. Duis
                 aute irure dolor in reprehenderit in 
                 voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                 officia deserunt mollit anim id est laborum.
            </p>
        </div>
        
        <div className='info'>
            <h3>General Info:</h3>
            <p>West Lafayette, IN 47907-2034</p>
            <p>United States</p>
            <p>Email: fireworksconns@purdue.edu</p>
        </div>

        <div className='eventCtn'>
            <h2>Upcoming Events:</h2>
        </div>
    </div>
  )
}

export default ClubPage