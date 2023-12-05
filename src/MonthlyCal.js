import React, {useState} from "react";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay"
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css"

const locales = {
    "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

// const events = [
//     {
//         title: "Big Meeting",
//         start: new Date(2023,12,0),
//         end: new Date(2023,12,0)
//     },
//     {
//         title: "Vacation",
//         start: new Date(2023,12,7),
//         end: new Date(2023,12,10)
//     },
//     {
//         title: "Conference",
//         start: new Date(2023,12,20),
//         end: new Date(2023,12,23)
//     }
// ]


function MonthlyCal({allEvents}) {

    return (
            <div> 
           
            <Calendar 
                localizer={localizer} 
                events={allEvents} 
                startAccessor="start" 
                endAccessor="end" 
                style={{height: 500, margin: "50 px"}} />
        </div>
    )
}

export default MonthlyCal;