import React from 'react';
import classes from './CartList.module.css';
import CartListItem from './CartListItem';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/formatCurrency';
import { useFetchBooks } from '../../hooks/useFetchBooks';
import { Link } from 'react-router-dom';

const CartList = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const books = useFetchBooks();

  return (
    <div className={classes.container}>
      {cartItems.length === 0 ? (
        <div className={classes.message}>
          <h2>Brak przedmiotów w koszyku.</h2>
          <Link to='/'>
            <button
              className={classes.btn}
              onClick={() => console.log('works')}
            >
              &larr; Wróć do sklepu
            </button>
          </Link>
        </div>
      ) : (
        <>
          <h2>Podsumowanie:</h2>
          {cartItems.map((cartItem) => (
            <CartListItem key={cartItem.id} {...cartItem} />
          ))}
          <div className={classes.total}>
            Razem:{` `}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = books.find((item) => item.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
          <div className={classes.message}>
            <Link to='/order'>
              <button
                onClick={() => console.log(cartItems)}
                className={classes.btn}
              >
                Dalej &rarr;
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartList;
