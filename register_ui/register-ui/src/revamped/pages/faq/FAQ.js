// FAQ.js
import React, { useState } from 'react';

const FAQ = ({ faqData }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      {faqData.map((faqItem, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleAnswer(index)}>
            {faqItem.question}
          </div>
          {openIndex === index && <div className="faq-answer">{faqItem.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;