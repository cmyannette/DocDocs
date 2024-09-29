// DoctorNotes.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Notes/Notes.css';

function DoctorNotes() {
  const navigate = useNavigate();
  const exampleDoctorNotes = [
    { id: 1, text: "Patient shows improvement in symptoms as of Sept 20, 2024." },
    { id: 2, text: "Discussed medication adjustments on Sept 22, 2024." },
    { id: 3, text: "Follow-up on lab results needed by Oct 1, 2024." },
    { id: 4, text: "Even more lab results needed by Oct 7, 2024." },
  ];

  const handleNavigate = (id) => {
    navigate(`/view-note/${id}`);
  };

  return (
    <div className="doctor-notes-section">
      <h2>Doctor's Notes</h2>
      <ul className="card-container">
        {exampleDoctorNotes.map((note) => (
          <li key={note.id} className="card">
            <h3>{note.text}</h3>
            <button onClick={() => handleNavigate(note.id)}><b>Go to Note</b></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorNotes;