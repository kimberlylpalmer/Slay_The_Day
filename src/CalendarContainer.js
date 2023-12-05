import React, { useEffect, useState } from "react";
import MonthlyCal from "./MonthlyCal";
import WeeklyCal from "./WeeklyCal";
import DailyCal from "./DailyCal";

const holidaysAPI = "https://date.nager.at/api/v3/PublicHolidays/2023/US";

function CalendarContainer({allEvents}) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(holidaysAPI)
      .then((r) => r.json())
      .then((data) => {
        const formattedEvents = data.map((holiday) => ({
          title: holiday.name,
          start: new Date(holiday.date),
          end: new Date(holiday.date),
        }));
        setEvents(formattedEvents);
      });
  }, []);

  return (
    <div>
      <MonthlyCal allEvents={allEvents}/>
      <WeeklyCal events={events} />
      <DailyCal />
    </div>
  );
}

export default CalendarContainer;
