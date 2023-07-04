import React, { Component } from 'react';
import HeroSection from './HeroSection/HeroSection';
import Section from './Section/Section';
import ContactsList from './ContactsList/ContactsList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  handleAddContact = newContact => {
    const { contacts } = this.state;
    const existingContact = contacts.find(
      contact =>
        contact.name.toLowerCase() === newContact.name.toLowerCase() ||
        contact.number === newContact.number
    );

    if (existingContact) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );

    return (
      <div className={css.phonebook}>
        <HeroSection herotitle="Phonebook">
          <ContactForm handleAddContact={this.handleAddContact} />
        </HeroSection>
        <Section title="Contacts">
          {contacts.length > 0 ? (
            <>
              <Filter
                filter={filter}
                handleFilterChange={this.handleFilterChange}
              />
              <ContactsList
                contacts={filteredContacts}
                handleDeleteContact={this.handleDeleteContact}
              />
            </>
          ) : (
            <p className={css.noCont}>No saved contacts!</p>
          )}
        </Section>
      </div>
    );
  }
}

export default App;
