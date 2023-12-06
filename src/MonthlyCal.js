import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

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



function MonthlyCal({allEvents, events}) {

    return (
            <div> 
           
            <Calendar 
                localizer={localizer} 
                events={allEvents}
                views={ {month:true, week:false, day:false, agenda:false} }
                startAccessor="start" 
                endAccessor="end" 
                style={{height: 500, margin: "50 px"}} />
        </div>
    )

}

export default MonthlyCal;
