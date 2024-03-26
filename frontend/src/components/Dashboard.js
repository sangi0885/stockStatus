import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../context/PermissionContext';
import Admin from './Admin';
import Manager from './Manager';
import Painter from './Painter';

const Dashboard = () => {
  const { permissions } = usePermissions();
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();

  console.log('Permissions:', permissions, userRole);

  // Redirect to login page if not logged in
  if (!userRole) {
    navigate('/login');
  }

  return (
    <div className="container mt-5">
      <h2>Welcome {userRole}</h2>
      <div>
        {userRole === 'Admin' && <Admin />}
        {userRole === 'Manager' && <Manager />}
        {userRole === 'Painter' && <Painter />}
      </div>
    </div>
  );
};

export default Dashboard;
