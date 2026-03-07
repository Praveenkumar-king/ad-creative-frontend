import { Link, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Sidebar(){

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("name");

    navigate("/login");

  };

  return(

    <div className="sidebar">

      <h2 className="logo">AdVantage Gen</h2>
      
      <Link to="/generator">Ad Studio</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/history">History</Link>
      <Link to="/profile">Profile</Link>
      <li onClick={()=>navigate("/gallery")}>Gallery</li>
      <Link to="/activity">Security</Link>

      <button className="logoutBtn" onClick={logout}>
        Logout
      </button>

    </div>

  );

}