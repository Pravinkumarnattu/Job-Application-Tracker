import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar"
import "./DashboardLayout.css"

const DashboardLayout = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="route-container">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};


export default DashboardLayout;