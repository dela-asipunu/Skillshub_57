import axios from 'axios';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Add request interceptor to check token expiration and refresh it
axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  // Check if the token is expired using a simple time check
  const tokenData = JSON.parse(localStorage.getItem('tokenData') || '{}');
  if (tokenData?.exp && tokenData.exp * 1000 < Date.now()) {
    try {
      // Refresh the token
      const response = await axios.post('/api/token/refresh/', { refresh: refreshToken });
      localStorage.setItem('access_token', response.data.access);
      config.headers.Authorization = `Bearer ${response.data.access}`;
    } catch (error) {
      console.error('Failed to refresh token', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/';
    }
  }

  return config;
}, (error) => Promise.reject(error));


export default axiosInstance;