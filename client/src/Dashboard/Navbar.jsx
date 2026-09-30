import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import api from "../api/axiosInstance";
import "./Navbar.css"

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const fectDetails = async () => {
      const [res] = await Promise.all([api.get("/auth/me")]);
      setName(res?.data?.name);
    };
    fectDetails();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-search">
        <MdSearch size={22} />
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search company or role"
        />
      </div>
      <div className="navbar-profile">
        <button onClick={() => setDropdownOpen(!dropdownOpen)}>
          {name}
          {dropdownOpen ? (
            <IoChevronUp size={20} />
          ) : (
            <IoChevronDown size={20} />
          )}
        </button>
        {dropdownOpen && (
          <div
            className="ngo-topbar-dropdown"
            onClick={() => setDropdownOpen(false)}
          >
            <Link to="/profile">Profile</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
