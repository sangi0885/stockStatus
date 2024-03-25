import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:8080/'
});

export const login = credentials => API.post('api/user/signin', credentials);
export const getAllUsers = () => API.get('api/users/');
