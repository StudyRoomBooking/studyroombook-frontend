import axios from 'axios';

// Set headers
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'Access-Control-Allow-Origin': 'true',
    // 'Access-Control-Allow-Credentials': 'true',
    // 'Access-Control-Allow-Headers': '*'
};

console.log("AXIOS", process.env.NEXT_PUBLIC_API_BASE_URL);

// Create axios instance
const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000, // 1000ms
    headers: headers,
    // withCredentials: true,
    withCredentials: false,
});

import { formatISO, parseISO } from 'date-fns';

// Function to convert date fields specifically named "date" to UTC
function convertDateFieldsToUTC(obj) {
    Object.keys(obj).forEach(key => {
        if (key === "date" && typeof obj[key] === 'string') {
            try {
                // const parsedDate = parseISO(obj[key]);
                // obj[key] = formatISO(parsedDate, { representation: 'complete' });

                // obj[key] must be in what format


                // Use YYYY-MM-DD format
                const parsedDate = parseISO(obj[key]);
                obj[key] = format(parsedDate, 'yyyy-MM-dd');
                console.log(obj[key]);

            } catch (error) {
                console.error('Failed to convert date:', obj[key], error);
            }
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            convertDateFieldsToUTC(obj[key]); // Recursively handle nested objects
        }
    });
}


// Add interceptor to do something before request is sent
instance.interceptors.request.use(
    config => {
        const { data } = config;
        // convertDateFieldsToUTC(data);
        if (data && typeof data === 'object') {
            // console.log("[intercepters request data before]", data);
            convertDateFieldsToUTC(data)
            // console.log("[intercepters request data after]", data);
        }

        // Apply Token
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
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