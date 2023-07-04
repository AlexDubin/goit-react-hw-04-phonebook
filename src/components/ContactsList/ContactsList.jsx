import React from 'react';
import PropTypes from 'prop-types';
import { FaPhone } from 'react-icons/fa';
import css from './ContactsList.module.css';

const ContactsList = ({ contacts, handleDeleteContact }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id} className={css.item}>
          <p>
            <FaPhone /> - {contact.name}: {formatPhoneNumber(contact.number)}
          </p>
          <button
            className={css.btnx}
            onClick={() => handleDeleteContact(contact.id)}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDeleteContact: PropTypes.func.isRequired,
};

export default ContactsList;

function formatPhoneNumber(phoneNumber) {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return match[1] + '-' + match[2] + '-' + match[3];
  }
  return phoneNumber;
}
