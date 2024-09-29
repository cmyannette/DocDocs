// NavBar.js
import React from 'react';
import './NavBar.css';

function NavBar({ patient, onLogout }) {
  return (
    <div className="sidebar">
      <div className="profile">
        <img src={patient.pfp} alt="Patient Profile" />
        <div className="username">{patient.name}</div>
      </div>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#meetings">Meetings</a></li>
        <li><a href="#notes">Notes</a></li>
      </ul>
      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </div>
  );
}

export default NavBar;