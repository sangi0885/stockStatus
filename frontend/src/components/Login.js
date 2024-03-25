import React, { useState } from 'react';
import { login } from '../api/api';

const Login = ({ onLoginSuccess }) => {
  const [isAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.role);
      isAuthenticated = true;
      onLoginSuccess(response.data.role); // Pass the role for redirection
    } catch (error) {
      setError('Failed to login. Please check your username and password.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="email"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
