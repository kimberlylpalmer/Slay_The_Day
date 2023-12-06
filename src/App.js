import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import CalendarContainer from "./CalendarContainer";
import Footer from "./Footer";


const holidaysAPI = "https://date.nager.at/api/v3/PublicHolidays/2023/US";
// console.log("test", holidaysAPI);
const eventsAPI = "http://localhost:3000/appointments";
// console.log(eventsAPI);
const contactsAPI = "http://localhost:3000/contacts"

function App() {
  const [allEvents, setAllEvents] = useState([]);
  const [holidayEvents, setHolidayEvents] = useState([]);
  const [contacts, setContacts] = useState([]);

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
  }, []);
  
  useEffect(() => {
    fetch(contactsAPI)
    .then(res => res.json())
    .then(setContacts)
  }, [])

  function handleAddEvent(newEvent) {
    setAllEvents([...allEvents, newEvent]);
  }

  function handleAddContact(newContact) {
    setContacts([...contacts, newContact])
  }

  return (
    <div className="App">
      <Header handleAddEvent={handleAddEvent} />
      <CalendarContainer allEvents={allEvents} holidayEvents={holidayEvents} />
      <Footer contacts={contacts} handleAddContact={handleAddContact}/>  
    </div>
  );
}

export default App;
