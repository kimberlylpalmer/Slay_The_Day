import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import addDays from "date-fns/addDays";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style.css";

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

const events = [
  {
    title: "Event 1",
    desc: "Description for Event 1",
    start: new Date(2023, 0, 1),
    end: new Date(2023, 0, 1),
  },
];

function Event({ event }) {
  if (!event) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <strong>{event.title}</strong>
      <p>{event.desc}</p>
    </div>
  );
}

function customToolBar(
  toolbar,
  currentDate,
  setCurrentDate,
  setShowDatePicker,
  showDatePicker
) {
  const goToBack = () => {
    const newDate = addDays(currentDate, -1);
    setCurrentDate(newDate);
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    const newDate = addDays(currentDate, 1);
    setCurrentDate(newDate);
    toolbar.onNavigate("NEXT");
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    toolbar.onNavigate("TODAY", today);
  };

  return (
    <div>
      <button onClick={goToToday} class="button">
        Today
      </button>
      <button onClick={goToBack} class="button">
        {"<"}
      </button>
      <span>{format(currentDate, "EEEE, MMMMdo, yyyy")}</span>
      <button onClick={goToNext} class="button">
        {">"}
      </button>
      <button onClick={() => setShowDatePicker(!showDatePicker)} class="button">
        Pick a date
      </button>
      {showDatePicker && (
        <DatePicker
          selected={currentDate}
          onChange={(date) => {
            setCurrentDate(date);
            toolbar.onNavigate("DATE", date);
            setShowDatePicker(false);
          }}
          inline
        />
      )}
    </div>
  );
}

function DailyCal({ events, onYearChange, removeElement }) {
  const minTime = new Date();
  minTime.setHours(6, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(20, 0, 0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [previousYear, setPreviousYear] = useState(currentDate.getFullYear());
  const today = new Date();

  useEffect(() => {
    const newYear = currentDate.getFullYear();
    if (newYear !== previousYear) {
      // console.log("changing year in daily to: ", newYear);
      onYearChange(newYear);
      setPreviousYear(newYear);
    }
  }, [currentDate, previousYear, onYearChange]);

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
              <h3 className="modal-header">{selectedEvent.title}</h3>
              <p>Starts {selectedEvent.start.toDateString()}</p>
              <p>Ends {selectedEvent.start.toDateString()}</p>
              {selectedEvent.contact && (
                <a href={`http://localhost:3001/ContactsList`}>
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
      <h2 className="daily-date">
        Today's Date: {format(today, "EEEE, MMMM do, yyyy")}{" "}
      </h2>
      <Calendar
        localizer={localizer}
        events={events}
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        defaultView="day"
        views={{ day: true, agenda: true }}
        components={{
          event: Event,
          toolbar: (toolbar) =>
            customToolBar(
              toolbar,
              currentDate,
              setCurrentDate,
              setShowDatePicker,
              showDatePicker
            ),
        }}
        showMultiDayTimes={false}
        dayLayoutAlgorithm="no-overlap"
        min={minTime}
        max={maxTime}
        onSelectEvent={(e) => handleSelectedEvent(e)}
      />
    </div>
  );
}

export default DailyCal;
