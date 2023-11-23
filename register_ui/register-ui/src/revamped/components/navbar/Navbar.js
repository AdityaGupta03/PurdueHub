import React from 'react'
import { useState, useRef, useEffect } from 'react';
import './navbar.scss'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';

import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';


import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ForumIcon from '@mui/icons-material/Forum';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {

  //  <SearchIcon />
  //<input text="text" placeholder={placeholderSearch}></input>
  const [placeholderSearch, setPlaceholderSearch] = useState('Search For User...');
  const dropdownRef = useRef(null);

  const [searchFor, setSearchFor] = useState(1);
  const [searchFocused, setSearchFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const handleInputFocus = () => {
    // Input is in focus, make the div visible
    setSearchFocused(true);
  };
  const handleInputBlur = () => {
    // Input is not in focus, make the div invisible
    setSearchFocused(false);
  };

  const handleBlur = () => {
    // This function will be called when the dropdown loses focus
    setOpen(false);
  };

  const navigate = useNavigate();

  const fakeClubs = [
    "Boiler League of Tag",
    "CS Wizards",
    "Photography Club",
    "D20 Dice Masters",
    "Rollerblading Club",
    "Longboard Club",
    "Wingman United",
    "ESEC - Calc",
    "FANG Interns",
    "Example Man",
    "Billy's Fan Service",
    "Example 3",
    "Example 3",
    "Example 3",
    "Example 3",
    "Example 3",
    "Example 3",
  ]
  const fakeUsers = [
    "Mike101",
    "Jenny9",
    "lddeLg",
    "woah0",
    "g4m3er",
    "Jan9",
    "pUrD3h",
    "Eddy",
    "Ed",
    "M1k3B",
    "ha__",
    "leo",
    "Alice",
    "a11y"
  ]
  const fakeClasses = [
    "CS251",
    "CS180",
    "CS173",
    "CS191",
    "CS459",
    "CS871",
  ]

  const [usingData, setUsingData] = useState(fakeUsers);
  const [value, setValue] = useState("");

  const onSearch = (searchTerm) => {
    navigate(`/class/${searchTerm}`);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleChange = (e) => {

    console.log("Change:" + e);
    setSearchFor(e.target.value);

    if (e.target.value === 1) {
      setPlaceholderSearch("Search For User...");
      setUsingData(fakeUsers);
    }
    else if (e.target.value === 2) {
      setPlaceholderSearch("Search For Clubs...");
      setUsingData(fakeClubs);
    }
    else if (e.target.value === 3) {
      setPlaceholderSearch("Search For Classes...");
      setUsingData(fakeClasses);
    }

  }
  const StyledFormControl = styled(FormControl)({
    '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
      color: 'white', // Set the desired text color
    },
    '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
      borderColor: 'grey !important', // Set the desired border color
    },
    '& .MuiInputLabel-root': {
      color: 'white', // Set label text color
      margin: '0px 0px', // Adjust margin as needed
    },
    '& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon': {
      fill: 'grey', // Set the desired icon color
    },

  });


  return (

    <div className='navbar'>

      <div className='left'>

        <Link to="/user-profile" className='removeStyleLink'>
          <span>PurdueHub</span>
          <div className='homeLink'>
            <HomeIcon />
          </div>
        </Link>

        <div className='selectFrom'>

          <Box sx={{
            borderColor: 'white',
            minWidth: 150
          }}>
            <StyledFormControl fullWidth>
              <InputLabel
                sx={{
                  color: 'white',
                  '&.Mui-focused': {
                    color: 'white',         // Text color when focused
                  },
                }}
              >
                Search For?</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchFor}
                label="Age"
                onChange={handleChange}
                inputProps={{
                  MenuProps: {
                    MenuListProps: {
                      sx: {
                        backgroundColor: '#333',
                        color: 'whitesmoke',
                      }

                    }
                  }
                }}
                sx={{
                  '& .MuiInput-underline:before': {
                    borderBottomColor: 'white', // Underline color
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'white', // Focused underline color
                  },
                  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottomColor: 'white', // Hovered underline color
                  },
                  '& .MuiSelect-root': {
                    color: 'white', // Text color
                  },
                  '& .Mui-selected': {
                    color: 'white', // Selected menu item text color
                  },
                }}
              >
                <MenuItem value={1}>Users</MenuItem>
                <MenuItem value={2}>Clubs</MenuItem>
                <MenuItem value={3}>Classes</MenuItem>
              </Select>
            </StyledFormControl>
          </Box>
        </div>

        <div className='search-container'>

          <div className='search'>
            <SearchIcon className='icon-search' />
            <input
              className='searchInput'
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Type to search...'
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>
          {searchFocused && (
            <div className="dropdown">
              {usingData.filter(item => {
                const searchTerm = value.toLowerCase();
                const foundTerm = item.toLowerCase();
                return searchTerm && foundTerm.includes(searchTerm);
              })
                .map((item, index) => (
                  <div
                    onClick={() => onSearch(item)}
                    className="dropdown-row"
                    key={index}
                  >
                    {item}
                  </div>
                ))}
            </div>
          )}
        </div>


      </div>

      <div className='right'>
        <div 
          className='user'
          onClick={() => setOpen(!open)}
          ref={dropdownRef}>
          <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
        </div>
        {open && (
          <div className='profile-dropdown'>
            <div className='menu-item'>
              <Link className='icon-button'>
                <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
              </Link>
              <span>Your Profile</span>
            </div>
            <div className='menu-item'>
              <Link className='icon-button'>
                <DeleteIcon />
              </Link>
              <span>Delete Account</span>
            </div>
            <div className='menu-item'>
              <Link className='icon-button'>
                <ForumIcon />
              </Link>
              <span>Feedback</span>
            </div>
            <div className='menu-item'>
              <Link className='icon-button'>
                <LogoutIcon />
              </Link>
              <span>Logout</span>
            </div>
            <div className='menu-item'>
              <Link className='icon-button'>
                <SettingsIcon />
              </Link>
              <span>Settings</span>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default Navbar