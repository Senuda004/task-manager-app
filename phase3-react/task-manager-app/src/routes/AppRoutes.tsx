// routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import ForgotPassword from "../pages/ForgotPassword"
import Tasks from "../pages/Tasks"
import ProtectedRoute from "../components/protected-route"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  )
}

export default AppRoutes
