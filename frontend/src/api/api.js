import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:8080/'
});

export const login = credentials => API.post('api/user/signin', credentials);
export const getActiveUsers = () => API.get('api/user/getactiveusers');
export const getAllUsers = () => API.get('api/user/getusers');
export const signup = credentials => API.post('api/user/signup', credentials);
export const updateUser = user => API.put('api/user/update', user);
export const signout = () => API.post('api/user/signout');
export const getUser = () => API.get('api/user/getuser');
export const signin = async credentials =>
  await API.post('api/user/signin', { username: credentials });
