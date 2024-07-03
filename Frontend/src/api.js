import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001', // Your backend API URL
});

// Add a request interceptor
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.response && error.response.status === 401) {
            // Handle 401 errors (unauthorized)
            // For example, redirect to the login page
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
