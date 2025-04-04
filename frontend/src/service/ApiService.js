// src/api/apiService.js

export const BASE_URL = "http://localhost:4040"; // O usa una variable de entorno

// Función para obtener los headers con el token de autenticación
export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
