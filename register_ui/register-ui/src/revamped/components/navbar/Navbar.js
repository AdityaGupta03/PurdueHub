import React from 'react'
import './navbar.scss'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>

      <div className='left'>

        <Link to="/" style={{textDecoration: "none"}}>
        <span>PurdueHub</span>
        </Link>
        <HomeIcon />

        <div className='search'>
          <SearchIcon/>
          <input text="text" placeholder='Search User...'></input>
        </div>

      </div>
      
      <div className='right'>
        <PersonIcon />
        <div className='user'>
            <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
            <span>John Doe</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar