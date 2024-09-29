import React from 'react';
import './HomePage.css';

function HomePage({ patient, meetings, onJoinMeeting }) {
  return (
<<<<<<< HEAD
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
        <h2 className="meetings-header">Meetings</h2>
        <p className="welcome-message">
          Hello <span className="patient-name">{patient.name}</span>.
        </p>
        <p className="meeting-info">
          You have <span className="upcoming-meetings">{meetings > 0 ? meetings : 'no'}</span> upcoming meetings.
        </p>
=======
    <div class="main-content">
      <section id="home">
      <div class="hero-image">
        <div class="hero-text" id="hero-text">
            <h1 id="hero-text">Welcome to <b>DocDocs</b></h1>
            <h3 id="hero-text">Your telehealth transcription assistant! </h3>
        </div>
      </div>
      </section>
      <section id="meetings">
        <h2>Meetings</h2>
        <p>Hello {patient.name}. You have {meetings > 0 ? meetings : 'no'} upcoming meetings.</p>
>>>>>>> Feature-AWS
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
