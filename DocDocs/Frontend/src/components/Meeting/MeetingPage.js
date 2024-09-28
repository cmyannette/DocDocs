// MeetingPage.js
import React, { useState } from 'react';
import './MeetingPage.css'; // Import the CSS for MeetingPage

const MeetingPage = ({ patient, meetings, onJoinMeeting, onEndMeeting }) => {
  const [meetingInProgress, setMeetingInProgress] = useState(false);

  const handleJoinMeeting = () => {
    setMeetingInProgress(true);
    onJoinMeeting(); // Call the parent function to handle joining the meeting
  };

  const handleMeetingEnd = () => {
    const wantsNotes = window.confirm("Do you want meeting notes?");
    if (wantsNotes) {
      // Logic to show meeting notes will go here
      alert("Showing meeting notes...");
    }
    setMeetingInProgress(false); // Reset the meeting state
    onEndMeeting(); // Call the parent function to handle ending the meeting
  };

  return (
    <div className="meeting-page">
      {!meetingInProgress ? (
        <div className="main-content">
          <section id="meetings">
            <h2>Meetings</h2>
            <p>Hello {patient.name}. You have {meetings > 0 ? meetings : 'no'} upcoming meetings.</p>
            {meetings > 0 && (
              <button className="join-meeting-btn" onClick={handleJoinMeeting}>Join Meeting</button>
            )}
          </section>
          <section id="notes">
            <h2>Notes</h2>
            <p>Here are your notes...</p>
          </section>
        </div>
      ) : (
        <div className="meeting-in-progress">
          <h2>Meeting in Progress</h2>
          <p>Content of the meeting goes here.</p>
          <button className="end-meeting-btn" onClick={handleMeetingEnd}>
            End Meeting
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetingPage;
