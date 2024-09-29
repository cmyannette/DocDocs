import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Notes/Notes.css';

function DoctorNotes() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([
    {
      id: '01923cbc-6fb9-776b-a8cc-a6f29ee38712',
      name: 'SOAP_Note_4.txt',
      description: `Subjective: Patient states they have been experiencing headaches that are throbbing in nature, occurring almost daily for the past month. Triggers include stress and lack of sleep.

Objective: Neurological exam normal. Cranial nerves intact. No signs of focal neurological deficits. Blood pressure and heart rate within normal limits.

Assessment: Tension-type headaches, likely related to stress and sleep disturbances. No signs of secondary causes or need for further imaging at this time.

Plan: Recommend lifestyle modifications, including stress management and regular sleep schedule. Prescribe acetaminophen for pain relief. Follow up in 1 month.`,
    },
    {
      id: '01923cbc-4eeb-7c78-9867-eb4a5dab3a88',
      name: 'SOAP_Note_3.txt',
      description: `Subjective: Patient presents with a sore throat and nasal congestion for the past 3 days. Reports mild fever and body aches. No difficulty breathing or swallowing.

Objective: Temperature is 100.4°F. Pharynx shows mild erythema. No exudates. Nasal mucosa is swollen with clear discharge. Lungs clear to auscultation. No lymphadenopathy.

Assessment: Upper respiratory infection, likely viral. No signs of bacterial infection at this time.

Plan: Increase fluid intake. Recommend rest and over-the-counter decongestants. Advise to return if symptoms worsen or persist beyond 7 days.`,
    },
    {
      id: '01923cbc-1fcf-7dff-8498-1b31eeb9ff60',
      name: 'SOAP_Note_2.txt',
      description: `Subjective: Patient complains of chronic lower back pain, rated 6/10 on the pain scale, aggravated by prolonged sitting. Reports improvement with physical therapy exercises.

Objective: No swelling or bruising. Tenderness noted in the lumbar region upon palpation. Range of motion is limited. Gait is slightly antalgic.

Assessment: Chronic lower back pain, likely due to degenerative disc disease. No signs of acute injury or neurological deficit.

Plan: Continue physical therapy. Prescribe NSAIDs as needed for pain management. Follow up in 4 weeks to monitor progress.`,
    },
    {
      id: '01923cbb-fc39-7b75-8eda-5264d278d5d9',
      name: 'SOAP_Note_1.txt',
      description: `Subjective: Patient reports feeling increased stress and anxiety over the past two weeks due to work-related issues. Denies any suicidal ideation or panic attacks.

Objective: Vital signs stable. Appears alert and oriented. No signs of distress. Mood is anxious, and affect is congruent. Heart rate and blood pressure are within normal limits.

Assessment: Generalized anxiety disorder. Symptoms are likely exacerbated by occupational stress. No current indication of immediate danger to self.

Plan: Continue current medication regimen. Recommend CBT therapy. Follow up in 2 weeks for reassessment.`,
    },
  ]);

  useEffect(() => {
    const fetchNoteNames = async () => {
      const updatedNotes = await Promise.all(
        notes.map(async (note) => {
          try {
            const response = await fetch(`http://localhost:5044/api/example/get-file-by-id/${note.id}`);
            const data = await response.json();

            if (data && data.name) {
              return { ...note, name: data.name }; // Dynamically set the name from the API response
            }
          } catch (error) {
            console.error(`Error fetching file ${note.id}:`, error);
          }
          return note;
        })
      );
      setNotes(updatedNotes);
    };

    fetchNoteNames();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/view-note/${id}`);
  };

  return (
    <div className="doctor-notes-section">
      <h2>Doctor's Notes</h2>
      <ul className="card-container">
        {notes.map((note) => (
          <li key={note.id} className="card">
            <h3>{note.name}</h3>
            <p>{note.description}</p>
            <button onClick={() => handleNavigate(note.id)}>
              <b>Go to Note</b>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorNotes;
