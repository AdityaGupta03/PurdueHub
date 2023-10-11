import React, { useState } from 'react'
import data from './friend-data';
import List from './List';
import temp from './temporary-profile.jpeg' // temp picture

import './Profile.css' // css pulled online

function ViewList() {
    const [value, setValue] = useState(data);

    const [signedIn, setSignedIn] = useState(true); // if user isn't signed in

    const [nobodyBlocked, setNobodyBlocked] = useState(false); // if user doesn't have any blocked users
    const [nobodyFollows, setNobodyFollows] = useState(false); // if user doesn't have any followers
    const [nobodyFollowed, setNobodyFollowed] = useState(false); // if use doesn't have anyone added 
    
  return (
    <>
        {
            signedIn && (
                <div>
                    <div className='container'>
                        <h2>Friend's List</h2>

                        <div>
                        {
                            nobodyFollowed && (
                                <div>
                                    <p>You are following no one!</p>
                                </div>
                            )
                        }
                        {
                            nobodyFollowed === false && (
                                <div>
                                    {/* change 'key' to index which refers to array index of data provided if want to change easier */}
                                    {value.map((item) => {
                                        <section className='imagebox' key={item.id}>
                                        <div>
                                            <img src={item.img} alt={item.name} className='baseimage'/>
                                        </div>
                                        <div>{item.name}</div>
                                    </section>
                                    })}
                                </div>
                            )
                        }
                        </div>
                </div>
                <div className='container'>
                    <h2>Followers List</h2>
                    <div>
                        {
                            nobodyFollows && (
                                <div>
                                    <p>Nobody Follows You!</p>
                                </div>
                            )
                        }
                        {
                            nobodyFollows === false && (
                                <div>
                                    {value.map((item) => {
                                        return <List {...item} key={item.id}/>
                                    })}
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='container'> 
                    <h2>Blocked List</h2>
                        {
                            nobodyBlocked && (
                                <div>
                                    <p>Nobody Users Blocked!</p>
                                </div>
                            )
                        }
                        {
                            nobodyBlocked === false && (
                                <div>
                                    {value.map((item) => {
                                        return <List {...item} key={item.id}/>
                                    })}
                                </div>
                            )
                        }
                </div>
            </div>
            )
        }
        {
            signedIn === false && (
                <div>
                    <h2>Friend's List</h2>
                    <p>Empty</p>
                    <h2>Followers List</h2>
                    <p>Empty</p>
                    <h2>Blocked List</h2>
                    <p>Empty</p>
                </div>
            )
        }
    </>
  )
}

export default ViewList