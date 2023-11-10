import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify'; // NEW
import 'react-toastify/dist/ReactToastify.css'; // NEW
import './Notification.css'; // Import your CSS file

export default function Home() {
  console.log('Home rendering'); // Add this line for debugging

  const navigate = useNavigate();

  const [showNotification, setShowNotification] = useState(true);
  const [notifcationMessage, setNotificationMessage] = useState('');

  const sampleMessages = 
  ["Checkout your personal calendar to schedule your events and get on top of your tasks!",
    "Enjoying PurdueHub? Give us your feedback located on your homescreen!",
    "Want to turn off these notifications? Head over to your settings page!",
    "Question about Purdue? Checkout the FAQ page for answers!",
    "Want to find a specific user? Go ahead and use the search bar in the Username Lookup page!"
  ]
  
  useEffect(() => {
    // Simulate showing a notification after component mount
    const notificationDiv = document.getElementById('notification');
    notificationDiv.classList.add('show');

    const randomTip = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
    setNotificationMessage(randomTip);

    setTimeout(() => {
      notificationDiv.classList.remove('show');
    }, 6000); 
  }, []);

  const handleCloseNotification = () => {
    setShowNotification(false);
  }

  return (
    <div>
      <div>
        {showNotification && (
          <div id="notification" className="notification">
            {notifcationMessage}
            <span style={{color:'red'}}className="close" onClick={handleCloseNotification}>
              &times;
            </span>
          </div>
        )}
        <section>
          <h1 style={{ paddingBottom: '20px' }}>Welcome to PurdueHub!</h1>
          <p style={{ paddingBottom: '20px' }}>An application targeted to students of Purdue University!</p>
          <Link to="/userprofile">View Your Profile</Link>
          <Link to="/calendar">View Your Calendar</Link>
          <Link to="/viewlist">View your user lists!</Link>
          <Link to="/feedback">Provide Feedback</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/delete">Delete Account</Link>
          <Link to="/message-user">Message A User</Link>
          <Link to="/interested-events">Events I am Interested In</Link>
          <Link to="/username-lookup">Username Lookup</Link>
          <Link to="/club">Look at our example club!</Link>
          <Link to="/faq">View FAQs</Link>
          <Link to="/weather">View Weather</Link>
        </section>
      </div>
    </div>
  )
}

