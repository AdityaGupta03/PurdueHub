import React from 'react'
import { useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import {FaSearch} from "react-icons/fa"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./styles.css"
import TestProfile from './TestProfile';
var data = require("./MOCKDATA.json");

function UsernameLookup() {
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const onChange = (event) => {
      setValue(event.target.value);
    };
  
    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        // backend?
        navigate(`/testprofile/${searchTerm}`);
    };
  
    return (
      <div className="full">
        <h1 className='searchTitle'>Username Lookup</h1>
  
        <div className="search-container">
          <div className="search-inner">
          <FaSearch id="search-icon"/>
            <input 
                className='searchInput'
                type="text" 
                value={value} 
                onChange={onChange} 
                placeholder='Type to search...' />
          </div>
          <div className="dropdown">
            {data
              .filter((item) => {
                const searchTerm = value.toLowerCase();
                const user = item.username.toLowerCase();
  
                return (
                  searchTerm &&
                  user.startsWith(searchTerm) &&
                  user !== searchTerm
                );
              })
              .slice(0, 10)
              .map((item) => (
                <div
                  onClick={() => onSearch(item.username)}
                  className="dropdown-row"
                  key={item.username}
                >
                  {item.username}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

export default UsernameLookup