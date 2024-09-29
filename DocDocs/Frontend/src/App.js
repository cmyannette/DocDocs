import React, { useState } from 'react';
import './App.css';
import Login from './components/Login/Login.js';
import NavBar from './components/Home/NavBar/NavBar.js';
import HomePage from './components/Home/HomePage/HomePage.js';
import MeetingPage from './components/Meeting/MeetingPage.js';
import Notes from './components/Home/Notes/Notes.js';
import Calender from './components/Home/Calender/Calender.js'; // Import the Calendar component
import ViewNote from './components/Home/ViewNote/ViewNote.js'; // Import ViewNote
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import Google OAuth provider

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state
  const [meetingInProgress, setMeetingInProgress] = useState(false); // Manage meeting state
  const [isAdmin, setIsAdmin] = useState(false); // Admin state for role-based access

  const patient = {
    name: 'John Doe',
    pfp: 'https://via.placeholder.com/150', // Placeholder image for patient
  };

  const meetings = 2; // Number of meetings available

  // Handle login action
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Handle logout action
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Handle starting a meeting
  const handleJoinMeeting = () => {
    setMeetingInProgress(true);
  };

  // Handle ending a meeting
  const handleMeetingEnd = () => {
    setMeetingInProgress(false);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}> {/* Add your Google Client ID here */}
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
                    <Route path="/notes" element={<Notes isAdmin={isAdmin} />} /> {/* Notes route */}
                    <Route path="/view-note/:noteId" element={<ViewNote />} /> {/* View individual note */}
                    <Route path="/calender" element={<Calender />} /> {/* Calendar route */}
                  </Routes>
                </>
              )}
            </>
          )}
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
