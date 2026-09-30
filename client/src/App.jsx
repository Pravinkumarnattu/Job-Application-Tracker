import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import GoogleCallback from "./Authentication/GoogleCallback";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import ProtectedRoute from "./ProtectedRoute";

import DashboardLayout from "./Dashboard/DashboardLayout";
import DashboardHome from "./Dashboard/DashboardHome";
import AddApplication from "./Dashboard/Applications/AddApplication";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="my-applications" element={<div></div>} />
          <Route path="add-application" element={<AddApplication />} />
          <Route path="calendar" element={<div></div>} />
          <Route path="profile" element={<div></div>} />
        </Route>

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
