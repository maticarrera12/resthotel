import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from "../../../hooks/useUser"
import useAuth from '../../../hooks/useAuth'
const ProfilePage = () => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const {getUserProfile, getUserBookings} = useUser();
    const {logout} = useAuth()

    useEffect(()=>{
        const fetchUserProfile = async () => {
            try {
                const response = await getUserProfile();
                const userPlusBookings = await getUserBookings(response.user.id)
                setUser(userPlusBookings.user)
            } catch (error) {
                setError(error.response?.data?.message || error.message)
            }
        }

        fetchUserProfile()
    },[])

    const handleLogout = () => {
        logout();
        navigate('/home');
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };
  return (
    <div className="profile-page">
    {user && <h2>Bienvenido, {user.name}</h2>}
    <div className="profile-actions">
        <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
    {error && <p className="error-message">{error}</p>}
    {user && (
        <div className="profile-details">
            <h3>Detalles del Perfil</h3>
            <p><strong>Email: </strong> {user.email}</p>
            <p><strong>Nombre: </strong> {user.name}</p>
            <p><strong>Numero: </strong> {user.phoneNumber}</p>
        </div>
    )}
    <div className="bookings-section">
        <h3>Historial de reservas</h3>
        <div className="booking-list">
            {user && user.bookings.length > 0 ? (
                user.bookings.map((booking) => (
                    <div key={booking.id} className="booking-item">
                        <p><strong>Codigo de reserva:</strong> {booking.bookingConfirmationCode}</p>
                        <p><strong>Check-in:</strong> {booking.checkInDate}</p>
                        <p><strong>Check-out:</strong> {booking.checkOutDate}</p>
                        <p><strong>Huespedes:</strong> {booking.totalNumOfGuest}</p>
                        <p><strong>Categoria:</strong> {booking.room.roomType}</p>
                        <img src={booking.room.roomPhotoUrl} alt="Room" className="room-photo" />
                    </div>
                ))
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    </div>
</div>
  )
}

export default ProfilePage