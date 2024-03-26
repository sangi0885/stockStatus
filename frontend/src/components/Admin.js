import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, updateUser } from '../api/api';
import Modalshow from './Modalshow';

const Admin = () => {
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

  const handleUpdateUser = async e => {
    e.preventDefault();
    if (!state.loading) {
      changeState({ loading: true });
      try {
        const response = await updateUser(credentials);
        if (response) {
          navigate('/dashboard');
        }
      } catch (error) {
        setError(`Failed to login here. ${error}`);
      } finally {
        changeState({ loading: false });
      }
    }
  };

  return (
    <div id="userTable">
      <h1>Data Loaded from API</h1>
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Permissions</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {state.userList.map((item, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.role}</td>
                      <td>{item.permissions}</td>
                      <td>{item.status}</td>
                      <td>
                        <Modalshow />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
