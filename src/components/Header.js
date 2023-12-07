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
      <h1 id="header1">Slay The Day</h1>
      <h2 id="header2">What will you do today?</h2>
      {showForm ? <AddEventForm handleAddEvent={handleAddEvent} /> : null}
      <button onClick={handleClick} class="button">
        Add an Event!
      </button>
    </div>
  );
}
