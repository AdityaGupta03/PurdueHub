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


import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';

import "../leftBar/modal.scss"

const Navbar = () => {

  const [placeholderSearch, setPlaceholderSearch] = useState('Search For User...');
  const dropdownRef = useRef(null);

  const [searchFor, setSearchFor] = useState(1);
  const [searchFocused, setSearchFocused] = useState(false);
  const [open, setOpen] = useState(false);

  const [openFeedback, setOpenFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteFeedback, setDeleteFeedback] = useState('');

  const [allUsernames, setAllUsernames] = useState([]);
  const [allClasses, setAllClasses] = useState([]);

  const handleInputFocus = () => {
    // Input is in focus, make the div visible
    setSearchFocused(true);
  };
  const handleInputBlur = () => {
    // Input is not in focus, make the div invisible
    setSearchFocused(false);
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

  const fakeClasses = [
    "CS251",
    "CS180",
    "CS173",
    "CS191",
    "CS459",
    "CS871",
  ]

  const [usingData, setUsingData] = useState([]);
  const [value, setValue] = useState("");

  const onSearch = (searchTerm) => {
    if (placeholderSearch == "Search For User...") {
      console.log("Searching for user: " + searchTerm);
      navigate(`/profile/${searchTerm}`);
    } else {
      navigate(`/class/${searchTerm}`);
    }
  };

  const handleSubmitDelete = async () => {
    let my_username = sessionStorage.getItem('username');
    console.log("Deleting account for: " + my_username);

    if (deleteFeedback != '') {
      let my_userid = sessionStorage.getItem('user_id');
      try {
        const response = await fetch("http://127.0.0.1:5000/api/submit_feedback", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "user_id": my_userid, "feedback_title": "Delete Account", "feedback_body": deleteFeedback }),
        });
      } catch (error) {
        console.log(error);
        return;
      }
    }

    try {
      let res = await fetch('http://localhost:5000/api/delete_account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: my_username }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("Error:" + error);
    }

    setOpenDelete(!openDelete);
    // send feedback to the database here
    // delete account procedue here
    setDeleteFeedback("");
    navigate("/login");
  }

  const handleSubmitFeedback = async () => {
    let my_userid = sessionStorage.getItem('user_id');

    try {
      const response = await fetch("http://127.0.0.1:5000/api/submit_feedback", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "user_id": my_userid, "feedback_title": "PurdueHub General Feedback", "feedback_body": feedback }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    setOpenFeedback(!openFeedback);
    // send feedback to the database here
    setFeedback(""); // clear existing feedback
  }

  const handleChange = (e) => {

    console.log(e);
    setSearchFor(e.target.value);

    if (e.target.value === 1) {
      setPlaceholderSearch("Search For User...");
      setUsingData(allUsernames);
    }
    else if (e.target.value === 2) {
      setPlaceholderSearch("Search For Clubs...");
      setUsingData(fakeClubs);
    }
    else if (e.target.value === 3) {
      setPlaceholderSearch("Search For Classes...");
      setUsingData(allClasses);
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


  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click is outside the profile dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    fetchUsernames();
    fetchClasses();

    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  async function fetchUsernames() {
    try {
      let res = await fetch('http://localhost:5000/api/get_all_usernames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ }),
      });

      const data = await res.json();
      if (res.status === 200) {
        const usernames_list = data.usernames.map((username) => {
          return username.username;
        });
        setAllUsernames(usernames_list);
        setUsingData(usernames_list);
      } else {
        setUsingData([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchClasses() {
    try {
      let res = await fetch('http://localhost:5000/api/get_all_classes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await res.json();

      if (res.status === 200) {
        const course_list = data.classes.map((course) => {
          return course.name;
        });
        setAllClasses(course_list);
      } else {
        setAllClasses([]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
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

        <form className='search-container' onSubmit={(e) => { e.preventDefault(); onSearch(value); }}>
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
        </form>
        {searchFocused && (
          <div className="dropdown">
            {usingData.filter(item => {
              const searchTerm = value.toLowerCase();
              const foundTerm = item.toLowerCase();
              return searchTerm && foundTerm.includes(searchTerm);
            })
              .map((item, index) => (
                <div
                  onClick={() => console.log("Clicked: " + item)}
                  className="dropdown-row"
                  key={index}
                >
                  {item}
                </div>
              ))}
          </div>
        )}

        {/* <div className='search-container'>
          <div className='search'>
            <SearchIcon className='icon-search' />
            <input
              className='searchInput'
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onSubmit={(value) => onSearch(value)}
              placeholder='Type to search...'
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>
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
                  onClick={console.log("ello World!s")}
                  className="dropdown-row"
                  key={index}
                >
                  {item}
                </div>
              ))}
          </div>
        )} */}


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
            <div onClick={() => navigate("/user-profile")} className='menu-item'>
              <Link className='icon-button'>
                <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' />
              </Link>
              <span>Your Profile</span>
            </div>
            <div onClick={()=>setOpenDelete(!openDelete)} className='menu-item'>
              <Link className='icon-button'>
                <DeleteIcon />
              </Link>
              <span>Delete Account</span>
            </div>
            <div onClick={() => setOpenFeedback(!openFeedback)} className='menu-item'>
              <Link className='icon-button'>
                <ForumIcon />
              </Link>
              <span>Feedback</span>
            </div>
            <div onClick={() => navigate("/login")} className='menu-item'>
              <Link className='icon-button'>
                <LogoutIcon />
              </Link>
              <span>Log Out</span>
            </div>
            {/* <div className='menu-item'>
              <Link className='icon-button'>
                <SettingsIcon />
              </Link>
              <span>Settings</span>
            </div> */}
          </div>

        )}
      </div>

          {/* PROVIDE FEEDBACK MODAL */}
      <Modal
        open={openFeedback}
        onClose={()=>{setOpenFeedback(!openFeedback)}}>

        <div className="norm">
          <div className="modal-container">

            <div className='modal-title'>
              <span>Feedback</span>
            </div>

            <div onClick={() => { setOpenFeedback(!openFeedback) }} className='modal-exit' >
              <IconButton sx={{
                backgroundColor: '#484a4d',
                width: '30px',
                height: '30px',
                padding: '20px',
                color: 'white',
              }}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className='modal-content-1'>
              <span>How can we improve?</span>
            </div>
            <div className='modal-content-2'>
              <span>Details</span>
              <textarea
                placeholder='Feedback Here'
                onChange={(e) => setFeedback(e.target.value)}
                value={feedback}
              ></textarea>
            </div>
            <div className='modal-content-3'>
              <div className='contain-btn'>
                <button onClick={() => { setOpenFeedback(!openFeedback) }} className='cancel-btn'>Cancel</button>
              </div>
              <div className='contain-btn'>
                <button disabled={feedback ? false : true} onClick={handleSubmitFeedback} className='submit-btn'>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>


          {/* DELETE ACCOUNT MODAL */}
          <Modal
        open={openDelete}
        onClose={()=>{setOpenDelete(!openDelete)}}>

        <div className="norm">
          <div className="modal-container">

            <div className='modal-title'>
              <span>Delete Account</span>
            </div>

            <div onClick={() => { setOpenDelete(!openDelete) }} className='modal-exit' >
              <IconButton sx={{
                backgroundColor: '#484a4d',
                width: '30px',
                height: '30px',
                padding: '20px',
                color: 'white',
              }}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className='modal-content-1'>
              <span>Please provide your reasons</span>
            </div>
            <div className='modal-content-2'>
              <span>Details</span>
              <textarea
                placeholder='Why?'
                onChange={(e) => setDeleteFeedback(e.target.value)}
                value={deleteFeedback}
              ></textarea>
            </div>
            <div className='modal-content-3'>
              <div className='contain-btn'>
                <button onClick={() => { setOpenDelete(!openDelete) }} className='cancel-btn'>Cancel</button>
              </div>
              <div className='contain-btn'>
                <button disabled={deleteFeedback ? false : true} onClick={handleSubmitDelete} className='delete-btn'>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Navbar