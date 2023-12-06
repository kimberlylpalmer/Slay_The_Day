import './App.css';
import React, {useEffect, useState} from "react";
import Header from "./Header";
import CalendarContainer from "./CalendarContainer";
import Footer from "./Footer";

const eventsAPI = "http://localhost:3000/appointments"
const contactsAPI = "http://localhost:3000/contacts"

function App() {
  const [contacts, setContacts] = useState([])
  const [allEvents, setAllEvents] = useState([])

  useEffect(() => {
    fetch(eventsAPI)
    .then(res => res.json())
    .then(setAllEvents)
  }, [])


  useEffect(() => {
    fetch(contactsAPI)
    .then(res => res.json())
    .then(setContacts)
  }, [])
  
  function handleAddEvent(newEvent) {
      setAllEvents([...allEvents, newEvent])
  }

  function handleAddContact(newContact) {
    setContacts([...contacts, newContact])
  }

  return (
    <div className="App">
      <Header handleAddEvent={handleAddEvent}/>
      <CalendarContainer allEvents={allEvents} />
      <Footer contacts={contacts} handleAddContact={handleAddContact}/>    
    </div>
  );
}

export default App;
