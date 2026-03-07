import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import VerifySuccess from "./pages/VerifySuccess";
import Generator from "./pages/Generator";
import Subscription from "./pages/Subscription";
import Gallery from "./pages/Gallery";
import ShareCampaign from "./pages/ShareCampaign";
import Activity from "./pages/Activity";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import ChangePassword from "./pages/ChangePassword";   // ⭐ ADD THIS

function App() {

return (

<AuthProvider>

<BrowserRouter>

<Routes>

<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />

<Route path="/dashboard" element={<Dashboard />} />
<Route path="/history" element={<History />} />
<Route path="/profile" element={<Profile />} />

<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />

<Route path="/verify/:token" element={<VerifyEmail />} />
<Route path="/verify-success" element={<VerifySuccess />} />

<Route path="/generator" element={<Generator/>}/>
<Route path="/subscription" element={<Subscription/>}/>
<Route path="/gallery" element={<Gallery/>}/>
<Route path="/campaign/:id" element={<ShareCampaign/>}/>
<Route path="/activity" element={<Activity/>}/>
<Route path="/admin" element={<Admin/>}/>
<Route path="/admin-dashboard" element={<AdminDashboard/>}/>

<Route path="/change-password" element={<ChangePassword/>}/>  {/* ⭐ ADD */}

</Routes>

</BrowserRouter>

</AuthProvider>

);

}

export default App;