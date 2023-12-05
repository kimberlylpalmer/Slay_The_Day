import React, { useEffect, useState } from "react";
import MonthlyCal from "./MonthlyCal";
import WeeklyCal from "./WeeklyCal";
import DailyCal from "./DailyCal";
import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns-tz";

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

const holidaysAPI = "https://date.nager.at/api/v3/PublicHolidays/2023/US";

function CalendarContainer({allEvents}) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(holidaysAPI)
      .then((r) => r.json())
      .then((data) => {
        const formattedEvents = data
          .map((holiday) => {
            const event = {
              title: holiday.name,
              start: holiday.date,
              end: holiday.date,
            };
            return convertEventDatesToTimeZone(event);
          })
          .filter((e) => e !== null);
        console.log(formattedEvents);
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
