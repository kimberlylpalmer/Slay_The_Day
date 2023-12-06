import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import CalendarContainer from "./CalendarContainer";
import Footer from "./Footer";
import {BrowserRouter as Router}  from "react-router-dom"

const eventsAPI = "http://localhost:3000/appointments";
// console.log(eventsAPI);
const contactsAPI = "http://localhost:3000/contacts";

function App() {
  const [displayedYear, setDisplayedYear] = useState(new Date().getFullYear());
  const [allEvents, setAllEvents] = useState([]);
  const [holidayEvents, setHolidayEvents] = useState([]);
  const [contacts, setContacts] = useState([]);

  const holidaysAPI = `https://date.nager.at/api/v3/PublicHolidays/${displayedYear}/US`;
  // console.log("test", holidaysAPI);

  useEffect(() => {
    fetch(eventsAPI)
      .then((res) => res.json())
      .then((events) => {
        const formattedEvents = events.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        console.log("Formatted All Events:", formattedEvents);
        setAllEvents(formattedEvents);
      });

    fetch(holidaysAPI)
      .then((res) => res.json())
      .then((data) => {
        const formattedEvents = data.map((holiday) => ({
          title: holiday.name,
          start: new Date(holiday.date + "T00:00:00"),
          end: new Date(holiday.date + "T23:59:59"),
        }));
        setHolidayEvents(formattedEvents);
      });
  }, [displayedYear]);

  useEffect(() => {
    fetch(contactsAPI)
      .then((res) => res.json())
      .then(setContacts);
  }, []);

  function onYearChange(newYear) {
    setDisplayedYear(newYear);
  }

  function handleAddEvent(newEvent) {
    setAllEvents([...allEvents, newEvent]);
  }

  function handleAddContact(newContact) {
    setContacts([...contacts, newContact]);
  }

  return (
    <Router>

    <div className="App">
      <Header handleAddEvent={handleAddEvent} />
      <CalendarContainer
        allEvents={allEvents}
        holidayEvents={holidayEvents}
        onYearChange={onYearChange}
      />

      <Footer contacts={contacts} handleAddContact={handleAddContact} />
    </div>
    </Router>
  );
}

export default App;
