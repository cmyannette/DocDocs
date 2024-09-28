import React, { useState } from 'react';
import './App.css';

function App() {
  // State to track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const patient = {
    name: 'John Doe',
    pfp: 'https://via.placeholder.com/150' // Replace with actual photo URL
  };

  const meetings = 2;

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  return (
    <div className="App">
      {!isLoggedIn ? (
        <>
          {/* Glassmorphism Login Page */}
          <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <form className="glass-form">
            <h3>Welcome to DocDocs! Please Login Here</h3>

            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Username" id="username" />

            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" />

            <button type="button" onClick={handleLogin}>Log In</button>
          </form>
        </>
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
          <div className="main-content">
            <section id="meetings">
              <h2>Meetings</h2>
              <p>Hello {patient.name}. You have {meetings > 0 ? meetings : 'no'} upcoming meetings.</p>
            </section>
            <section id="notes">
              <h2>Notes</h2>
              <p>Here are your notes...</p>
            </section>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
