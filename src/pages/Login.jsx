import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const login = async () => {

    try{

      const res = await API.post("/auth/login",{
        email,
        password
      });

      localStorage.setItem("token",res.data.token);
      localStorage.setItem("name",res.data.name);

      navigate("/dashboard");

    }catch(err){

      alert(err.response?.data?.error || "Login Failed");

    }

  };

  return(

    <div className="authPage">

      <div className="leftHero">
        <h1>AdVantage Gen</h1>
        <p>AI-powered ad creative intelligence</p>
      </div>

      <div className="authCard">

        <h2>Sign in</h2>

        <input
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={login}>Continue</button>

        <p
          className="link"
          onClick={()=>navigate("/forgot-password")}
        >
          Forgot Password?
        </p>

        <p>
          New user? <span onClick={()=>navigate("/signup")}>Create account</span>
        </p>

      </div>

    </div>

  );

}