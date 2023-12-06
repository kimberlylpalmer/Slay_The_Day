import React, {useState} from "react";
import ContactsList from "./ContactsList";
import CreateContactForm from "./CreateContactForm";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom"

function Footer ({contacts, handleAddContact}) {;

    const [showForm, setShowForm] = useState(false);

    function handleClick() {
        setShowForm((showForm) => !showForm);
      }

    return (
       
        <div>
             <Router>
                <nav>
                    <button>
                        <Link to={"/ContactsList"}>Contacts List</Link>
                    </button>
                </nav>
            </Router>
            {showForm? <CreateContactForm contacts={contacts} handleAddContact={handleAddContact}/> : null}
            <button onClick={handleClick}>Add Contact</button>
        </div>
        
        
    )
}

export default Footer;