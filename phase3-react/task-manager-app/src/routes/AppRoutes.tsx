import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
// import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
// import Profile from "../pages/Profile";
// import Tasks from "../pages/Tasks";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/profile" element={<Profile />} />
      <Route path="/tasks" element={<Tasks />} /> */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

export default AppRoutes;
