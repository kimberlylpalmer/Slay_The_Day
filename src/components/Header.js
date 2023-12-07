import AddEventForm from "./AddEventForm";
import React, { useState } from "react";
import "../style.css";

export default function Header({ handleAddEvent }) {
  const [showForm, setShowForm] = useState(false);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <div id="header-container">
      <h1 id="header1">
        <span className="title-word" style={{ annimationDelay: "1s" }}>
          Slay
        </span>
        <span className="title-word" style={{ annimationDelay: "3s" }}>
          The
        </span>
        <span className="title-word" style={{ annimationDelay: "5s" }}>
          Day
        </span>
      </h1>
      <h2 id="header2">What will you do today?</h2>
      {showForm ? <AddEventForm handleAddEvent={handleAddEvent} /> : null}
      <button onClick={handleClick} class="button">
        Add Event Form
      </button>
    </div>
  );
}
