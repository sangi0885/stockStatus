import React, { useEffect, useState } from 'react';
import { getAllUsers, signin } from '../api/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [state, setState] = useState({
    user: {},
    loading: false,
    userList: []
  });

  const changeState = updatedState => {
    setState(prevState => ({ ...prevState, ...updatedState }));
  };

  const [credentials, setCredentials] = useState('');

  const [error, setError] = useState('');

  const handleChange = e => {
    setCredentials(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUsers();
        if (response.status === 200) {
          const data = response.data.userList;
          changeState({ userList: data });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    if (!state.loading) {
      changeState({ loading: true });
      try {
        const response = await signin(credentials);
        if (response.data.msg === 'success') {
          localStorage.setItem('userRole', response.data.role);
          localStorage.setItem('name', response.data.name);
          login();
        } else {
          setError(`Failed to login. ${response.data.error}`);
        }
      } catch (error) {
        setError(`Failed to login. ${error}`);
      } finally {
        changeState({ loading: false });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Data Loaded from API</h1>
        <select value={credentials} onChange={handleChange}>
          <option value="">Please choose how you want to login?</option>
          {state.userList.map(item => (
            <option key={item.username}>{item.username}</option>
          ))}
        </select>
        <button type="submit" disabled={state.loading}>
          Login
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
