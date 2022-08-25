import React from 'react';
import classes from './BookList.module.css';
import BookListItem from '../BookListItem/BookListItem';
import { Link } from 'react-router-dom';

const BookList = ({ books }) => {
  return (
    <div className={classes.container}>
      {books.length === 0 ? (
        <h1 className={classes.loading}>Loading...</h1>
      ) : (
        <>
          <div className={classes.bookGrid}>
            {books.map((book) => (
              <BookListItem book={book} key={book.id}>
                {book.title}
              </BookListItem>
            ))}
          </div>
          <Link to='/cart'>
            <button className={classes.btn}>Zobacz koszyk &rarr;</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default BookList;
