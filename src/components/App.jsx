import { useState, useEffect } from 'react';
import HeroSection from './HeroSection/HeroSection';
import Section from './Section/Section';
import ContactsList from './ContactsList/ContactsList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = window.localStorage.getItem('contacts');

    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleAddContact = (newContact) => {
    const existingContact = contacts.find(
      (contact) =>
        contact.name.toLowerCase() === newContact.name.toLowerCase() ||
        contact.number === newContact.number
    );

    if (existingContact) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      setContacts((prevContacts) => [...prevContacts, newContact]);
    }
  };

  const handleDeleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
  );

  return (
    <div className={css.phonebook}>
      <HeroSection herotitle="Phonebook">
        <ContactForm handleAddContact={handleAddContact} />
      </HeroSection>
      <Section title="Contacts">
        {contacts.length > 0 ? (
          <>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <ContactsList
              contacts={filteredContacts}
              handleDeleteContact={handleDeleteContact}
            />
          </>
        ) : (
          <p className={css.noCont}>No saved contacts!</p>
        )}
      </Section>
    </div>
  );
};

export default App;
