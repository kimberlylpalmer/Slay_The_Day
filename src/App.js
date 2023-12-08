import WebFont from "webfontloader";
import "./style.css";
import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import CalendarContainer from "./components/CalendarContainer";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";

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
        // console.log("Formatted All Events:", formattedEvents);
        setAllEvents(formattedEvents);
      });

    fetch(holidaysAPI)
      .then((res) => res.json())
      .then((data) => {
        // console.log("received holiday data", data);
        const formattedEvents = data.map((holiday) => ({
          title: holiday.name,
          start: new Date(holiday.date + "T00:00:00"),
          end: new Date(holiday.date + "T23:59:59"),
        }));
        // console.log("holidays", formattedEvents);
        setHolidayEvents(formattedEvents);
      });
  }, [displayedYear]);

  useEffect(() => {
    fetch(contactsAPI)
      .then((res) => res.json())
      .then(setContacts);
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Silkscreen:400,700"],
      },
    });
  }, []);

  function onYearChange(newYear) {
    // console.log("Year Changed To: ", newYear);
    setDisplayedYear(newYear);
  }

  function handleAddEvent(newEvent) {
    newEvent.start = new Date(newEvent.start);
    newEvent.end = new Date(newEvent.end);
    setAllEvents([...allEvents, newEvent]);
  }

  function handleAddContact(newContact) {
    setContacts([...contacts, newContact]);
  }

  const removeElement = (id) => {
    setAllEvents(allEvents.filter(event => event.id !== id))
  }

  return (
    <Router>
      <div className="App">
        <Header handleAddEvent={handleAddEvent} />
        <CalendarContainer
          allEvents={allEvents}
          holidayEvents={holidayEvents}
          onYearChange={onYearChange}
          setAllEvents={setAllEvents}
          removeElement={removeElement}
        />
        <Footer contacts={contacts} handleAddContact={handleAddContact} />
      </div>
    </Router>
  );
}

export default App;
