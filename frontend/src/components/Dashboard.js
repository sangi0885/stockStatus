import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../context/PermissionContext';
import Admin from './Admin';

const Dashboard = () => {
  const { permissions } = usePermissions();
  localStorage.setItem('userRole', 'Admin');
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();

  console.log('Permissions:', permissions, userRole);

  // Redirect to login page if not logged in
  if (!userRole) {
    navigate('/login');
  }

  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>
      <h2>Welcome</h2>
      <div>
        {userRole === 'Admin' && <Admin />}
        {userRole === 'Manager' && (
          <div>
            <h3>Reports</h3>
            {/* Reports component or logic here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
