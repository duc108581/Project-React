import React, { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAdminLogged, setIsAdminLogged] = useState(false);

  // Kiểm tra admin từ localStorage khi app load
  useEffect(() => {
    const savedAdmin = localStorage.getItem('adminUser');
    if (savedAdmin) {
      const adminData = JSON.parse(savedAdmin);
      setAdmin(adminData);
      setIsAdminLogged(true);
    }
  }, []);

  // Admin login - tài khoản admin mặc định
  const adminLogin = (email, password) => {
    const ADMIN_EMAIL = 'admin@ecommerce.com';
    const ADMIN_PASSWORD = 'admin123456';

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminData = { email, name: 'Admin' };
      localStorage.setItem('adminUser', JSON.stringify(adminData));
      setAdmin(adminData);
      setIsAdminLogged(true);
      return { success: true };
    }
    return { success: false, message: 'Email hoặc mật khẩu không đúng' };
  };

  // Admin logout
  const adminLogout = () => {
    localStorage.removeItem('adminUser');
    setAdmin(null);
    setIsAdminLogged(false);
  };

  return (
    <AdminContext.Provider value={{ admin, isAdminLogged, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
};
