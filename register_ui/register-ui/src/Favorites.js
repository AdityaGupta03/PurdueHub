import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'

const classesSaved = ["CS 25000", "CS 25100", "CS 18000"];

const clubsSaved = ["CS Computed Networks", "WHO Documentaries", "Cinema Critics", "Gamer Nexus"];

function Favorites() {
    const navigate = useNavigate();

    const check = (look) => {
        console.log("Look:" + look)
        navigate(`/class/${look.toString()}`);
    }

    return (
        <div className='whole'>
            <div className='containbtn'>
                <button className='actualbtn' onClick={() => navigate("/")}>Back</button>
            </div>

            <div className='test'>
                <h2 className='test'>Favorites:</h2>
            </div>

            <div className='eventCtn'>
                <h2 style={{ textDecoration: 'underline' }}>Classes Saved:</h2>
                <div>
                    <div>
                        {classesSaved.map((item, index) => {
                            return (
                                <Link className="clubEventLinks" style={{ textDecorationLine: 'none' }} to={`/class/${item}`}>
                                    <div key={index} className='event'>
                                        <p className='wrapText'>{item}</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className='eventCtn'>
                <h2 style={{ textDecoration: 'underline' }}>Clubs Saved:</h2>
                <div>
                    <div>
                        {clubsSaved.map((item, index) => {
                            return (
                                <Link className="clubEventLinks" style={{ textDecorationLine: 'none' }} to={"/club"}>
                                    <div key={index} className='event'>
                                        <p className='wrapText'>{item}</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Favorites