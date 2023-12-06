import React, { useEffect, useState } from "react";
import MonthlyCal from "./MonthlyCal";
import WeeklyCal from "./WeeklyCal";
import DailyCal from "./DailyCal";
import ContactsList from "./ContactsList";
import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns-tz";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function convertEventDatesToTimeZone(event) {
  const startDate = new Date(event.start + "T00:00:00");
  const endDate = new Date(event.end + "T23:59:59");

  if (isNaN(startDate) || isNaN(endDate)) {
    console.error("Invalid date for event:", event);
    return null;
  }

  return {
    ...event,
    start: startDate,
    end: endDate,
  };
}

function CalendarContainer({ allEvents, holidayEvents }) {
  const combinedEvents = [...allEvents, ...holidayEvents];
  return (
    <Router>
      <div>
        <nav>
        <button>
            <Link to="/">Home</Link>
          </button>
          <button>
            <Link to="/MonthlyCal">Monthly Calendar</Link>
          </button>
          <button>
            <Link to="/WeeklyCal">Weekly Calendar</Link>
          </button>
          <button>
            <Link to="/DailyCal">Daily Calendar</Link>
          </button>

        </nav>
        <Routes>
        <Route path="/" />
          <Route
            path="/MonthlyCal"
            element={<MonthlyCal events={combinedEvents} />}></Route>
          <Route
            path="/WeeklyCal"
            element={<WeeklyCal events={combinedEvents} />}></Route>
          <Route
            path="/DailyCal"
            element={<DailyCal events={combinedEvents} />}></Route>
           <Route 
           path="/ContactsList" 
           element={<ContactsList />}></Route>
        </Routes>
      </div>

    </Router>
  );
}

export default CalendarContainer;