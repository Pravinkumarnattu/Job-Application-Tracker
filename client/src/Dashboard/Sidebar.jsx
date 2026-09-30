import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaClipboardList } from "react-icons/fa";
import { MdHome, MdLogout, MdAddCircle, MdCalendarMonth } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import Cookies from "js-cookie";
import "./Sidebar.css"

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("user");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div className="mobile-header">
        <img alt="logo" className="mobile-logo" />

        <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
          <RxHamburgerMenu size={25} />
        </button>
      </div>

      <aside className={`sidebar ${showMenu ? "show" : ""}`}>
        <div className="app-name-logo">
          <img  alt="logo" className="sidebar-logo" />
          <h1 className="app-name">JobTrack</h1>
        </div>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
          onClick={() => setShowMenu(false)}
        >
          <MdHome size={22} />
          Dashboard
        </NavLink>

        <NavLink
          to="/my-applications"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
          onClick={() => setShowMenu(false)}
        >
          <FaClipboardList size={22} />
          Applications
        </NavLink>

        <NavLink
          to="/add-application"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
          onClick={() => setShowMenu(false)}
        >
          <MdAddCircle size={22} />
          Add Application
        </NavLink>

        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
          onClick={() => setShowMenu(false)}
        >
          <MdCalendarMonth size={22} />
          Calendar
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
          onClick={() => setShowMenu(false)}
        >
          <FaUserCircle size={22} />
          Profile
        </NavLink>

        <button onClick={logout} className="sidebar-logout">
          <MdLogout size={22} />
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
