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

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div className="login-page">
          <div className="login-form">
            <h2>Login</h2>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
            <p><a href="#">Forgot Password?</a></p>
          </div>
        </div>
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
            <button className="logout-btn">Logout</button>
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
