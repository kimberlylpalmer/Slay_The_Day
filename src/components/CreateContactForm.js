import React, { useState } from "react";
import "../style.css";

const contactsAPI = "http://localhost:3000/contacts";

function CreateContactForm({ handleAddContacts }) {
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    fetch(contactsAPI, {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(newContact),
    })
      .then((res) => res.json())
      .then(handleAddContacts);
    e.target.reset();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add Name"
          style={{ width: "20%", marginRight: "10px" }}
          value={newContact.name}
          onChange={(e) =>
            setNewContact({ ...newContact, name: e.target.value })
          }
        />
        <input
          placeholder="Add Phone Number"
          style={{ marginRight: "10px" }}
          selected={newContact.phone}
          onChange={(e) =>
            setNewContact({ ...newContact, phone: e.target.value })
          }
        />
        <input
          placeholder="Add Email"
          style={{ marginRight: "10px" }}
          selected={newContact.email}
          onChange={(e) =>
            setNewContact({ ...newContact, email: e.target.value })
          }
        />
        <input
          placeholder="Add Address"
          style={{ marginRight: "10px" }}
          selected={newContact.address}
          onChange={(e) =>
            setNewContact({ ...newContact, address: e.target.value })
          }
        />
        <button style={{ marginTop: "10px" }} type="submit">
          Add Contact
        </button>
      </form>
    </div>
  );
}

export default CreateContactForm;
