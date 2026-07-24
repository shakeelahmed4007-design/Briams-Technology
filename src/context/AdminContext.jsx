import { createContext, useState } from "react";

const AdminContext = createContext(null);

export { AdminContext };

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}
