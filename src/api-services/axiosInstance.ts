    // services/axiosInstance.ts
import axios from 'axios';

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/', // Change this to your API base URL
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers here, such as authorization tokens if needed
  },
});

export default axiosInstance;
