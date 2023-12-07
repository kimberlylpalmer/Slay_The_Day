import React, { useState } from "react";
import ContactsList from "./ContactsList";
import CreateContactForm from "./CreateContactForm";
import { Link } from "react-router-dom";
import "../style.css";

function Footer({ contacts, handleAddContact }) {
  const [showForm, setShowForm] = useState(false);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <div>
      <nav>
        <button class="button">
          <Link to={"/ContactsList"}>Contacts List</Link>
        </button>
      </nav>
      {showForm ? (
        <CreateContactForm
          contacts={contacts}
          handleAddContact={handleAddContact}
        />
      ) : null}
      <button onClick={handleClick} class="button">
        Add Contact
      </button>
    </div>
  );
}

export default Footer;
