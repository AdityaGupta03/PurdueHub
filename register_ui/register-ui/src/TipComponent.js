import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TipComponent = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (visible) {
      const tips = [
        'Check out the calendar page to schedule events!',
        'Explore our new features in the settings menu.',
        // Add more tips as needed
      ];

      const randomTip = tips[Math.floor(Math.random() * tips.length)];

      toast.info(randomTip, {
        autoClose: 5000,
        onClose: () => setVisible(false),
      });
    }
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return null;
};

export default TipComponent;

