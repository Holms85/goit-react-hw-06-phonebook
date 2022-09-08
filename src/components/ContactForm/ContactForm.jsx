import { useState } from 'react';
import { nanoid } from 'nanoid';
import style from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts, getContacts } from 'Redux/contactSlice';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const reset = () => {
    setName('');
    setNumber('');
  };

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

  const handlerSubmit = e => {
    e.preventDefault();
    upgradeContacts({ name, number });
    reset();
  };

  const handlerChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  return (
    <form className={style.form} onSubmit={handlerSubmit}>
      <label className={style.label}>
        Name
        <input
          className={style.input}
          type="text"
          onChange={handlerChange}
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label className={style.label}>
        Number
        <input
          className={style.input}
          type="tel"
          onChange={handlerChange}
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button className={style.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}
