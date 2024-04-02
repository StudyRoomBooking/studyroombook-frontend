import axios from 'axios';

// Set headers
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'true',
};

// Create axios instance
const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 1000,
    headers: headers,
    withCredentials: true,
});

// Add interceptor to handle 401 response
instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Redirect to login page
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance;