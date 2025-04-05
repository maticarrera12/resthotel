import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from "../../../hooks/useUser"
import useAuth from '../../../hooks/useAuth'
import "./profilePage.css"
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
        <div className='profile-details-container'>
                {user && <h2>Bienvenido, {user.name}</h2>}
    <div className="profile-actions">
        <button className="detail-button" onClick={handleEditProfile}>Edit Profile</button>
        <button className="detail-button" onClick={handleLogout}>Logout</button>
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
        </div>

    <div className="bookings-section">
        <h3>Historial de reservas</h3>
        <div className="booking-list">
            {user && user.bookings.length > 0 ? (
                user.bookings.map((booking) => (
                    <div key={booking.id} className="booking-item">
                        <div>
                        <img src={booking.room.roomPhotoUrl} alt="Room" className="room-photo" />
                        </div>
                        <div className='booking-text'>
                        <p><strong>Codigo de reserva:</strong> {booking.bookingConfirmationCode}</p>
                        <p><strong>Check-in:</strong> {booking.checkInDate}</p>
                        <p><strong>Check-out:</strong> {booking.checkOutDate}</p>
                        </div>
                        <div className='booking-text'>
                        <p><strong>Huespedes:</strong> {booking.totalNumOfGuests}</p>
                        <p><strong>Categoria:</strong> {booking.room.roomType}</p>
                        </div>
                       
                        
                        
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