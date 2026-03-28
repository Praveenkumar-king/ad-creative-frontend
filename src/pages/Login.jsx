import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API from "../config/api";
import "../styles/auth.css";

export default function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const login = async () => {

    if(!email || !password){
      alert("Enter email & password");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        `${API}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("user", JSON.stringify(res.data));

      setLoading(false);

      navigate("/dashboard");

    } catch (err) {

      setLoading(false);

      alert(
        err.response?.data?.error ||
        "Login Failed"
      );

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

          <input
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button onClick={login} disabled={loading}>
            {loading ? "Logging in..." : "Continue"}
          </button>

          <p className="switchText">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>

          <p className="switchText">
            New user? <Link to="/signup">Create account</Link>
          </p>

        </div>

      </div>

    </div>

  );

}