import React, { useState } from 'react';
import './App.css';
import Login from './components/Login/Login.js';
import NavBar from './components/Home/NavBar/NavBar.js'; // Ensure the path is correct
import HomePage from './components/Home/HomePage/HomePage.js'; // Ensure the path is correct
import MeetingPage from './components/Meeting/MeetingPage.js'; // Ensure the path is correct

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [meetingInProgress, setMeetingInProgress] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const patient = {
    name: 'John Doe',
    pfp: 'https://via.placeholder.com/150', // Replace with actual photo URL
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

  const handleMeetingEnd = () => {
    setMeetingInProgress(false); // Reset the meeting state
  };

  const handleIsAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          {meetingInProgress ? (
            <MeetingPage 
              patient={patient} 
              meetings={meetings} 
              onJoinMeeting={handleJoinMeeting} 
              onEndMeeting={handleMeetingEnd} 
            />
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
