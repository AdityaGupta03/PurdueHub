import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';

import './Profile.css' // css pulled online

function ViewMutuals() {
  const navigate = useNavigate();
  const { username } = useParams();

  const [noMutualFriends, setNoMutualFriends] = useState(false); // if user doesn't have any blocked users
  const [noMutualOrgs, setNoMutualOrgs] = useState(false); // if user doesn't have any followers

  const [mutualFriends, setMutualFriends] = useState([]);
  const [mutualOrgs, setMutualOrgs] = useState([]);

  const [isBlocked, setIsBlocked] = useState(false);

  async function fetchData() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    console.log("Is logged in: " + isLoggedIn);
    if (isLoggedIn == 'false') {
      navigate("/login");
    }
    const user_id = sessionStorage.getItem('user_id');
    let my_username = sessionStorage.getItem('username');

    console.log("I am " + my_username);
    console.log("View User: " + username);

    try {
      let block_res = await fetch("http://127.0.0.1:5000/api/get_block_list", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": username }),
      });

      let block_data = await block_res.json();
      console.log(block_data);

      if (block_res.status === 200) {
        if (block_data.blocked.includes(my_username)) {
          setIsBlocked(true);
        } else {
          setIsBlocked(false);
        }
      } else {
        const err_msg = "Error: " + block_data.error;
        console.log(err_msg);
      }

      let response = await fetch("http://127.0.0.1:5000/api/get_mutual_friends", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "user_id": user_id, "other_username": username }),
      });

      let data = await response.json();
      console.log(data);

      if (response.status === 200) {
        if (data.mutual_friends.length === 0) {
          setNoMutualFriends(true);
        } else {
          setNoMutualFriends(false);
        }
        setMutualFriends(data.mutual_friends);
      } else {
        const err_msg = "Error: " + data.error;
      }

      response = await fetch("http://127.0.0.1:5000/api/get_mutual_orgs", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "user_id": user_id, "other_username": username }),
      });

      data = await response.json();
      console.log(data);

      if (response.status === 200) {
        if (data.mutual_orgs.length === 0) {
          setNoMutualOrgs(true);
        } else {
          setNoMutualOrgs(false);
        }
        setMutualOrgs(data.mutual_orgs);
      } else {
        const err_msg = "Error: " + data.error;
        console.log(err_msg);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div style={{ background: 'black', padding: '20px' }}>
      {
        isBlocked ? (
          <div>
            <p>You are blocked by {username}!</p>
          </div>
        ) : (
          <div>
            <div className='container'>
              <h2>Mutual Friends List:</h2>

              <div>
                {
                  noMutualFriends && (
                    <div>
                      <p>No Mutual Friends!</p>
                    </div>
                  )
                }
                {
                  noMutualFriends === false && (
                    <div>
                      {mutualFriends.map((item, index) => {
                        return (
                          <Link to={`/viewprofile/${item}`}>{item}</Link>
                        )
                      })}
                    </div>
                  )
                }
              </div>
            </div>
            <div className='container'>
              <h2>Mutual Clubs List:</h2>
              <div>
                {
                  noMutualOrgs && (
                    <div>
                      <p>No Mutual Clubs!</p>
                    </div>
                  )
                }
                {
                  noMutualOrgs === false && (
                    <div>
                      {mutualOrgs.map((item, index) => {
                        return (
                          <div>{item}</div>
                        )
                      })}
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ViewMutuals;