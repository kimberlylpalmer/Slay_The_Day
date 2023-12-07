import "../style.css";

function ContactCard({ contact }) {
  return (
    <div className="card">
      <h3 id="contact-name">{contact.name}</h3>
      <p className='contact-text'>{contact.phone}</p>
      <p className='contact-text'>{contact.email}</p>
      <p className='contact-text'>{contact.address}</p>
    </div>
  );
}

export default ContactCard;
