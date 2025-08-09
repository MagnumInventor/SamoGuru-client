// utils/axios.js
import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, // для cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// Інтерсептор для обробки помилок
API.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default API;