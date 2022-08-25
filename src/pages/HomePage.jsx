import React from 'react';
import BookList from '../components/BookList/BookList';
import { useFetchBooks } from '../hooks/useFetchBooks';

const HomePage = () => {
  const books = useFetchBooks();

  return <BookList books={books} />;
};

export default HomePage;
