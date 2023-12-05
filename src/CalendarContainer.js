import React, {useState} from "react";
import MonthlyCal from "./MonthlyCal"
import WeeklyCal from "./WeeklyCal"
import DailyCal from "./DailyCal"


function CalendarContainer () {
    return (
        <div> 
            <MonthlyCal />
            <WeeklyCal />
            <DailyCal />
        </div>
    )
}

export default CalendarContainer;