// DoctorNotes.js
import React from 'react';
import '../Notes/Notes.css';

function DoctorNotes() {
  const exampleDoctorNotes = [
    "Patient shows improvement in symptoms as of Sept 20, 2024.",
    "Discussed medication adjustments on Sept 22, 2024.",
    "Follow-up on lab results needed by Oct 1, 2024.",
    "Even more lab results needed by Oct 7, 2024.",
  ];

  return (
    <div className="doctor-notes-section">
      <h2>Doctor's Notes</h2>
      <ul class="card-container">
        {exampleDoctorNotes.map((note, index) => (
          <li key={index} class="card">
            <h3>{note}</h3>
            <button><b>Go to Note</b></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorNotes;