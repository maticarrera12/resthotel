import { useState } from "react"
import useBooking from "../../../hooks/useBooking";
const MyBookings = () => {

    const [confirmationCode, setConfirmationCode] = useState('');
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(null)
    const {getBookingByConfirmationCode} = useBooking();

    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            setError("Por favor ingre el codigo de su reserva");
            setTimeout(()=> setError(''),5000) 
            return
        }

        try {
            const response = await getBookingByConfirmationCode(confirmationCode)
            setBookingDetails(response.booking);
            setError(null)
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    }
    return (
        <div>
            <h2>Busca tu reserva</h2>
            <div>
                <input
                    required
                    type="text"
                    placeholder="Enter your booking confirmation code"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                />
                <button className="detail-button" onClick={handleSearch}>Buscar</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {bookingDetails && (
                <div>
                    <h3>Booking Details</h3>
                    <p>Confirmation Code: {bookingDetails.bookingConfirmationCode}</p>
                    <p>Check-in Date: {bookingDetails.checkInDate}</p>
                    <p>Check-out Date: {bookingDetails.checkOutDate}</p>
                    <p>Num Of Adults: {bookingDetails.numOfAdults}</p>
                    <p>Num Of Children: {bookingDetails.numOfChildren}</p>

                    <br />
                    <hr />
                    <br />
                    <h3>Booker Details</h3>
                    <div>
                        <p> id: {bookingDetails.user.id}</p>
                        <p> Name: {bookingDetails.user.name}</p>
                        <p> Email: {bookingDetails.user.email}</p>
                        <p> Phone Number: {bookingDetails.user.phoneNumber}</p>
                    </div>

                    <br />
                    <hr />
                    <br />
                    <h3>Room Details</h3>
                    <div>
                        <p> Room Type: {bookingDetails.room.roomType}</p>
                        <img src={bookingDetails.room.roomPhotoUrl} alt="" sizes="" srcSet="" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyBookings