import React from 'react'
import './rightBar.scss'
const RightBar = () => {
    return (
        <div className='rightBar'>
            <div className='container'>
                <div className='item'>
                    <span>Follow Back?</span>

                    <div className='user'>
                        <div className='userInfo'>
                            <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
                            <span>Username</span>
                        </div>
                        <div className='buttons'>
                            <button>Follow</button>
                            <button>Ignore</button>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='userInfo'>
                            <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
                            <span>Username</span>
                        </div>
                        <div className='buttons'>
                            <button>Follow</button>
                            <button>Ignore</button>
                        </div>
                    </div>

                    <div className='user'>
                        <div className='userInfo'>
                            <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
                            <span>Username</span>
                        </div>
                        <div className='buttons'>
                            <button>Follow</button>
                            <button>Ignore</button>
                        </div>
                    </div>
                </div>
                <div className='item'>
                    <span>Online Friends</span>
                    <div className='user'>
                        <div className='userInfo'>
                            <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
                            <div className='online' />
                            <span>Username</span>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='userInfo'>
                            <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
                            <div className='online' />
                            <span>Username</span>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='userInfo'>
                            <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
                            <div className='online' />
                            <span>Username</span>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='userInfo'>
                            <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
                            <div className='online' />
                            <span>Username</span>
                        </div>
                    </div>
                </div>

                <div className='item'>
                    <span>Popular Clubs:</span>

                    <div className='user'>
                        <div className='userInfo'>
                            <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
                            <span>Club X</span>
                        </div>
                        <div className='buttons'>
                            <button>Follow</button>
                            <button>Ignore</button>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='userInfo'>
                            <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
                            <span>Club X</span>
                        </div>
                        <div className='buttons'>
                            <button>Follow</button>
                            <button>Ignore</button>
                        </div>
                    </div>

                    <div className='user'>
                        <div className='userInfo'>
                            <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
                            <span>Club X</span>
                        </div>
                        <div className='buttons'>
                            <button>Follow</button>
                            <button>Ignore</button>
                        </div>
                    </div>
                </div>

                <div className='item'>
                    <span>Weather For Today</span>
                </div>
                
            </div>
        </div>
    )
}

export default RightBar