import {useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const ReportSubmission = () => {
  const [username, setUsername] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // You can implement code here to send the report data to a server or save it locally.
    // For the sake of simplicity, we will display an alert.
    alert(`Report submitted:\nUsername: ${username}\nReason: ${reason}`);

    // Clear the form
    setUsername('');
    setReason('');
  };

  return (
    <div>
      <h1>Report Submission</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />

        <label htmlFor="reason">Report Reason:</label>
        <textarea
          id="reason"
          name="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        ></textarea><br />

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportSubmission;