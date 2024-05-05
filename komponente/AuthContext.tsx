import React, { createContext, useContext, useState } from 'react';


type UserRole = 'admin' | 'user';


const AuthContext = createContext<{
  userRole: UserRole;
  toggleUserRole: () => void;
}>({
  userRole: 'user',
  toggleUserRole: () => {},
});


export const AuthProvider: React.FC = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('user');

  const toggleUserRole = () => {
    setUserRole(prevRole => (prevRole === 'admin' ? 'user' : 'admin'));
  };

  return (
    <AuthContext.Provider value={{ userRole, toggleUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
