// Notes.js
import React from 'react';
import './Notes.css';
import DoctorNotes from '../DoctorNotes/DoctorNotes.js';
import PatientNotes from '../PatientNotes/PatientNotes.js';

function Notes({ isAdmin }) {
  return (
    <div className="notes-section">
      {isAdmin ? <DoctorNotes /> : <PatientNotes />}
    </div>
  );
}

export default Notes;