import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Notes/Notes.css';
import '../PatientNotes/PatientNotes.css';

function PatientNotes() {
  const navigate = useNavigate();
  const examplePatientNotes = [
    { id: 1, text: "Had a discussion about lifestyle changes.", date: "Sept 15, 2024", doctor: "Dr. Smith" },
    { id: 2, text: "Learned about test results.", date: "Sept 18, 2024", doctor: "Dr. Johnson" },
    { id: 3, text: "Received advice on managing symptoms.", date: "Sept 25, 2024", doctor: "Dr. Brown" },
  ];

  const handleNavigate = (id) => {
    navigate(`/view-note/${id}`);
  };

  return (
    <div className="patient-notes-section">
      <h2>Patient Notes</h2>
      <ul className="card-container">
        {examplePatientNotes.map((note) => (
          <li key={note.id} className="card">
            <h3>{note.text}</h3>
            <button onClick={() => handleNavigate(note.id)}><b>Go to Note</b></button>
            <div className="doctor-name">{note.doctor}</div>
            <div className="date">{note.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientNotes;
