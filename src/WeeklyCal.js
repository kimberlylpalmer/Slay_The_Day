import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";

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

function customToolBar(toolbar) {
  const goToBack = () => {
    toolbar.date.setHours(0, 0, 0, 0);
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.date.setHours(0, 0, 0, 0);
    toolbar.onNavigate("NEXT");
  };

  return (
    <div>
      <button onClick={goToBack}>{"<"}</button>
      <span>{format(toolbar.date, "MMMM yyyy")}</span>
      <button onClick={goToNext}>{">"}</button>
    </div>
  );
}

function WeeklyCal({ events }) {
  const minTime = new Date();
  minTime.setHours(6, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(20, 0, 0);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={{ week: true, agenda: true }}
        components={{
          event: Event,
          toolbar: customToolBar,
        }}
        showMultiDayTimes={false}
        dayLayoutAlgorithm="no-overlap"
        min={minTime}
        max={maxTime}
      />
    </div>
  );
}

export default WeeklyCal;
