import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

export const ContactForm = ({ handleAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === '' || number.trim() === '') {
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setName('');
    setNumber('');
    handleAddContact(newContact);
  };

  const isFormIncomplete = name.trim() === '' || number.trim() === '';

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="nameInput">Name</label>
      <input
        type="text"
        id="nameInput"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleNameChange}
        placeholder="Name"
      />
      <label htmlFor="numberInput">Telephone</label>
      <input
        type="tel"
        id="numberInput"
        name="number"
        pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleNumberChange}
        placeholder="Telephone"
      />
      <button
        className={css.btnadd}
        type="submit"
        disabled={isFormIncomplete}
      >
        Add Contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  handleAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
