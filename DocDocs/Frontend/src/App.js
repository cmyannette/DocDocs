// App.js
import React, { useState } from 'react';
import './App.css';
import Login from './components/Login/Login.js';
import NavBar from './components/Home/NavBar/NavBar.js'; 
import HomePage from './components/Home/HomePage/HomePage.js';
import MeetingPage from './components/Meeting/MeetingPage.js';
import Notes from './components/Home/Notes/Notes.js';
import ViewNote from './components/Home/ViewNote/ViewNote.js'; // Import ViewNote
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [meetingInProgress, setMeetingInProgress] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Default to false

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

  return (
    <Router>
      <div className="App">
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} setIsAdmin={setIsAdmin} />
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
                <Routes>
                  <Route path="/" element={<HomePage patient={patient} meetings={meetings} onJoinMeeting={handleJoinMeeting} />} />
                  <Route path="/notes" element={<Notes isAdmin={isAdmin} />} />
                  <Route path="/view-note/:noteId" element={<ViewNote />} />
                </Routes>
              </>
            )}
          </>
        )}
      </div>
    </Router>
  );
}

export default App;