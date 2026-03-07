// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await API.post("/auth/signup", { name, email, password });

      // If backend is demo mode, it might return demo flag; still prompt user.
      alert(res.data.message || "Signup successful. Check your email to verify account.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Signup Failed");
    }
  };

  return (
    <div className="authPage">
      <div className="leftHero">
        <h1>AdVantage Gen</h1>
        <p>AI-powered ad creative intelligence</p>
      </div>

      <div className="authCard">
        <div>
          <h2>Create Account</h2>
          <input placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} />
          <input placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button onClick={handleSignup}>Signup</button>
          <p className="switchText">Already have account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}