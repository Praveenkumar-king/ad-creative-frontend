import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!email.trim()) return alert("Enter email");

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(`${API}/auth/forgot-password`, { email });

      setMessage(res.data.message || "Reset email sent successfully");

    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authContainer">
      <div className="glassCard">
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      </div>
    </div>
  );
}