import React, { useEffect, useState } from "react";
import "../style.css";
import MonthlyCal from "./MonthlyCal";
import WeeklyCal from "./WeeklyCal";
import DailyCal from "./DailyCal";
import ContactsList from "./ContactsList";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";

function CalendarContainer({ allEvents, holidayEvents, onYearChange }) {
  const combinedEvents = [...allEvents, ...holidayEvents];
  return (
    <div>
      <nav>
        <button class="button">
          <Link to="/">Home</Link>
        </button>
        <button class="button">
          <Link to="/MonthlyCal">Monthly Calendar</Link>
        </button>
        <button class="button">
          <Link to="/WeeklyCal">Weekly Calendar</Link>
        </button>
        <button class="button">
          <Link to="/DailyCal">Daily Calendar</Link>
        </button>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route
          path="/MonthlyCal"
          element={
            <MonthlyCal events={combinedEvents} onYearChange={onYearChange} />
          }></Route>
        <Route
          path="/WeeklyCal"
          element={
            <WeeklyCal events={combinedEvents} onYearChange={onYearChange} />
          }></Route>
        <Route
          path="/DailyCal"
          element={
            <DailyCal events={combinedEvents} onYearChange={onYearChange} />
          }></Route>
        <Route path="/ContactsList" element={<ContactsList />}></Route>
      </Routes>
    </div>
  );
}

export default CalendarContainer;
