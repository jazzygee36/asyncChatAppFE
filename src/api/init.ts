import axios from 'axios';

export const getFromLocalStorage = (key: string) => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(key);
};

export const apiClient = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: `https://etransact.vercel.app/api/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Interceptor to dynamically set the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const token = getFromLocalStorage('token'); // Get token before each request
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
