import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE;

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (!password.trim()) return alert("Enter new password");

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(
        `${API}/auth/reset-password/${token}`,
        { password }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setMessage(err.response?.data?.error || "Invalid or expired token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authContainer">
      <div className="glassCard">
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={handleReset}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      </div>
    </div>
  );
}