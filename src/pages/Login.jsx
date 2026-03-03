import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API = "http://localhost:8080/api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/login`, { email, password });
      login(res.data);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="authContainer">
      <div className="glassCard">
        <h2>Login</h2>
        <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <Link to="/forgot-password">Forgot Password?</Link>
        <button onClick={handleLogin}>Login</button>
        <p>Don't have account? <Link to="/signup">Signup</Link></p>
      </div>
    </div>
  );
}