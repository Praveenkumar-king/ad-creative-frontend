import { BrowserRouter,Routes,Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import VerifySuccess from "./pages/VerifySuccess";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Profile from "./pages/Profile";

export default function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>

        <Route path="/verify/:token" element={<VerifyEmail/>}/>
        <Route path="/verify-success" element={<VerifySuccess/>}/>

        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/profile" element={<Profile/>}/>

      </Routes>

    </BrowserRouter>

  );

}