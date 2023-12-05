import React, {useState} from "react";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay"
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker";

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

const events = "http://localhost:3000/events"


function MonthlyCal() {

    const [newEvent, setNewEvent] = useState({title: '', start: '', end: ''})
    const [allEvents, setAllEvents] = useState(events)

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent])
    }

    return (
            <div> 
            <h2>Add New Event</h2>
            <div>
                <input type='text' placeholder="Add Title" style={{width: "20%", marginRight: "10px"}}
                value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}/>
                <DatePicker placeholderText="Start Date" style={{marginRight: '10px'}} 
                 selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})}  />
                 <DatePicker placeholderText="End Date" style={{marginRight: '10px'}} 
                 selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})}  />
                 <button style={{marginTop: '10px'}} onClick={handleAddEvent}>Add Event</button>
            </div>
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