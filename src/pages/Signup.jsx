import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API = "http://localhost:8080/api/auth";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${API}/signup`, { name, email, password });
      login(res.data);
      navigate("/");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="authContainer">
      <div className="glassCard">
        <h2>Signup</h2>
        <input placeholder="Name" onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button onClick={handleSignup}>Signup</button>
        <p>Already have account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}