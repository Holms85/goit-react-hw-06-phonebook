import { nanoid } from 'nanoid';
import style from 'components/App.module.css';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import { useSelector, useDispatch } from 'react-redux';
import {
  addContacts,
  removeContact,
  filterContact,
  getContacts,
  getFilteredContact,
} from 'Redux/contactSlice';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilteredContact);

  const upgradeContacts = ({ name, number }) => {
    const contact = {
      name,
      number,
      id: nanoid(),
    };
    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already in contact`)
      : dispatch(addContacts(contact));
  };

  const deleteContact = contactId => dispatch(removeContact(contactId));

  const changeFilter = e => dispatch(filterContact(e.currentTarget.value));

  const getVisibleContact = () => {
    const normalizedfilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedfilter)
    );
  };

  return (
    <div>
      <h2 className={style.title}>Phonebook</h2>
      <ContactForm onSubmit={upgradeContacts} />
      <h3 className={style.title}>Contacts</h3>
      <Filter filter={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContact()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
