import React, { useEffect, useState } from "react";
import ContactCard from "./ContactCard";

const contactsAPI = "http://localhost:3000/contacts"

function ContactsList() {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        fetch(contactsAPI)
        .then(res=>res.json())
        .then(setContacts)
    }, [])

    return (
        <div>
            {contacts.map((contact) => 
            <ContactCard key={contact.id} contact={contact} />)}
        </div>
    )
}

export default ContactsList;