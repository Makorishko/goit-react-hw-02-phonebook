import { ContactForm } from './form/form';
import { Filter } from './filter';
import { Component } from 'react';
import { ContactList } from './list/list';
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
      return alert('This name already exist');
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  changeFilter = evt => {
    this.setState({
      filters: evt.target.value,
    });
  };

  deleteElementsOfList = contact => {
    this.setState({
      contacts: this.state.contacts.filter(item => item.id !== contact.id),
    });
  };

  getFilteredList = () => {
    return this.state.contacts.filter(item =>
      item.name.toLowerCase().includes(this.state.filters.toLowerCase())
    );
  };

  render() {
    const filteredList = this.getFilteredList();

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
