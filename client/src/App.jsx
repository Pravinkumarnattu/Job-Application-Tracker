import { BrowserRouter, Routes, Route } from "react-router-dom";

import GoogleCallback from "./Authentication/GoogleCallback";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Dashboard/DashboardHome";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Register />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
