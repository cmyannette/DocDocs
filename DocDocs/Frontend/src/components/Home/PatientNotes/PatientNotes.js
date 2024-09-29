import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Notes/Notes.css';

function PatientNotes() {
  const navigate = useNavigate();
  const [patientNotes, setPatientNotes] = useState([
    { id: '01923c57-5bc9-7c85-9a34-d6ee7f619382', name: 'Doctor_Note_4.txt', content: 'Loading...' },
    { id: '01923c57-2f2d-7f42-9df2-6a545202b1cc', name: 'Doctor_Note_3.txt', content: 'Loading...' },
    { id: '01923c57-08ec-734d-85ce-c386e8f0fda3', name: 'Doctor_Note_2.txt', content: 'Loading...' },
    { id: '01923c56-e835-7657-85f5-6e17e81d580a', name: 'Doctor_Note_1.txt', content: 'Loading...' },
  ]);

  const Descriptions = {
    '01923c57-5bc9-7c85-9a34-d6ee7f619382': `Patient Instructions:

1. Start the new inhaler medication for your asthma as prescribed.
   - Dosage: 2 puffs every 4-6 hours as needed for wheezing or shortness of breath.
   - Use a spacer if you find it difficult to use the inhaler properly.

2. Monitor your peak flow readings daily. Record your best reading in the asthma diary provided.

3. Avoid known triggers such as smoke, dust, and strong odors. Use air purifiers at home if possible.

4. Your next check-up is scheduled in 3 weeks. If you notice your symptoms worsening or if the inhaler does not provide relief, contact our office immediately.

Carry your emergency inhaler with you at all times in case of severe symptoms.`,
    '01923c57-2f2d-7f42-9df2-6a545202b1cc': `Patient Instructions:

1. You have been prescribed a new medication for diabetes management. 
   - Dosage: 15 units of insulin before each meal. Adjust dosage as per your blood sugar readings.
   - Use the insulin pen as demonstrated during your visit. Rotate injection sites on your abdomen.

2. Monitor your blood sugar levels 4 times a day (before meals and at bedtime). Keep a detailed log of your readings.

3. Maintain a balanced diet and regular exercise routine. Avoid foods high in sugar and refined carbs.

4. Schedule a follow-up appointment in 2 weeks to review your blood sugar log and adjust your treatment plan if needed.

If you experience symptoms of low blood sugar (dizziness, sweating, confusion), take a fast-acting sugar source and recheck your levels in 15 minutes.`,
    '01923c57-08ec-734d-85ce-c386e8f0fda3': `Patient Instructions:

1. Begin taking the antibiotic as prescribed for your sinus infection.
   - Dosage: 500 mg twice daily for 7 days.
   - Take with food to avoid stomach upset.
   - Complete the full course, even if you start feeling better.

2. Use saline nasal spray as needed to help relieve nasal congestion. Avoid using decongestant nasal sprays for more than 3 days.

3. Drink plenty of fluids and rest. Avoid strenuous activities until you feel better.

4. Your next appointment is scheduled for 10 days from now to evaluate your progress and decide if further treatment is necessary.

If you develop a rash, severe diarrhea, or persistent high fever, contact our office immediately.`,
    '01923c56-e835-7657-85f5-6e17e81d580a': `Patient Instructions:

1. Continue taking your prescribed medication for hypertension as directed. 
   - Dosage: 10 mg once daily in the morning with food.
   - Do not skip doses. If you miss a dose, take it as soon as you remember, unless it's almost time for your next dose.

2. Monitor your blood pressure at home twice a day (morning and evening). Record your readings in the provided logbook.

3. Follow a low-sodium diet and reduce caffeine intake.

4. Schedule a follow-up appointment in 4 weeks to review your blood pressure readings and assess medication effectiveness.

If you experience any side effects such as dizziness, unusual swelling, or difficulty breathing, please contact our office immediately.`,
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const updatedNotes = await Promise.all(
          patientNotes.map(async (note) => {
            const response = await fetch(`http://localhost:5044/api/example/get-file-by-id/${note.id}`);
            if (response.ok) {
              const data = await response.json();
              return { ...note, name: data.name, content: Descriptions[note.id] };
            } else {
              console.error(`Failed to fetch file with id: ${note.id}`);
              return { ...note, content: 'Error loading content' };
            }
          })
        );
        setPatientNotes(updatedNotes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [patientNotes]);

  const handleNavigate = (id) => {
    navigate(`/view-note/${id}`);
  };

  return (
    <div className="patient-notes-section">
      <h2>Patient Notes</h2>
      <ul className="card-container">
        {patientNotes.map((note) => (
          <li key={note.id} className="card">
            <h3>{note.name}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleNavigate(note.id)}><b>Go to Note</b></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientNotes;
