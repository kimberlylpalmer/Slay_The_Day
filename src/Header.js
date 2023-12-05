import AddEventForm from "./AddEventForm";
import React, {useState} from "react";

export default function Header({handleAddEvent}) {
    const [showForm, setShowForm] = useState(false);

    function handleClick() {
        setShowForm((showForm) => !showForm);
      }

  return (
    
    <div id="header" style={{ backgroundColor: "#0D411E", color: "white" }}>
      <h1>Slay The Day</h1>
      <h2>What will you do today?</h2>
      {showForm? <AddEventForm handleAddEvent={handleAddEvent} /> :null}
      <button onClick={handleClick}>Add an Event!</button>
    </div>
  );
}
