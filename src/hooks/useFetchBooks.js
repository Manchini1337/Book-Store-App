import { useState, useEffect } from 'react';
import api from '../utils/axios.interceptor';

export const useFetchBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => {
      api
        .get('/api/book')
        .then((response) => setBooks(response.data.data))
        .catch((error) => console.warn(error));
    })();
  }, []);

  return books;
};
