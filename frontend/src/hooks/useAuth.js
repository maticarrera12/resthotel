// src/hooks/useAuth.js
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../service/ApiService";

const useAuth = () => {
  const [authError, setAuthError] = useState(null);

  const registerUser = async (registration) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, registration);
      return response.data;
    } catch (error) {
      setAuthError(error.response?.data?.message || "Error al registrar");
      throw error;
    }
  };

  const loginUser = async (loginDetails) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, loginDetails);
      return response.data;
    } catch (error) {
      setAuthError(error.response?.data?.message || "Error al iniciar sesión");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  const isAdmin = () => {
    return localStorage.getItem("role") === "ADMIN";
  };

  const isUser = () => {
    return localStorage.getItem("role") === "USER";
  };

  return {
    registerUser,
    loginUser,
    logout,
    isAuthenticated,
    isAdmin,
    isUser,
    authError
  };
};

export default useAuth;
