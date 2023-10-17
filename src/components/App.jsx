import { ContactForm } from './form';
import { Filter } from './filter';
import { Component } from 'react';
import { ContactList } from './list';
import { Wrapper } from './wrapper-styled';

export class App extends Component {
  state = {
    contacts: [],
    filters: '',
  };

  addContact = newContact => {
    const isSame = this.state.contacts.find(
      contact => contact.name === newContact.name
    );

    if (isSame) {
      alert('This name already exist');
    } else {
      this.setState(prevState => ({
        ...prevState,
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  changeFilter = evt => {
    this.setState(prevState => ({
      ...prevState,
      filters: evt.target.value,
    }));
  };

  deleteElementsOfList = contact => {
    console.log(contact);

    const newContactList = this.state.contacts.filter(
      item => item.id !== contact.id
    );
    console.log(newContactList);

    this.setState(prevState => ({
      ...prevState,
      contacts: newContactList,
    }));
  };

  render() {
    console.log(this.state);

    const filteredList = this.state.contacts.filter(item =>
      item.name.toLowerCase().includes(this.state.filters.toLowerCase())
    );

    return (
      <Wrapper>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter changeFilter={this.changeFilter} />
        <ContactList
          contacts={filteredList}
          deleteElementsOfList={this.deleteElementsOfList}
        />
      </Wrapper>
    );
  }
}
