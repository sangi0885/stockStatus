import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveUsers, signin } from '../api/api';

const Login = () => {
  const [state, setState] = useState({
    user: {},
    loading: false,
    userList: []
  });

  const [user, setUser] = useState();

  const navigate = useNavigate();

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
        const response = await getActiveUsers();
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
    //if (!state.loading) {
    changeState({ loading: true });
    try {
      const response = await signin(credentials);

      console.log('Login response: before', response);
      if (response) {
        localStorage.setItem('userRole', response.role);
        localStorage.setItem('name', response.name);
        console.log('Login response:', response);
        navigate('/dashboard');
      }
    } catch (error) {
      setError(`Failed to login here. ${error}`);
    } finally {
      changeState({ loading: false });
    }
    // }
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
