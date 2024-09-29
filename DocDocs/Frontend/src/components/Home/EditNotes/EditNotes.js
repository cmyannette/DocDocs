// EditNotes.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditNotes.css'; // You can style this component as needed

const EditNotes = () => {
  const navigate = useNavigate();

  // Combined notes example
  const [notes, setNotes] = useState("Patient shows improvement in symptoms. Discussed lifestyle changes.");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle saving the notes as needed (e.g., sending to an API)

    // After submitting, redirect to home page
    navigate('/');
  };

  return (
    <div className="edit-notes-section">
      <h2>Edit Meeting Notes</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Meeting Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={10}
            cols={50}
          />
        </div>
        <button type="submit">Submit Changes</button>
      </form>
    </div>
  );
};

export default EditNotes;