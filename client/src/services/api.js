import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(err.response?.data?.message || 'API Error');
    return Promise.reject(err);
  }
);

export default API;
