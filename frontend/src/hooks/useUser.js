import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, getHeader } from "../service/ApiService";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const getUserProfile = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/get-profile`, {
        headers: getHeader(),
      });
  
      console.log("User API Response:", response); // Verifica qué devuelve exactamente la API
      console.log("User API Response Data:", response.data); // Revisa los datos específicos
  
      if (!response.data) {
        throw new Error("No se pudo obtener el perfil del usuario");
      }
  
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Error en getUserProfile:", error);
      setError(error);
      return null;
    }
  };
  
  

  useEffect(() => {
    getUserProfile();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/all`, { headers: getHeader() });
      setUsers(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const getUser = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/get-by-id/${userId}`, { headers: getHeader() });
      return response.data;
    } catch (error) {
      setError(error);
    }
  };

  const getUserBookings = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/get-user-bookings/${userId}`, { headers: getHeader() });
      return response.data;
    } catch (error) {
      setError(error);
    }
  };

  return {
    user,
    users,
    error,
    getAllUsers,
    getUser,
    getUserBookings,
    getUserProfile, // ✅ Ahora está definido correctamente
  };
};

export default useUser;
