import { useState } from 'react';
import './home.scss';

import { Modal } from '@mui/material';
import "../../components/leftBar/modal.scss"
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Home = () => {
  const [openFeedback, setOpenFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleClose = () => {
    setOpenFeedback(false);
  }

  return (
    <div className='home'>
      <Modal
          open={openFeedback}
          onClose={handleClose}>

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
                  <button disabled={feedback ? false : true} onClick={() => { setOpenFeedback(!openFeedback); setFeedback("") }} className='submit-btn'>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      <div className='container'>
        {/* FEEDBACK MODAL */}
            <h1>Hello!</h1>  
            <button onClick={() => setOpenFeedback(!openFeedback)}>Come test me!</button>
      </div>
    </div>
  )
}

export default Home