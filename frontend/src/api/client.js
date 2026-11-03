import axios from 'axios';
export const api = axios.create({ baseURL: '/api', timeout: 60000 });
export const errorMessage = (error) =>
  error.response?.data?.error ||
  (error.code === 'ECONNABORTED'
    ? 'The request timed out. Check history before retrying the upload.'
    : 'Cannot reach the API. Check that Express and MongoDB are running.');
