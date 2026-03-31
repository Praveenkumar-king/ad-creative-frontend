import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user,setUser] = useState(null);
  const [token,setToken] = useState(null);
  const [loading,setLoading] = useState(true);

  /* =========================
     INIT AUTH (SAFE LOAD)
  ========================= */

  useEffect(()=>{

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    try{

      // 🔥 FIX: avoid "undefined" crash
      if(storedUser && storedUser !== "undefined" && storedToken){

        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);
        setToken(storedToken);

      }else{

        // invalid data → clear
        localStorage.removeItem("user");
        localStorage.removeItem("token");

      }

    }catch(err){

      console.log("Invalid localStorage data → cleared");
      localStorage.clear();

    }finally{

      setLoading(false);

    }

  },[]);

  /* =========================
     LOGIN
  ========================= */

  const login = (userData, tokenData) => {

    if(!userData || !tokenData){
      console.error("Login failed: missing data");
      return;
    }

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);

    setUser(userData);
    setToken(tokenData);

  };

  /* =========================
     LOGOUT
  ========================= */

  const logout = () => {

    localStorage.clear();

    setUser(null);
    setToken(null);

    window.location.href = "/login";
  };

  /* =========================
     AUTO LOGOUT CHECK
  ========================= */

  useEffect(()=>{

    const interval = setInterval(()=>{

      const token = localStorage.getItem("token");

      if(!token){
        logout();
      }

    },60000); // every 1 min

    return ()=>clearInterval(interval);

  },[]);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);