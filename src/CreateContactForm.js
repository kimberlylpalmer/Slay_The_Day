import React, { useState } from "react";
const contactsAPI = "http://localhost:3000/contacts"

function CreateContactForm({contacts, handleAddContacts}) {
   
    const [newContact, setNewContact] = useState({name: '', phone: '', email: '', address: ''})
   
    return (
        <div>

        </div>
    )
}

export default CreateContactForm;