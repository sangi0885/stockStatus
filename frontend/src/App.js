// src/App.js
import React from 'react';
import AuthProvider from './context/AuthProvider';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';

const AppContent = () => {
  const token = localStorage.getItem('token');
  return token ? <DashboardPage /> : <LoginPage />;
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);
export default App;
