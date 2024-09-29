import React from 'react';
import './HomePage.css';

function HomePage({ patient, meetings, onJoinMeeting }) {
  return (
    <div className="main-content">
      <section id="home">
        <div className="hero-image">
          <div className="hero-text" id="hero-text">
            <h1 id="hero-text">Welcome to <b>DocDocs</b></h1>
            <h3 id="hero-text">Your telehealth transcription assistant! </h3>
          </div>
        </div>
      </section>
      <section id="meetings">
        <h2>Meetings</h2>
        <p>Hello {patient.name}. You have {meetings > 0 ? meetings : 'no'} upcoming meetings.</p>
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
