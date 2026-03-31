import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API from "../config/api";
import "../styles/auth.css";

export default function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("All fields required");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        `${API}/auth/signup`,
        {
          name: name.trim(),
          email: email.trim(),
          password
        }
      );

      // ✅ KEEP YOUR ORIGINAL MESSAGE
      alert(
        res.data?.message || 
        "Signup successful — verification email sent"
      );

      // ✅ AFTER SIGNUP → LOGIN PAGE
      navigate("/login");

    } catch (err) {

      alert(
        err.response?.data?.error || "Signup Failed"
      );

    } finally {
      setLoading(false);
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

          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleSignup} disabled={loading}>
            {loading ? "Creating..." : "Signup"}
          </button>

          <p className="switchText">
            Already have account? <Link to="/login">Login</Link>
          </p>

        </div>
      </div>

    </div>

  );
}