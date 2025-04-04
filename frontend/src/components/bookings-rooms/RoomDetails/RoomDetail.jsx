import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from "antd";
import useUser from "../../../hooks/useUser";
import useRoom from "../../../hooks/useRoom";
import useBooking from "../../../hooks/useBooking";
import dayjs from "dayjs";
import "./roomDetail.css"
const { RangePicker } = DatePicker;

const RoomDetail = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dates, setDates] = useState(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalGuests, setTotalGuests] = useState(1);
  const [userId, setUserId] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { getRoomById } = useRoom();
  const { bookRoom } = useBooking();
  const {getUserProfile} = useUser()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getRoomById(roomId);
        if (!response || !response.room) {
          throw new Error("No se encontró la habitación");
        }
        setRoomDetails(response.room);
        const userProfile = await getUserProfile()
        setUserId(userProfile.user.id)
      } catch (error) {
        console.error("Error en fetchData:", error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (roomId) fetchData();
  }, [roomId]);

  const handleConfirmBooking = () => {
    if (!dates || dates.length !== 2) {
      setErrorMessage("Por favor selecciona fecha de check-in y check-out");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }
    const [checkInDate, checkOutDate] = dates;
    const totalDays = checkOutDate.diff(checkInDate, "day") + 1;
    const totalGuests = numAdults + numChildren;
    const totalPrice = roomDetails.roomPrice * totalDays;
    setTotalPrice(totalPrice);
    setTotalGuests(totalGuests);
  };

  const acceptBooking = async () => {
    if (!dates || dates.length !== 2) return;
    const [checkInDate, checkOutDate] = dates.map(date => date.format("YYYY-MM-DD"));
    try {
      const booking = { checkInDate, checkOutDate, numOfAdults: numAdults, numOfChildren: numChildren };
      const response = await bookRoom(roomId, userId, booking);
      
      console.log("Respuesta de la API:", response); // 👀 Revisa qué devuelve
  
      if (response?.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          navigate("/rooms");
        }, 10000);
      } else {
        throw new Error("Respuesta inesperada de la API");
      }
    } catch (error) {
      console.error("Error en la reserva:", error);
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  if (isLoading) return <p>Cargando detalles de la habitación...</p>;
  if (error) return <p>{error}</p>;
  if (!roomDetails) return <p>Habitación no encontrada.</p>;

  return (
    <div  className="room-details-booking">
      {showMessage && <p style={{color:"red"}}>Reserva exitosa. Código: {confirmationCode}</p>}
      {errorMessage && <p style={{color:"red"}} className="error-message">{errorMessage}</p>}
      <h2 >Detalles de la habitación</h2>
      <img src={roomDetails.roomPhotoUrl} alt={roomDetails.roomType} className="room-details-image" />
      <div className="room-details-info">
        <h3>{roomDetails.roomType}</h3>
        <p>Precio: ${roomDetails.roomPrice} / noche</p>
        <p>{roomDetails.description}</p>
      </div>
      <RangePicker onChange={setDates} format="DD/MM/YYYY" />
      <div>
        <label>Adultos: </label>
        <input type="number" min="1" value={numAdults} onChange={(e) => setNumAdults(parseInt(e.target.value))} />
        <br />
        <label>Niños: </label>
        <input type="number" min="0" value={numChildren} onChange={(e) => setNumChildren(parseInt(e.target.value))} />
      </div>
      <button onClick={handleConfirmBooking} className="detail-button">Confirmar reserva</button>
      {totalPrice > 0 && (
        <div>
          <p>Precio Total: ${totalPrice}</p>
          <p>Huéspedes Totales: {totalGuests}</p>
          <button onClick={acceptBooking} className="detail-button">Aceptar reserva</button>
        </div>
      )}
    </div>
  );
};

export default RoomDetail;
