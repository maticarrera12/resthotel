import { useEffect, useState } from "react";
import PaginationComponent from "../../common/Pagination/PaginationComponent";
import "./manageBookingsPage.css"
import { useNavigate } from "react-router-dom";
import useBooking  from "../../../hooks/useBooking"
const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(6);
    const navigate = useNavigate();
    const {getAllBookings} = useBooking()
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getAllBookings();
                const allBookings = response.bookingList;
                setBookings(allBookings);
                setFilteredBookings(allBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        filterBookings(searchTerm);
    }, [searchTerm, bookings]);

    const filterBookings = (term) => {
        if (term === '') {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter((booking) =>
                booking.bookingConfirmationCode && booking.bookingConfirmationCode.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredBookings(filtered);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='bookings-container'>
            <h2 className="title">Todas las Reservas</h2>
            <div className='search-div'>
                <label>Filtrar por codigo:</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter booking number"
                />
            </div>
          
                     <div className="booking-results">
                {currentBookings.map((booking) => (
                    <div key={booking.id} className="booking-result-item">
                        <p><strong>Codigo:</strong> {booking.bookingConfirmationCode}</p>
                        <p><strong>Check In:</strong> {booking.checkInDate}</p>
                        <p><strong>Check out:</strong> {booking.checkOutDate}</p>
                        <p><strong>Huespedes:</strong> {booking.totalNumOfGuests}</p>
                        <button
                            className="detail-button"
                            onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}
                        >Manage Booking</button>
                    </div>
                ))}
                </div>
           

            <PaginationComponent
                roomsPerPage={bookingsPerPage}
                totalRooms={filteredBookings.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
}

export default ManageBookingsPage