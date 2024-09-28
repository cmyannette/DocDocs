import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <MainContent />
    </div>
  );
}

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><a href="#meetings">Meetings</a></li>
        <li><a href="#notes">Notes</a></li>
      </ul>
    </div>
  );
};

const MainContent = () => {
  return (
    <div className="main-content">
      <section id="meetings">
        <h2>Meetings</h2>
        <p>Here are your upcoming meetings...</p>
      </section>
      <section id="notes">
        <h2>Notes</h2>
        <p>Here are your notes...</p>
      </section>
    </div>
  );
};

export default App;
