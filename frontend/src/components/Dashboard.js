import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../context/PermissionContext';

const Dashboard = () => {
  //const { logout, isAuthenticated } = useAuth();
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
        {userRole === 'Admin' && (
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-auto">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        {userRole === 'Manager' && (
          <div>
            <h3>Reports</h3>
            {/* Reports component or logic here */}
          </div>
        )}
        {/* Add more sections as needed based on permissions */}
      </div>
    </div>
  );
};

export default Dashboard;
