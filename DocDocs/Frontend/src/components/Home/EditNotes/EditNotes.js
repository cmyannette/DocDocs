// EditNotes.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditNotes.css'; // Import the CSS for styling

const EditNotes = () => {
  const navigate = useNavigate();

  // Combined notes example
  const [notes, setNotes] = useState("Subjective: Patient states they have been experiencing headaches that are throbbing in nature, occurring almost daily for the past month. Triggers include stress and lack of sleep. Objective: Neurological exam normal. Cranial nerves intact. No signs of focal neurological deficits. Blood pressure and heart rate within normal limits. Assessment: Tension-type headaches, likely related to stress and sleep disturbances. No signs of secondary causes or need for further imaging at this time. Plan: Recommend lifestyle modifications, including stress management and regular sleep schedule. Prescribe acetaminophen for pain relief. Follow up in 1 month.");

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
          <br></br>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={10} // Keep rows as needed
          />
        </div>
        <button type="submit">Submit Changes</button>
      </form>
    </div>
  );
};

export default EditNotes;