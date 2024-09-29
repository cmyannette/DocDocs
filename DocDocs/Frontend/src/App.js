import React, { useState } from 'react';
import './App.css';
import Login from './components/Login/Login.js';
import NavBar from './components/Home/NavBar/NavBar.js';
import HomePage from './components/Home/HomePage/HomePage.js';
// Removed the unused import for MeetingPage
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

  // Removed the handleMeetingEnd since it's not used

  const payload = {
    meetingNumber: '123456789',
    role: 0,
    sdkKey: 'yourSdkKey',
    sdkSecret: 'yourSdkSecret',
    password: 'yourPassword',
    userName: 'Testing',
    userEmail: '',
    leaveUrl: 'https://localhost:3000'
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
                onJoinMeeting={handleJoinMeeting} // Pass the handleJoinMeeting function
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
