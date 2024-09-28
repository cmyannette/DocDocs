import React, { useState } from 'react';
import './App.css';

function App() {
  // You can change the patient name and number of meetings here
  const patientName = "John Doe";
  const upcomingMeetings = 3; // Change to 0 if no meetings
  
  return (
    <div className="App">
      <Sidebar />
      <MainContent patientName={patientName} upcomingMeetings={upcomingMeetings} />
    </div>
  );
}

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><a href="#meetings">Meetings</a></li>
        <li><a href="#notes">Notes</a></li>
      </ul>
    </div>
  );
};

const MainContent = ({ patientName, upcomingMeetings }) => {
  return (
    <div className="main-content">
      <section id="welcome-message">
        <h2>Hello {patientName}</h2>
        <p>
          You have {upcomingMeetings > 0 ? `${upcomingMeetings} upcoming meetings` : "no upcoming meetings"}.
        </p>
      </section>
      <section id="meetings">
        <h2>Meetings</h2>
        <p>Here are your upcoming meetings...</p>
      </section>
      <section id="notes">
        <h2>Notes</h2>
        <p>Here are your notes...</p>
      </section>
    </div>
  );
};

export default App;
