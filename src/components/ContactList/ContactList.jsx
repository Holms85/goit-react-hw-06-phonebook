import React from 'react';
import PropTypes from 'prop-types';
import ContactItem from 'components/ContactItem/ContactItem';
import { useSelector } from 'react-redux';
import { getContacts, getFilteredContact } from 'Redux/contactSlice';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilteredContact);

  const getVisibleContact = () => {
    const normalizedfilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedfilter)
    );
  };
  return (
    <ul>
      {getVisibleContact().map(({ name, number, id }) => (
        <ContactItem key={id} name={name} id={id} number={number} />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
