// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Assuming you have a CSS file for styling the NavBar

function NavBar({ patient, onLogout }) {
  return (
    <div className="sidebar">
      <div className="profile">
        <img src="./Test.png" alt="Profile" />
        <div className="username">{patient.name}</div>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/notes">Notes</Link></li>
      </ul>
      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </div>
  );
}

export default NavBar;
