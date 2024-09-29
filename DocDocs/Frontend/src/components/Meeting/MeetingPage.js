// MeetingPage.js
import React, { useState } from 'react';
import './MeetingPage.css'; // Import the CSS for MeetingPage
import { useNavigate } from 'react-router-dom';

const MeetingPage = ({ patient, meetings, onEndMeeting }) => {
  const navigate = useNavigate();
  
  const handleMeetingEnd = () => {
    const wantsNotes = window.confirm("Do you want meeting notes?");
    if (wantsNotes) {
      // Navigate to EditNotes instead of showing an alert
      navigate('/edit-notes');
    }
    onEndMeeting(); // Call the parent function to handle ending the meeting
  };

  return (
    <div className="meeting-page">
      <div className="meeting-in-progress">
        <h2>Meeting in Progress</h2>
        <p>Content of the meeting goes here.</p>
        <button className="end-meeting-btn" onClick={handleMeetingEnd}>
          End Meeting
        </button>
      </div>
    </div>
  );
};

export default MeetingPage;
