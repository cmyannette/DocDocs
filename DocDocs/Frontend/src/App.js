import React, { useState } from 'react';
import './App.css';
import Login from './components/Login/Login.js';
import NavBar from './components/Home/NavBar/NavBar.js';
import HomePage from './components/Home/HomePage/HomePage.js';
import Meeting from './ZoomSDK/Meetings.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [meetingInProgress, setMeetingInProgress] = useState(false);

  const patient = {
    name: 'John Doe',
    pfp: 'https://via.placeholder.com/150',
  };

  const meetings = 2;

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleJoinMeeting = () => {
    setMeetingInProgress(true);
  };

  // Using environment variables for the payload
  const payload = {
    meetingNumber: process.env.REACT_APP_MEETING_NUMBER,
    role: Number(process.env.REACT_APP_ROLE), // Convert role to number
    sdkKey: process.env.REACT_APP_SDK_KEY,
    sdkSecret: process.env.REACT_APP_SDK_SECRET,
    password: process.env.REACT_APP_PASSWORD,
    userName: process.env.REACT_APP_USER_NAME,
    userEmail: process.env.REACT_APP_USER_EMAIL,
    leaveUrl: process.env.REACT_APP_LEAVE_URL
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          {meetingInProgress ? (
            <Meeting payload={payload} />
          ) : (
            <>
              <NavBar patient={patient} onLogout={handleLogout} />
              <HomePage 
                patient={patient} 
                meetings={meetings} 
                onJoinMeeting={handleJoinMeeting} 
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
