import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../api/axiosInstance";
import GoogleAuthButton from "../Authentication/GoogleAuthButton";
import "./Login.css";
import "./Auth.css";

const Login = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/auth/login", userDetails);
      Cookies.set("jwt_token", response?.data?.token, { expires: 7 });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setErrMsg(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="title-head">Job Application Tracker</h1>
      <div className="auth-card-wrapper">
        <h1 className="auth-head">Log in to your account</h1>
        <GoogleAuthButton />
        <div className="horizontal">
          <hr className="left" /> Or with email and password
          <hr className="right" />
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
            required
          />
          <button type="submit" disabled={loading} className="login-button">
            {loading ? "Logging in..." : "Login"}
          </button>
          {errMsg && <p className="err-msg">{errMsg}</p>}
          <p className="no-account">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
