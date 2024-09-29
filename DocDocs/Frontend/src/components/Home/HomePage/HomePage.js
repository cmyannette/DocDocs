import React from 'react';
import './HomePage.css';

function HomePage({ patient, meetings, onJoinMeeting }) {
  return (
    <div className="main-content">
      <section id="home">
        <h2>Home</h2>
      </section>
      <section id="meetings">
        <h2>Meetings</h2>
        <p>Hello {patient.name}. You have {meetings > 0 ? meetings : 'no'} upcoming meetings.</p>
        {/* Update the Join Meeting button */}
        {meetings > 0 && (
          <button className="join-meeting-btn" onClick={onJoinMeeting}>
            Join Meeting
          </button>
        )}
      </section>
      <section id="notes">
        <h2>Notes</h2>
        <p>Here are your notes...</p>
      </section>
    </div>
  );
}

export default HomePage;
