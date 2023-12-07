import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "../style.css";
const eventsAPI = "http://localhost:3000/appointments";

function AddEventForm({ handleAddEvent }) {
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    contact: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    fetch(eventsAPI, {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        handleAddEvent(data);
        setNewEvent({ title: "", start: "", end: "", contact: "" });
      });
  }

  return (
    <div>
      <form class="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
          showTimeSelect
          timeIntervals={10}
        />
        <DatePicker
          placeholderText="End Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
          showTimeSelect
          timeIntervals={10}
        />
        <input
          type="text"
          placeholder="Add Contact"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.contact}
          onChange={(e) =>
            setNewEvent({ ...newEvent, contact: e.target.value })
          }
        />
        <button style={{ marginTop: "10px" }} type="submit">
          Add Event
        </button>
      </form>
    </div>
  );
}

export default AddEventForm;
