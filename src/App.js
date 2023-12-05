import './App.css';
import React, {useEffect, useState} from "react";
import Header from "./Header";
import CalendarContainer from "./CalendarContainer";

const eventsAPI = "http://localhost:3000/appointments"
console.log(eventsAPI)

function App() {

  const [allEvents, setAllEvents] = useState([])

  useEffect(() => {
    fetch(eventsAPI)
    .then(res => res.json())
    .then(setAllEvents)
  }, [])
  
  function handleAddEvent(newEvent) {
      setAllEvents([...allEvents, newEvent])
  }

  return (
    <div className="App">
      <Header handleAddEvent={handleAddEvent}/>
      <CalendarContainer allEvents={allEvents} />
    </div>
  );
}

export default App;
