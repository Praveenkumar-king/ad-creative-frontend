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
import ChangePassword from "./pages/ChangePassword";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>

          {/* 🌐 PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/verify-success" element={<VerifySuccess />} />

          {/* 🔐 USER PROTECTED */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History/></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path="/generator" element={<ProtectedRoute><Generator/></ProtectedRoute>} />
          <Route path="/subscription" element={<ProtectedRoute><Subscription/></ProtectedRoute>} />
          <Route path="/gallery" element={<ProtectedRoute><Gallery/></ProtectedRoute>} />
          <Route path="/campaign/:id" element={<ProtectedRoute><ShareCampaign/></ProtectedRoute>} />
          <Route path="/activity" element={<ProtectedRoute><Activity/></ProtectedRoute>} />
          <Route path="/change-password" element={<ProtectedRoute><ChangePassword/></ProtectedRoute>} />

          {/* 👑 ADMIN */}
          <Route path="/admin" element={<AdminRoute><Admin/></AdminRoute>} />
          <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard/></AdminRoute>} />

        </Routes>

      </BrowserRouter>

    </AuthProvider>

  );

}

export default App;