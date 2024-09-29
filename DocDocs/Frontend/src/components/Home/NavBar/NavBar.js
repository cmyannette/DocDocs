// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar({ patient, onLogout }) {
  return (
    <div className="sidebar">
      <div className="profile">
        <img src={patient.pfp} alt="Patient Profile" />
        <div className="username">{patient.name}</div>
      </div>
      <ul>
        <li><Link to="/home-page">Home</Link></li>
        <li><Link to="/notes">Meeting Notes</Link></li>
      </ul>
      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </div>
  );
}

export default NavBar;