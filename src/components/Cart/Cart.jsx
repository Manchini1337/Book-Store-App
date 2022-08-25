import React from 'react';
import classes from './Cart.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useFetchBooks } from '../../hooks/useFetchBooks';
import { formatCurrency } from '../../utils/formatCurrency';
import { cartActions } from '../../store/cartslice';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const books = useFetchBooks();
  const isCartVisible = useSelector((state) => state.cart.cartIsVisible);
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <>
      <div
        className={isCartVisible ? classes.overlay : classes.overlay__inactive}
        onClick={() => dispatch(cartActions.toggleCart())}
      ></div>
      <div
        className={`${classes.container} ${
          isCartVisible ? classes.active : ''
        }`}
      >
        <div className={classes.header}>
          <h2>Koszyk</h2>
          <button
            className={classes.btn}
            onClick={() => dispatch(cartActions.toggleCart())}
          >
            x
          </button>
        </div>
        <div className={classes.body}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className={classes.summary}>
            {cartItems.length > 0 && (
              <Link to='/cart'>
                <button
                  onClick={() => dispatch(cartActions.toggleCart())}
                  className={classes.btnSummary}
                >
                  Podsumowanie &rarr;
                </button>
              </Link>
            )}
            <div className={classes.total}>
              Razem:{` `}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = books.find((item) => item.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
