import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../api/api';

const Manager = () => {
  const userRole = localStorage.getItem('userRole');
  const [data, setData] = useState([]);
  if (!userRole) {
    localStorage.clear();
  }
  if (userRole === '1') {
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllUsers();
      if (response.data.msg === 'success') {
        setData(response.data.users);
      }
      console.log(response);
      setData(response.data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.roleId}</td>
                <td>{user.isActive ? 'Active' : 'Disabled'}</td>
                <td>Actions </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manager;
