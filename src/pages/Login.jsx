// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      // backend returns user info (name,email). Save for UI.
      localStorage.setItem("user", JSON.stringify(res.data));
      // optionally also store token if backend returns it (it doesn't, cookie used)
      // localStorage.setItem("token", res.data.token || "");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login Failed");
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
          <h2>Sign in</h2>
          <input placeholder="Email Address" onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
          <button onClick={login}>Continue</button>
          <p className="switchText"><Link to="/forgot-password">Forgot Password?</Link></p>
          <p className="switchText">New user? <Link to="/signup">Create account</Link></p>
        </div>
      </div>
    </div>
  );
}