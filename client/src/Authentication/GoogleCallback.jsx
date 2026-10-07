import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import Cookies from "js-cookie";
import api from "../api/axiosInstance";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const queryParams = new URLSearchParams(window.location.search);
    const authCode = queryParams.get("code");
    if (!authCode) {
      navigate("/login", { replace: true });
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await api.post("/auth/google", { code: authCode });
        const { token, user } = response?.data;
        Cookies.set("jwt_token", token, { expires: 7 });
        Cookies.set("user", JSON.stringify(user), { expires: 7 });
        navigate("/dashboard", { replace: true });
      } catch (err) {
        console.error(err);
        navigate("/login", { replace: true });
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="signing-container">
      <h1 className="brand-name">JobTrack</h1>
      <main className="signin-card">
        <FaCheck size={36} />
        <h3>Signing in...</h3>
      </main>
    </div>
  );
};

export default GoogleCallback;
