// PatientNotes.js
import React from 'react';
import '../Notes/Notes.css';

function PatientNotes() {
  const examplePatientNotes = [
    "Had a discussion about lifestyle changes on Sept 15, 2024.",
    "Learned about test results on Sept 18, 2024.",
    "Received advice on managing symptoms on Sept 25, 2024.",
  ];

  return (
    <div className="patient-notes-section">
      <h2>Patient's Notes</h2>
      <ul>
        {examplePatientNotes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

export default PatientNotes;