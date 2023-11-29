// FAQPage.js
import React from 'react';
import FAQ from './FAQ'; // Adjust the path as needed

const FAQPage = () => {
  const faqData = [
    {
      question: 'What is React?',
      answer: 'React is a JavaScript library for building user interfaces.',
    },
    {
      question: 'How do I install React?',
      answer: 'You can install React by using npm or yarn. For example, "npm install react".',
    },
    // Add more FAQ items as needed
  ];

  return (
    <div>
      <h1>Frequently Asked Questions</h1>
      <FAQ faqData={faqData} />
    </div>
  );
};

export default FAQPage;