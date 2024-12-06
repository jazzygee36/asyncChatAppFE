import axios from 'axios';

export const getFromLocalStorage = (key: string) => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(key);
};

export const apiClient = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: `https://async-chat-app-be.vercel.app/api/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Interceptor to dynamically set the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const token = getFromLocalStorage('token');
    // Skip token check for login or public API calls
    const isPublicEndpoint =
      config.url?.includes('/login') || config.url?.includes('/register');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (!isPublicEndpoint) {
      console.warn('No token found. Skipping API call.');
      throw new axios.Cancel('No token available');
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle responses, including token errors
apiClient.interceptors.response.use(
  (response) => {
    // Return the response if successful
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login page if token is missing or invalid
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/'; // Adjust the route as per your application
      }
    }
    return Promise.reject(error);
  }
);
