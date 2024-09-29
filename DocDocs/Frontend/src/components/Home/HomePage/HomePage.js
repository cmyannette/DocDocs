// HomePage.js
import React from 'react';
import './HomePage.css';

function HomePage({ patient, meetings }) {
  return (
    <div className="main-content">
      <section id="home">
        <h2>Home</h2>
      </section>
      <section id="meetings">
        <h2>Meetings</h2>
        <p>Hello {patient.name}. You have {meetings > 0 ? meetings : 'no'} upcoming meetings.</p>
      </section>
      <section id="notes">
        <h2>Notes</h2>
        <p>Here are your notes...</p>
      </section>
    </div>
  );
}

export default HomePage;