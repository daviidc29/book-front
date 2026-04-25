export const getApiUrl = () => {
  try {
    return import.meta.env.VITE_API_URL || 'http://localhost:8080';
  } catch (e) {
    return 'http://localhost:8080';
  }
};

export const API_URL = getApiUrl();
