import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar({ active, setActive }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <h3>AI Studio</h3>
      <button onClick={()=>setActive("generate")}>Generate</button>
      <button onClick={()=>setActive("history")}>History</button>
      <div className="userBox">
        <p>Welcome, {user?.name}</p>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}