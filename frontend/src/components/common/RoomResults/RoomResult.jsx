import { useNavigate } from "react-router-dom"
import useAuth from "../../../hooks/useAuth"
import "./roomResult.css"

const RoomResult = ({roomSearchResults}) => {

    const navigate = useNavigate()
    const {isAdmin} = useAuth()
  return (
    <section className="room-results">
    {roomSearchResults && roomSearchResults.length > 0 && (
        <div className="room-list">

            {roomSearchResults.map(room => (
                <div key={room.id} className="room-list-item">
                    <img className='room-list-item-image' src={room.roomPhotoUrl} alt={room.roomType} />
                    <div className="room-details">
                        <h3>{room.roomType}</h3>
                        <p>${room.roomPrice} / noche</p>
                        <p>{room.roomDescription}</p>
                    </div>

                    <div className='book-now-div'>
                        {isAdmin() ? (
                            <button
                                className="detail-button"
                                onClick={() => navigate(`/admin/edit-room/${room.id}`)} // Navigate to edit room with room ID
                            >
                                Edit Room
                            </button>
                        ) : (
                            <button
                                className="detail-button"
                                onClick={() => navigate(`/room-details-book/${room.id}`)} // Navigate to book room with room ID
                            >
                                View/Book Now
                            </button>
                        )}
                    </div>

                </div>
            ))}
        </div>
    )}
</section>
  )
}

export default RoomResult