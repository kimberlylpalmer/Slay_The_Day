import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import CalendarContainer from "./CalendarContainer";

const holidaysAPI = "https://date.nager.at/api/v3/PublicHolidays/2023/US";
// console.log("test", holidaysAPI);
const eventsAPI = "http://localhost:3000/appointments";
// console.log(eventsAPI);

function App() {
  const [allEvents, setAllEvents] = useState([]);
  const [holidayEvents, setHolidayEvents] = useState([]);

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

  function handleAddEvent(newEvent) {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div className="App">
      <Header handleAddEvent={handleAddEvent} />
      <CalendarContainer allEvents={allEvents} holidayEvents={holidayEvents} />
    </div>
  );
}

export default App;
