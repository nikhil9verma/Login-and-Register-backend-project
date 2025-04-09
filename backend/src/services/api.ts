import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // External API base URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include an access token if needed
api.interceptors.request.use(
  async (config) => {
    // Example: Use a token stored in memory or environment variables
    const token = process.env.ACCESS_TOKEN || 'l'; // Replace with your logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
