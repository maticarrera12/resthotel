import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, getHeader } from "../service/ApiService";

const useRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/rooms/all`);
        setRooms(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchRooms();
  }, []);

  const getAllRooms = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/rooms/all`);
      return response.data;
    } catch (error) {
      setError(error);
      return [];
    }
  };
  // const getAllRooms = async (page = 0, size = 2) => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/rooms/all`, {
  //       params: {
  //         page,
  //         size,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     setError(error);
  //     return {
  //       roomList: [],
  //       totalPages: 1,
  //     };
  //   }
  // };
  // const getAllRooms = async (page = 0, size = 3, keyword = "") => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/rooms/all`, {
  //       params: { page, size, keyword }
  //     });
  //     return response.data;
  //   } catch (error) {
  //     setError(error);
  //     return {
  //       roomList: [],
  //       totalPages: 1,
  //     };
  //   }
  // };
  const getRoomById = async (roomId) => {
    try {
      const response = await axios.get(`${BASE_URL}/rooms/room-by-id/${roomId}`);
      return response.data; // Asegúrate de que devuelve la respuesta correcta
    } catch (error) {
      console.error("Error fetching room:", error);
      return null;
    }
  };

  const getAllAvailableRooms = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/rooms/all-available-rooms`);
      return response.data;
    } catch (error) {
      setError(error);
      return [];
    }
  };

  const getAvailableRoomsByDateAndType = async (checkInDate, checkOutDate, roomType) => {
    try {
      const response = await axios.get(`${BASE_URL}/rooms/available-rooms-by-date-and-type`, {
        params: { checkInDate, checkOutDate, roomType }
      });
      return response.data;
    } catch (error) {
      setError(error);
      return [];
    }
  };

  const getRoomTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/rooms/types`);
      setRoomTypes(response.data);
      return response.data;
    } catch (error) {
      setError(error);
      return [];
    }
  };

  const addRoom = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/rooms/add`, formData, {
        headers: {
          ...getHeader(),
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  const updateRoom = async (roomId, formData) => {
    try {
      const response = await axios.put(`${BASE_URL}/rooms/update/${roomId}`, formData, {
        headers: {
          ...getHeader(),
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  const deleteRoom = async (roomId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/rooms/delete/${roomId}`, {
        headers: getHeader()
      });
      return response.data;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  return {
    rooms,
    availableRooms,
    roomTypes,
    error,
    getAllRooms,
    getRoomById,
    getAllAvailableRooms,
    getAvailableRoomsByDateAndType,
    getRoomTypes,
    addRoom,
    updateRoom,
    deleteRoom,
  };
};

export default useRoom;