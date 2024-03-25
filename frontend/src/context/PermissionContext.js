import React, { useContext, useState } from 'react';

const PermissionContext = React.createContext({
  permissions: [],
  updatePermissions: () => {}
});

export const usePermissions = () => useContext(PermissionContext);

// Provider component
const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);

  const updatePermissions = newPermissions => setPermissions(newPermissions);

  return (
    <PermissionContext.Provider value={{ permissions, updatePermissions }}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;
