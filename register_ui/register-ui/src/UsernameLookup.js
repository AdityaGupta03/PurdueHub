import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa"
import "./styles.css"

function UsernameLookup() {
  const [ value, setValue ] = useState("");
  const [ data, setData ] = useState([]);

  const navigate = useNavigate();

  const onChange = async (event) => {
    setValue(event.target.value);
    console.log("Searching on " + event.target.value);
    try {
      let res = await fetch('http://localhost:5000/api/search_users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "search": event.target.value }),
      });

      const data = await res.json();
      console.log(data.users);
      if (res.status === 200) {
        setData(data.users);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log(error);
    }

    console.log("Data is " + data);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    navigate(`/viewprofile/${searchTerm}`);
  };

  return (
    <div className="full">
      <h1 className='searchTitle'>Username Lookup</h1>

      <div className="search-container">
        <div className="search-inner">
          <FaSearch id="search-icon" />
          <input
            className='searchInput'
            type="text"
            value={value}
            onChange={onChange}
            placeholder='Type to search...' />
        </div>
        <div className="dropdown">
          {data.map((item) => (
              <div
                onClick={() => onSearch(item)}
                className="dropdown-row"
                key={item}
              >
                {item}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default UsernameLookup