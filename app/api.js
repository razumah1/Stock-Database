import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5328';
export const fetchData = async (route) => {
    const url = '${BASE_URL}/${route}';
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from ${url}:', error);
    throw error; // Propagate the error to the caller
  }
};