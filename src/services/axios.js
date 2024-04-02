import axios from 'axios';

// Set headers
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'Access-Control-Allow-Origin': 'true',
    // 'Access-Control-Allow-Credentials': 'true',
    // 'Access-Control-Allow-Headers': '*'

};

// Create axios instance
const instance = axios.create({
    // baseURL: 'http://localhost:8000/api',
    baseURL: 'http://cloud.gutemorgan.com:9123/api', // 'http://localhost:8000/api
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
            console.log('Unauthenticated');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Set authToken to cookies

export default instance;