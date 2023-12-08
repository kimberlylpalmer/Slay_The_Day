import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "../MonthlyCal.css";
import "../style.css";
import { id } from "date-fns/locale";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function MonthlyCal({ events, onYearChange, removeElement }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [previousYear, setPreviousYear] = useState(currentDate.getFullYear());

  useEffect(() => {
    const newYear = currentDate.getFullYear();
    if (newYear !== previousYear) {
      console.log("testing changing year in month to: ", newYear);
      onYearChange(newYear);
      setPreviousYear(newYear);
    }
  }, [currentDate, previousYear, onYearChange]);

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  const [selectedEvent, setSelectedEvent] = useState(undefined);
  const [modalState, setModalState] = useState(false);

  const handleSelectedEvent = (event) => {
    setSelectedEvent(event);
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  function handleDelete() {
    fetch(`http://localhost:3000/appointments/${selectedEvent.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    })
      .then((res) => res.json())
      .then(() => {
        removeElement(selectedEvent.id);
        closeModal();
      });
  }

  const Modal = () => {
    return (
      <>
        {modalState && (
          <div className="modal-wrapper">
            <div
              className={`modal-${
                modalState == true ? "show" : "hide"
              } apt-modal`}>
              <button onClick={closeModal} class="button">
                Close
              </button>
              <h3>{selectedEvent.title}</h3>
              <p>
                Starts {selectedEvent.start.toDateString()}{" "}
                {selectedEvent.start.toLocaleTimeString()}
              </p>
              <p>
                Ends {selectedEvent.end.toDateString()}{" "}
                {selectedEvent.end.toLocaleTimeString()}{" "}
              </p>
              {selectedEvent.contact && (
                <a href={`http://localhost:3001/ContactsList/`}>
                  Contacts: {selectedEvent.contact}{" "}
                </a>
              )}
              <p> </p>
              <button className="button" onClick={handleDelete}>
                Delete Event
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      {selectedEvent && <Modal />}
      <Calendar
        localizer={localizer}
        events={events}
        views={{ month: true, week: false, day: false, agenda: false }}
        startAccessor="start"
        endAccessor="end"
        allDayAccessor="allDay"
        style={{ height: 500, margin: "50 px" }}
        onNavigate={handleNavigate}
        date={currentDate}
        onSelectEvent={(e) => handleSelectedEvent(e)}
      />
    </div>
  );
}

export default MonthlyCal;
