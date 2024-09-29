// MeetingNotes.js
import React from 'react';

function Notes({ isAdmin }) {
  const exampleNotesAdmin = [
    "Meeting with Dr. Smith on Oct 5, 2024.",
    "Review of test results on Oct 6, 2024.",
    "Follow-up appointment on Oct 10, 2024.",
  ];

  const exampleNotesUser = [
    "Your appointment is scheduled for Oct 5, 2024.",
  ];

  const notesToDisplay = isAdmin ? exampleNotesAdmin : exampleNotesUser;

  return (
    <div className="notes-section">
      <h2>Meeting Notes</h2>
      <ul>
        {notesToDisplay.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;