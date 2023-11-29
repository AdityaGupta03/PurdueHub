import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa"

import '../Club.css'

import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Class = ({ data }) => {

  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);

  const favoriteClass = () => {
    if (favorite === true) {
      setFavorite(false);
    }
    else {
      setFavorite(true);
    }
  }

  return (
    <div>
      <div className='whole'>
        <div className='containbtn'>
          <div className='place-icon-right'>
            <Tooltip title="Favorite">
              <IconButton onClick={favoriteClass} style={{ fontSize: 'large' }} color={favorite ? 'primary' : 'info'}>
                {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Tooltip>
          </div>
          <button className='top-left-btn' onClick={() => navigate("/class-lookup")}>Back</button>
        </div>
        <br />

        <br />
        <div className='test'>
          <h2 className='test'>{data.className}{data.tag}</h2>
        </div>

        <br />
        <div className='summaryText'>
          <h3>Description:</h3>
          <p>{data.description}</p>
        </div>

        <div className='info'>
          <p>Prerequisites:</p>
          <p>{data.prereq.map((str, index) => (index === data.prereq.length - 1 ? str : str + ', '))}</p>
          <br />
          <p>Credit Hours: {data.creditHours}</p>
        </div>
      </div>
    </div>
  )
}

export default Class