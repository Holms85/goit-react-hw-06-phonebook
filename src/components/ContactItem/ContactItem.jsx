import style from './ContactItem.module.css';
import { useDispatch } from 'react-redux';
import { removeContact } from 'Redux/contactSlice';
function ContactItem({ id, name, number }) {
  const dispatch = useDispatch();

  return (
    <li key={id} className={style.item}>
      {name} : <span className={style.item}>{number}</span>
      <button
        type="button"
        className={style.button}
        onClick={() => {
          dispatch(removeContact(id));
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default ContactItem;
