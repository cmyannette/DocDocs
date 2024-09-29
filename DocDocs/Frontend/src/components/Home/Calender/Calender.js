// Calender.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // React calendar component
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import './Calender.css'; // Custom styles for the Calendar

function Calender() {
  const [value, setValue] = useState(new Date()); // Calendar selected date
  const [events, setEvents] = useState([]); // Store fetched events
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [token, setToken] = useState(null); // Store the Google OAuth token

  // Google login to get access token
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setIsAuthenticated(true);
      setToken(tokenResponse.access_token); // Store the access token
      fetchGoogleCalendarEvents(tokenResponse.access_token); // Fetch events after login
    },
    onError: () => console.log('Login Failed'),
    scope: 'https://www.googleapis.com/auth/calendar.readonly', // Scope to read Google Calendar events
  });

  // Fetch events from Google Calendar API
  const fetchGoogleCalendarEvents = (accessToken) => {
    axios
      .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setEvents(response.data.items); // Store the fetched events
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  };

  // Function to check if a date has any events
  const isEventOnDay = (date) => {
    return events.some((event) => {
      const eventDate = new Date(event.start.dateTime || event.start.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Add a marker (dot) to days that have events
  const tileContent = ({ date, view }) => {
    if (view === 'month' && isEventOnDay(date)) {
      return <span className="event-marker">●</span>; // Show a dot for days with events
    }
    return null;
  };

  return (
    <div className="calendar-page">
      <h2>Google Calendar</h2>
      {!isAuthenticated ? (
        <button className="sync-btn" onClick={() => login()}>
          Sync with Google Calendar
        </button>
      ) : (
        <>
          <Calendar
            onChange={setValue} // Update selected date
            value={value} // Current selected date
            tileContent={tileContent} // Add event markers to dates
          />
          <h3>Events on {value.toDateString()}:</h3>
          <ul>
            {events
              .filter((event) => {
                const eventDate = new Date(event.start.dateTime || event.start.date);
                return eventDate.toDateString() === value.toDateString();
              })
              .map((event) => (
                <li key={event.id}>
                  {event.summary} - {new Date(event.start.dateTime || event.start.date).toLocaleTimeString()}
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Calender;
