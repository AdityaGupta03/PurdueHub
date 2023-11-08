import React from 'react'
import { useState } from 'react';
import './navbar.scss'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';


const Navbar = () => {


  const [placeholderSearch, setPlaceholderSearch] = useState('Search For User...');

  const [searchFor, setSearchFor] = useState(1);

  const handleChange = (e) => {

    setSearchFor(e.target.value);

    if (e.target.value === 1) {
      setPlaceholderSearch("Search For User...");
    }
    else if (e.target.value === 2) {
      setPlaceholderSearch("Search For Clubs...");
    }
    else if (e.target.value === 3) {
      setPlaceholderSearch("Search For Classes...");
    }
  }

  return (
    <div className='navbar'>

      <div className='left'>
        
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>PurdueHub</span>
        </Link>
        <HomeIcon />

        <div className='selectFrom'>
            <Box width='150px'>
              <TextField
                label="What To Search?"
                select
                value={searchFor}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value={1}>Users</MenuItem>
                <MenuItem value={2}>Clubs</MenuItem>
                <MenuItem value={3}>Classes</MenuItem>
              </TextField>
            </Box>
          </div>
        <div className='search'>
          <SearchIcon />
          <input text="text" placeholder={placeholderSearch}></input>
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