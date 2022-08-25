import { useEffect } from 'react';
import classes from './Redirect.module.css';

const Redirect = (props) => {
  useEffect(() => {
    setTimeout(function () {
      window.location.replace('/');
    }, 1000);
  }, []);
  return (
    <div className={classes.redirect}>
      <p>{props.children}</p>
      <p>Nastąpi przekierowanie...</p>
      <div className='lds-dual-ring'></div>
    </div>
  );
};

export default Redirect;
