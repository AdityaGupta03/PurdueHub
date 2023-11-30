// FAQ.js
import React, { useState, useRef } from 'react';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';

import './faq.scss'

import '../../components/leftBar/modal.scss';
import '../../components/leftBar/interestedModal.scss';
import '../../components/leftBar/optionsModal.scss';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CloseIcon from '@mui/icons-material/Close';


const FAQ = () => {

  const generalPurdueQuestions = [
    {
      question: 'Q: I am an incoming freshman for the upcoming year at Purdue, I was wondering what are the essentials that I should bring and or buy?',
      answer: ' First of all, congratulations on getting accepted into Purdue! We know this is a sudden change in your life, and you may be a bit lost in navigating this new chapter of your life, don’t worry we are here to help you! When it comes to essentials that you should bring and or buy, we recommend checking out the Purdue subreddit’s wiki page shows an exhaustive list of items you should consider bringing or buying once you get here!            '
    },
    {
      question: 'Q: I am a little overwhelmed on my degree requirements and or classes that I should be taking. Where should I look towards for information?',
      answer: 'Don’t worry! Your assigned advisor is there to help you, they will recommend routes that you can take given your major requirements, your interests, and any other factors. A tool you can use for being proactive in your graduation path is using mypurdueplan, it’ll lay out all your required classes, give you detailed information on said classes, provide you information on your current status, allow you to plan for future semesters, etc. It’s a really handy tool every Purdue student should utilize! We also recommend on platforms such as the Purdue subreddit for any posts regarding recommended classes for your major, and as well testimonials from other fellow peers who are taking or have taken classes you are interested in. '
    },
    {
      question: 'Q: I am curious about all the organizations and clubs that exist here at Purdue, where could I find information regarding this?',
      answer: 'There is a large diversity of people here at Purdue, with everyone’s own unique interests, organizations and clubs exist to group common interests together. You can get to know people as well as create friendships through these organizations. A tool you can use for finding clubs or organizations would be through BoilerLink! It’ll not only give you detailed information on the organizations here at Purdue, but as well as their specific events coming up, contact info to reach out to them, and any other important information!            '
    },
    // Add more FAQ items as needed
  ];

  const purdueHubQuestions = [
    {
      question: 'Q: I am getting harrased by another user, what can I do?',
      answer: "This type of behavior is not tolerated here at PurdueHub, head over to the said user page, click on the three dots, and click on 'Report', leave detailed feedback on the report and we will quickly take action"
    },
    {
      question: "Q: I have been enjoying my time here at PurdueHub, but I have a few suggestions to offer, do you have contact information?",
      answer: "We are always open to suggestions from our users! This is an application built by students, for the students. If you would like to leave a suggestion, please click on 'Feedback' located on the left navigation bar or in the top right of your user profile",
    },
    {
      question: "Q: I have encountered a bug, how can I report this?",
      answer: "Thank you for bringing to our attention your concerns, please head over to 'Feedback' on your left navigation bar or on the top right of your user profile to provide us the bug information, thank you!",
    },
    // Add more FAQ items as needed
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const [openHubIndex, setOpenHubIndex] = useState(null);
  const toggleHubAnswer = (index) => {
    setOpenHubIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const [questionGiven, setQuestionGiven] = useState(''); // question given by user

  const [showSubmitQuestionPage, setShowSubmitQuestionPage] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const errRef = useRef(); /* Set focus on an error, to allow accessibility purposes */

  const handleQuestionGiven = () => {

    setShowSubmitQuestionPage(!showSubmitQuestionPage);
    setQuestionGiven("");
  }

  return (
    <div className='faq'>
      <div onClick={() => { setShowSubmitQuestionPage(!showSubmitQuestionPage) }} className='top-right' >
        <span>Got a question?</span>
        <IconButton>
          <InsertCommentIcon />
        </IconButton>
      </div>
      <div className='wrapper'>
        <h1>General Purdue FAQ</h1>
        {generalPurdueQuestions.map((faqItem, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              {openIndex === index ? <ArrowDropUpIcon className='icon' /> : <ArrowDropDownIcon className='icon' />}
              <span></span>{faqItem.question}
            </div>
            {openIndex === index && <div className="faq-answer">{faqItem.answer}</div>}
          </div>
        ))}
        <h1>PurdueHub FAQ</h1>
        {purdueHubQuestions.map((faqItem, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleHubAnswer(index)}>
              {openHubIndex === index ? <ArrowDropUpIcon className='icon' /> : <ArrowDropDownIcon className='icon' />}
              <span></span>{faqItem.question}
            </div>
            {openHubIndex === index && <div className="faq-answer">{faqItem.answer}</div>}
          </div>
        ))}
      </div>

      {/* GIVE A QUESTION TO BACKEND MODAL */}
      <Modal
        open={showSubmitQuestionPage}
        onClose={() => { setShowSubmitQuestionPage(!showSubmitQuestionPage) }}>

        <div className="norm">
          <div className="modal-container">

            <div className='modal-title'>
              <span>Got A Question?</span>
            </div>

            <div onClick={() => { setShowSubmitQuestionPage(!showSubmitQuestionPage) }} className='modal-exit' >
              <IconButton>
                <CloseIcon />
              </IconButton>
            </div>

            <div className='modal-content-1'>
              <span>What is your question?</span>
            </div>
            <div className='modal-content-2'>
              <span>Question:</span>
              <textarea
                placeholder='Question To Provide Here'
                onChange={(e) => setQuestionGiven(e.target.value)}
                value={questionGiven}
              ></textarea>
            </div>
            <div className='modal-content-3'>
              <div className='contain-btn'>
                <button onClick={() => { setShowSubmitQuestionPage(!showSubmitQuestionPage) }} className='cancel-btn'>Cancel</button>
              </div>
              <div className='contain-btn'>
                <button disabled={questionGiven ? false : true} onClick={() => { handleQuestionGiven(); }} className='submit-btn'>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FAQ;