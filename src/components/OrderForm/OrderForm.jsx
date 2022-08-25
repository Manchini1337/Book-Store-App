import React, { useState, useEffect, useRef, useMemo } from 'react';
import classes from './OrderForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../utils/axios.interceptor';
import { cartActions } from '../../store/cartslice';
import Redirect from '../Redirect/Redirect';

const OrderForm = () => {
  const emptyForm = useMemo(
    () => ({
      order: [],
      first_name: '',
      last_name: '',
      city: '',
      zip_code: '',
    }),
    []
  );

  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState(emptyForm);
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    formRef.current.classList.add(`${classes.active}`);
  }, []);

  useEffect(() => {
    setFormData({ ...emptyForm, order: cartItems });
  }, [emptyForm, cartItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/order', {
        order: formData.order,
        first_name: formData.first_name,
        last_name: formData.last_name,
        city: formData.city,
        zip_code: formData.zip_code,
      });
      if (response.status === 201) {
        setFormData(emptyForm);
        dispatch(cartActions.resetCart());
        setFormSubmitted(true);
      }
    } catch (error) {
      setErrorMessage(error.response.data.error.message);
    }
  };

  if (formSubmitted) return <Redirect>Pomyślnie złożono zamówienie.</Redirect>;

  return (
    <div className={classes.container}>
      <form className={classes.form} ref={formRef} onSubmit={handleSubmit}>
        {cartItems.length === 0 ? (
          <Redirect>Koszyk jest pusty!</Redirect>
        ) : (
          <>
            <h2 className={classes.title}>Złóż zamówienie</h2>
            <div className={classes.form__group}>
              <label htmlFor='firstname'>Imię:</label>
              <div className={classes.input__group}>
                <input
                  type='text'
                  required
                  pattern='.{4,}'
                  id='firstname'
                  name='firstname'
                  placeholder='Imię'
                  onChange={(e) => {
                    setFormData({ ...formData, first_name: e.target.value });
                    setErrorMessage('');
                  }}
                  value={formData.first_name}
                />
                <i className='bx bx-user' />
              </div>
            </div>

            <div className={classes.form__group}>
              <label htmlFor='lastname'>Nazwisko:</label>
              <div className={classes.input__group}>
                <input
                  type='text'
                  required
                  pattern='.{5,}'
                  id='lastname'
                  name='lastname'
                  placeholder='Nazwisko'
                  onChange={(e) => {
                    setFormData({ ...formData, last_name: e.target.value });
                    setErrorMessage('');
                  }}
                  value={formData.last_name}
                />
                <i className='bx bx-user' />
              </div>
            </div>

            <div className={classes.form__group}>
              <label htmlFor='city'>Miejscowość:</label>
              <div className={classes.input__group}>
                <input
                  type='text'
                  required
                  pattern='.{3,}'
                  id='city'
                  name='city'
                  placeholder='Miejscowość'
                  onChange={(e) => {
                    setFormData({ ...formData, city: e.target.value });
                    setErrorMessage('');
                  }}
                  value={formData.city}
                />
                <i className='bx bx-user' />
              </div>
            </div>

            <div className={classes.form__group}>
              <label htmlFor='zip_code'>Kod pocztowy:</label>
              <div className={classes.input__group}>
                <input
                  type='text'
                  required
                  pattern='^\d{2}-\d{3}$'
                  id='zip_code'
                  name='zip_code'
                  placeholder='Kod pocztowy'
                  onChange={(e) => {
                    setFormData({ ...formData, zip_code: e.target.value });
                    setErrorMessage('');
                  }}
                  value={formData.zip_code}
                />
                <i className='bx bx-user' />
              </div>
              <span className={classes.help__text}>Format: XX-XXX</span>
            </div>
            <div className={classes.btn__group}>
              <button className={classes.btn}>ZAMAWIAM I PŁACĘ</button>
            </div>
            {errorMessage && <p className={classes.error}>{errorMessage}</p>}
          </>
        )}
      </form>
    </div>
  );
};

export default OrderForm;
