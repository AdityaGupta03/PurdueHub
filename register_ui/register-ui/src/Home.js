import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify'; // NEW
import 'react-toastify/dist/ReactToastify.css'; // NEW
import './Notification.css'; // Import your CSS file

import { ShepherdTour, ShepherdTourContext, TourMethods } from 'react-shepherd'
import "shepherd.js/dist/css/shepherd.css";
import './shepherd.css';
import Shepherd from 'shepherd.js';


export default function Home() {
  const navigate = useNavigate();

  const [showNotification, setShowNotification] = useState(true);
  const [showTour, setShowTour] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [notifcationMessage, setNotificationMessage] = useState('');

  const sampleMessages =
    ["Checkout your personal calendar to schedule your events and get on top of your tasks!",
      "Enjoying PurdueHub? Give us your feedback located on your homescreen!",
      "Want to turn off these notifications? Head over to your settings page!",
      "Question about Purdue? Checkout the FAQ page for answers!",
      "Want to find a specific user? Go ahead and use the search bar in the Username Lookup page!"
    ]

    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        classes: 'shadow-md bg-purple-dark',
        scrollTo: true,
      },
      useModalOverlay: true,
    });

    const buttonConfig = [
      {
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        action: () => {
          setCompleted(true);
          tour.cancel();
        },
      },
      {
        text: 'Back',
        action: () => {
          tour.back();
        },
      },
      {
        text: 'Next',
        action: () => {
          tour.next();
        },
      },
    ]
    tour.addStep({
      id: '1',
      title: 'Welcome to PurdueHub!',
      text: 'Great to have you here, this is a general layout view of our application to get you started!',
      attachTo: {
        element: '.base-home',
        on: 'right',
      },
      arrow: true,
      classes: 'example-step-extra-class',
      buttons: [
        {
          classes: 'shepherd-button-secondary',
          text: 'Exit',
          action: () => {
            console.log('Exited');
            setCompleted(true);
            tour.cancel();
          },
        },
        {
          text: 'Next',
          action: () => {
            console.log('Yo');
            tour.next();
          },
        },
      ],
    },
    );
    // Define steps
    tour.addStep({
      id: '2',
      title: 'Viewing Your Profile',
      text: 'Checkout this page to be able to see your personal profile page and customize it!',
      attachTo: {
        element: '.view-profile',
        on: 'right',
      },
      arrow: true,
      classes: 'example-step-extra-class',
      buttons: buttonConfig,
    },

    );
    tour.addStep({
      id: '3',
      title: 'Viewing Your Friends List',
      text: 'Checkout this page to be able see all your friends and followers!',
      attachTo: {
        element: '.view-list',
        on: 'right',
      },
      arrow: true,
      classes: 'example-step-extra-class',
      buttons: buttonConfig,
    },
    );
    tour.addStep({
      id: '4',
      title: 'Have Feedback?',
      text: 'If you have feedback regarding our application, you can check out this page and send it over to us. We appreciate it!',
      attachTo: {
        element: '.provide-feedback',
        on: 'right',
      },
      arrow: true,
      classes: 'example-step-extra-class',
      buttons: buttonConfig,
    },
    );
    tour.addStep({
      id: '5',
      title: 'Viewing Calendar',
      text: 'Checkout your own personal calendar page to be able to organize your busy schedule!',
      attachTo: {
        element: '.view-calendar',
        on: 'right',
      },
      arrow: true,
      classes: 'example-step-extra-class',
      buttons: buttonConfig,
    },
    );
    tour.addStep({
      id: '6',
      title: 'Viewing Settings',
      text: 'Checkout this page to be able to set up your personal notifications whether it be for messages or upcoming events, you can personalize it all here!',
      attachTo: {
        element: '.view-settings',
        on: 'right',
      },
      arrow: true,
      classes: 'example-step-extra-class',
      buttons: buttonConfig,
    },
    );
    tour.addStep({
      id: '7',
      title: 'Deleting Account',
      text: 'If you are no longer interested in PurdueHub anymore, you can head over to this page and delete your account.',
      attachTo: {
        element: '.view-delete',
        on: 'right',
      },
      arrow: true,
      classes: 'example-step-extra-class',
      buttons: buttonConfig,
    },
    );
    tour.addStep({
      id: '8',
      title: 'Messaging A User',
      text: 'If you want to message somebody, checkout this page to do so!',
      attachTo: {
        element: '.view-message-user',
        on: 'right',
      },
      arrow: true,
      classes: 'example-step-extra-class',
      buttons: buttonConfig,
    },
    );
    tour.addStep({
      id: '9',
      title: 'Followed Events',
      text: 'If you want view events from clubs you have followed, you can view them all in page!',
      attachTo: {
        element: '.view-upcoming-events',
        on: 'right',
      },
      arrow: true,
      classes: 'example-step-extra-class',
      buttons: buttonConfig,
    },
    );

    tour.addStep({
      id: '10',
      title: 'Finding A User',
      text: 'If you want to find somebody, checkout this page to do so!',
      attachTo: {
        element: '.view-search-user',
        on: 'right',
      },
      arrow: true,
      classes: 'example-step-extra-class',
      buttons: buttonConfig,
    },
    );

    tour.addStep({
      id: '11',
      title: 'Finding A Class',
      text: 'If you want to find a specific class, checkout this page to do so!',
      attachTo: {
        element: '.view-search-class',
        on: 'right',
      },
      arrow: true,
      classes: 'example-step-extra-class',
      buttons: buttonConfig,
    },
    );

    tour.addStep({
      id: '12',
      title: 'Finding A Club',
      text: 'If you want to find a specific club, checkout this page to do so!',
      attachTo: {
        element: '.view-ex-club',
        on: 'right',
      },
      arrow: true,
      classes: 'example-step-extra-class',
      buttons: buttonConfig,
    },
    );

    tour.addStep({
      id: '13',
      title: 'Questions About Purdue?',
      text: 'If you are new to Purdue, checkout this FAQ for basic information and be able to ask your own question to be answered!',
      attachTo: {
        element: '.view-faq',
        on: 'right',
      },
      arrow: true,
      classes: 'example-step-extra-class',
      buttons: buttonConfig,
    },
    );

    tour.addStep({
      id: '14',
      title: 'Weather Updates',
      text: 'If you want to view the Weather in West Lafayette, checkout this page!',
      attachTo: {
        element: '.view-weather',
        on: 'right',
      },
      arrow: true,
      classes: 'example-step-extra-class',
      buttons: [
        {
          text: 'Finish',
          action: () => {
            console.log('Finished');
            setCompleted(true);
            tour.next();
          },
        },
      ],
    },
    );


  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (isLoggedIn == 'false') {
      navigate("/login");
    }
    else {
      if (showTour) {
        tour.start();
      }
      else {
        // Simulate showing a notification after component mount
        const notificationDiv = document.getElementById('notification');
        notificationDiv.classList.add('show');
  
        const randomTip = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
        setNotificationMessage(randomTip);
  
        setTimeout(() => {
          notificationDiv.classList.remove('show');
        }, 6000);
      }
    }

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
            <span style={{ color: 'red' }} className="close" onClick={handleCloseNotification}>
              &times;
            </span>
          </div>
        )}

        <section className='base-home'>
          <h1 style={{ paddingBottom: '20px' }}>Welcome to PurdueHub!</h1>
          <p style={{ paddingBottom: '20px' }}>An application targeted to students of Purdue University!</p>

          <div className='view-profile'>
            <Link to="/userprofile">View Your Profile</Link>
          </div>

          <div className='view-list'>
            <Link to="/viewlist">View your user lists!</Link>
          </div>

          <div className='provide-feedback'>
            <Link to="/feedback">Provide Feedback</Link>
          </div>

          <div className='view-calendar'>
            <Link to="/calendar">View Your Calendar</Link>
          </div>
          <div className='view-settings'>
            <Link to="/settings">Settings</Link>
          </div>
          <div className='view-delete'>
            <Link to="/delete">Delete Account</Link>
          </div>
          <div className='view-message-user'>
            <Link to="/message-user">Message A User</Link>
          </div>
          <div className='view-upcoming-events'>
            <Link to="/interested-events">Events I am Interested In</Link>
          </div>
          <div className='view-search-user'>
            <Link to="/username-lookup">Username Lookup</Link>
          </div>
          <div className='view-search-class'>
            <Link to="/class-lookup">Class Lookup</Link>
          </div>
          <div className='view-ex-club'>
            <Link to="/club">Look at our example club!</Link>
          </div>
          <div className='view-faq'>
            <Link to="/faq">View FAQs</Link>
          </div>
          <div className='view-weather'>
            <Link to="/weather">View Weather</Link>
          </div>
          <Link to="/chat-bot">Chatbot</Link>
        </section>
      </div >
    </div >
  )
}

