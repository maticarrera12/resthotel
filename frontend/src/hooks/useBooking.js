// src/hooks/useBooking.js

import { useState } from "react";
import axios from "axios";
import { BASE_URL, getHeader } from "../service/ApiService";

const useBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  const bookRoom = async (roomId, userId, booking) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/bookings/book-room/${roomId}/${userId}`,
        booking,
        { headers: getHeader() }
      );
      return response.data;
    } catch (error) {
      console.error("Error en bookRoom:", error.response?.data || error.message);
      throw error.response?.data || new Error("Error al reservar la habitación"); // Lanzamos el error
    }
  };

  const getAllBookings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/bookings/all`, {
        headers: getHeader()
      });
      setBookings(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const getBookingByConfirmationCode = async (bookingCode) => {
    try {
      const response = await axios.get(`${BASE_URL}/bookings/get-by-confirmation-code/${bookingCode}`);
      return response.data;
    } catch (error) {
      setError(error);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/bookings/cancel/${bookingId}`, {
        headers: getHeader()
      });
      return response.data;
    } catch (error) {
      setError(error);
    }
  };

  return {
    bookings,
    error,
    bookRoom,
    getAllBookings,
    getBookingByConfirmationCode,
    cancelBooking
  };
};

export default useBooking;
