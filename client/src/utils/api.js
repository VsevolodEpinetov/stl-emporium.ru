import axios from 'axios';

const API_URL = 'https://api.stl-emporium.ru/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDataFromURI = async (URI) => {
  try {
    const response = await api.get(URI);
    return {
      miniatures: response.data?.data,
      meta: response.data?.meta,
    };
  } catch (error) {
    throw new Error('Failed to fetch data from URI.');
  }
};

export default api;