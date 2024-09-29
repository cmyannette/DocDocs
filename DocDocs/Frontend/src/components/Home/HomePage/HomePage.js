import React from 'react';
import './HomePage.css';

function HomePage({ patient, meetings, onJoinMeeting }) {
  return (
    <div className="main-content">
      <section id="home">
        <h2>Home</h2>
        <p> Welcome to <b>DocDocs</b>, Your telehealth transcription assistant! </p>
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
    </div>
  );
}

export default HomePage;
