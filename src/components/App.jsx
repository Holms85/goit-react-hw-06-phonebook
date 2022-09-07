import style from 'components/App.module.css';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';

export default function App() {
  return (
    <div>
      <h2 className={style.title}>Phonebook</h2>
      <ContactForm />
      <h3 className={style.title}>Contacts</h3>
      <Filter />
      <ContactList />
    </div>
  );
}
