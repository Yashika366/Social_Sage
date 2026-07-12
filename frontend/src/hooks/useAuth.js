import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register({ name, email, password });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login({ email, password });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  return { register, login, logout, isLoggedIn, getUser, loading, error };
};

export default useAuth;