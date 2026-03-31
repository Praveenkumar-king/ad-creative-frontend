import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {

  const { user, token, loading } = useAuth();

  if(loading){
    return <p style={{padding:"40px"}}>Checking admin access...</p>;
  }

  if(!token){
    return <Navigate to="/login" replace />;
  }

  if(user?.role !== "admin"){
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}