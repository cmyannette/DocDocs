// App.js
import React, { useState } from 'react';
import './App.css';
import Login from './components/Login/Login.js';
import NavBar from './components/Home/NavBar/NavBar.js';
import HomePage from './components/Home/HomePage/HomePage.js';
import MeetingPage from './components/Meeting/MeetingPage.js';
import Notes from './components/Home/Notes/Notes.js';
import ViewNote from './components/Home/ViewNote/ViewNote.js'; // Import ViewNote
import EditNotes from './components/Home/EditNotes/EditNotes.js'; // Import EditNotes
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Meeting from './ZoomSDK/Meetings.js';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [meetingInProgress, setMeetingInProgress] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Ensure this is defined

  const patient = {
    name: 'John Doe',
    pfp: 'https://via.placeholder.com/150',
  };

  const meetings = 2;

  
  const handleIsAdmin = () => {
    setIsAdmin(!isAdmin);
  };


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
    role: Number(process.env.REACT_APP_ROLE),
    sdkKey: process.env.REACT_APP_SDK_KEY,
    sdkSecret: process.env.REACT_APP_SDK_SECRET,
    passWord: process.env.REACT_APP_PASSWORD,
    userName: process.env.REACT_APP_USER_NAME,
    userEmail: process.env.REACT_APP_USER_EMAIL,
    leaveUrl: process.env.REACT_APP_LEAVE_URL
  };
  
/*
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
*/
  const handleMeetingEnd = () => {
    setMeetingInProgress(false); // Reset the meeting state
  };

  return (
      <div className="App">
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} setIsAdmin={setIsAdmin}/>
        ) : (
          <>
            {meetingInProgress ? (
              <>
                {/* <MeetingPage 
                patient={patient} 
                meetings={meetings} 
                onJoinMeeting={handleJoinMeeting} 
                onEndMeeting={handleMeetingEnd} /> */}

                <Meeting payload={payload} />
                </>
              ) : (
                <>
                  <NavBar patient={patient} onLogout={handleLogout} />
                  <Routes>
                    <Route path="/" element={<HomePage patient={patient} meetings={meetings} onJoinMeeting={handleJoinMeeting} />} />
                    <Route path="/notes" element={<Notes isAdmin={isAdmin} />} /> {/* Notes route */}
                    <Route path="/view-note/:noteId" element={<ViewNote />} /> {/* New route for ViewNote */}
                    <Route path="/edit-notes" element={<EditNotes />} /> {/* Route for EditNotes */}
                  </Routes>
                </>
              )}
          </>
        )}
      </div>
  );
}

export default App;