import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AuthProvider from './context/AuthContext';
import PermissionProvider from './context/PermissionContext';

function App() {
  return (
    // <div>
    //   <Dashboard />
    // </div>
    <Router>
      <AuthProvider>
        <PermissionProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </PermissionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
