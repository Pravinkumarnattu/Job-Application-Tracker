import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosInstance";
import GoogleAuthButton from "../Authentication/GoogleAuthButton";

const Register = () => {
  const [userDetails, setUserDetails] = useState({ name: "", email: "", password: "" });
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await api.post("/auth/register", userDetails);
      navigate("/login", { replace: true });
    } catch (err) {
      setErrMsg(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Name"
        value={userDetails.name}
        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={userDetails.email}
        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={userDetails.password}
        onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
        required
        minLength={8}
      />
      <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      <GoogleAuthButton />
      {errMsg && <p>{errMsg}</p>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </form>
  );
};

export default Register;