import React from 'react';
import classes from './BookListItem.module.css';
import { formatCurrency } from '../../utils/formatCurrency';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartslice';

const BookListItem = ({ book }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const quantity = cartItems.find((item) => item.id === book.id)?.quantity || 0;

  return (
    <div className={classes.card}>
      <div className={classes.imgContainer}>
        <img src={book.cover_url} alt={book.title} />
      </div>
      <div className={classes.body}>
        <div className={classes.title}>
          <span className={classes.name}>{book.title}</span>
          <div className={classes.authors}>
            <span className={classes.name}>Autorzy:</span>
            <span className={classes.text}>{book.author}</span>
          </div>
          <div className={classes.details}>
            <span className={classes.text}>Ilość stron: {book.pages}</span>
            <span className={classes.text}>{formatCurrency(book.price)}</span>
          </div>
        </div>
        <div className={classes.action}>
          {quantity === 0 ? (
            <button
              className={classes.buttonWide}
              onClick={() =>
                dispatch(cartActions.increaseCartQuantity(book.id))
              }
            >
              DODAJ DO KOSZYKA
            </button>
          ) : (
            <div className={classes.btns}>
              <div className={classes.actionButtons}>
                <button
                  className={classes.btn}
                  onClick={() =>
                    dispatch(cartActions.decreaseCartQuantity(book.id))
                  }
                >
                  -
                </button>
                <div>
                  <span className={classes.quantity}>{quantity}</span> w koszyku
                </div>
                <button
                  className={classes.btn}
                  onClick={() =>
                    dispatch(cartActions.increaseCartQuantity(book.id))
                  }
                >
                  +
                </button>
              </div>
              <button
                className={classes.btn_danger}
                onClick={() => dispatch(cartActions.removeFromCart(book.id))}
              >
                Usuń
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookListItem;
