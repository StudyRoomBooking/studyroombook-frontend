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
    // baseURL: 'http://localhost:3000/api',
    // baseURL: 'http://cloud.gutemorgan.com:9123/api', // 'http://localhost:8000/api
    baseURL: 'http://localhost:8000/api',
    timeout: 10000, // 1000ms
    headers: headers,
    // withCredentials: true,
    withCredentials: false,

});

// Add interceptor to do something before request is sent
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken")

        // console.log('token', token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    }
);

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