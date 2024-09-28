import React, { useState } from 'react';
import './App.css';
import patientImage from './assets/Test.png'; // Add a patient image in the public folder

function App() {
  const patientName = "John Doe";
  const upcomingMeetings = 3; // Change to 0 if no meetings

  return (
    <div className="App">
      <Sidebar patientName={patientName} />
      <MainContent patientName={patientName} upcomingMeetings={upcomingMeetings} />
    </div>
  );
}

const Sidebar = ({ patientName }) => {
  return (
    <div className="sidebar">
      <div className="patient-info">
        <img src={patientImage} alt="Patient Profile" className="patient-pfp" />
        <h2>{patientName}</h2>
      </div>
      <ul>
        <li><a href="#meetings">Meetings</a></li>
        <li><a href="#notes">Notes</a></li>
      </ul>
      <button className="btn logout-btn">Logout</button>
    </div>
  );
};

const MainContent = ({ patientName, upcomingMeetings }) => {
  return (
    <div className="main-content">
      <section id="welcome-message" className="card">
        <h2>Hello {patientName}</h2>
        <p>
          You have {upcomingMeetings > 0 ? `${upcomingMeetings} upcoming meetings` : "no upcoming meetings"}.
        </p>
      </section>
      <section id="meetings" className="card">
        <h2>Meetings</h2>
        <p>Here are your upcoming meetings...</p>
      </section>
      <section id="notes" className="card">
        <h2>Notes</h2>
        <p>Here are your notes...</p>
      </section>
    </div>
  );
};

export default App;
