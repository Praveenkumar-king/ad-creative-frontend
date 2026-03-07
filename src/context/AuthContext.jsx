import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState({
    name: localStorage.getItem("name")
  });

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);

    setUser({ name: data.name });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}