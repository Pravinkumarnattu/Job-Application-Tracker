import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../api/axiosInstance";
import GoogleAuthButton from "../Authentication/GoogleAuthButton";

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
    <form onSubmit={handleLogin}>
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
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      <GoogleAuthButton />
      {errMsg && <p>{errMsg}</p>}
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default Login;
