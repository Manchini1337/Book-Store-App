import axios from 'axios';

export default axios.create({
  baseURL: 'https://bookstore-task-api.herokuapp.com/',
  withCredentials: false,
});
