import React, { useState } from 'react';
import './App.css';
import Login from './components/Login/Login.js';
import MeetingPage from './components/Meeting/MeetingPage'; // Import the MeetingPage

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [meetingInProgress, setMeetingInProgress] = useState(false);

  const patient = {
    name: 'John Doe',
    pfp: 'https://via.placeholder.com/150', // Replace with actual photo URL
  };

  const meetings = 2;

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleJoinMeeting = () => {
    setMeetingInProgress(true);
  };

  const handleMeetingEnd = () => {
    setMeetingInProgress(false); // Reset the meeting state
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <div className="sidebar">
            <div className="profile">
              <img src={patient.pfp} alt="Patient Profile" />
              <div className="username">{patient.name}</div>
            </div>
            <ul>
              <li><a href="#meetings">Meetings</a></li>
              <li><a href="#notes">Notes</a></li>
            </ul>
            <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>Logout</button>
          </div>
          <MeetingPage
            patient={patient}
            meetings={meetings}
            onJoinMeeting={handleJoinMeeting}
            onEndMeeting={handleMeetingEnd}
          />
        </>
      )}
    </div>
  );
}

export default App;
