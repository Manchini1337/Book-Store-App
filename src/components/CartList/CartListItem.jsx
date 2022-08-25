import React from 'react';
import classes from './CartListItem.module.css';
import { useDispatch } from 'react-redux';
import { useFetchBook } from '../../hooks/useFetchBook';
import { cartActions } from '../../store/cartslice';
import { formatCurrency } from '../../utils/formatCurrency';

const CartListItem = ({ id, quantity }) => {
  const dispatch = useDispatch();
  const book = useFetchBook(id);
  if (book == null) return null;

  return (
    <div className={classes.container}>
      <img src={book.cover_url} alt={book.title} />
      <div className={classes.title}>
        <div>
          {book.title}
          {quantity > 1 && (
            <span className={classes.quantity}>x{quantity}</span>
          )}
        </div>
        <div className={classes.pricing}>{formatCurrency(book.price)}</div>
      </div>
      <div className={classes.fullPrice}>
        {formatCurrency(book.price * quantity)}
      </div>
      <button
        className={classes.btn__remove}
        onClick={() => dispatch(cartActions.removeFromCart(book.id))}
      >
        &times;
      </button>
    </div>
  );
};

export default CartListItem;
