import { useState, useEffect } from 'react';
import api from '../utils/axios.interceptor';

export const useFetchBook = (bookId) => {
  const [book, setBook] = useState({});

  useEffect(() => {
    (async () => {
      api
        .get(`/api/book/${bookId}`)
        .then((response) => setBook(response.data.data))
        .catch((error) => console.warn(error));
    })();
  }, [bookId]);

  return book;
};
