// this is for viewing and editing notes individually
// ViewNote.js
import React from 'react';
import './ViewNote.css';
import { useParams } from 'react-router-dom';

// populate these with jsons from pinata!!
const notesData = [
  {
    id: 1,
    content: "Patient shows improvement in symptoms as of Sept 20, 2024. Continue monitoring.",
  },
  {
    id: 2,
    content: "Discussed medication adjustments on Sept 22, 2024. Adjust dosages accordingly.",
  },
  {
    id: 3,
    content: "Follow-up on lab results needed by Oct 1, 2024. Schedule accordingly.",
  },
  {
    id: 4,
    content: "Even more lab results needed by Oct 7, 2024. Ensure all tests are completed.",
  },
];

function ViewNote() {
  const { noteId } = useParams();
  const note = notesData.find(n => n.id === parseInt(noteId));

  return (
    <div className="view-note-section">
      {note ? (
        <div>
          <h2>Note Details</h2>
          <p>{note.content}</p>
        </div>
      ) : (
        <p>Note not found.</p>
      )}
    </div>
  );
}

export default ViewNote;