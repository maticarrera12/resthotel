import { useEffect, useState } from "react";
import "./manageRoomPage.css"
import { useNavigate } from "react-router-dom";
import useRoom from "../../../hooks/useRoom";
import PaginationComponent from "../../common/Pagination/PaginationComponent";
import RoomResult from "../../common/RoomResults/RoomResult";
const ManageRoomPage = () => {

    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(5);
    const navigate = useNavigate();
    const {getAllRooms, getRoomTypes} = useRoom()

    useEffect(() => {
        
        const fetchRooms = async () => {
          try {
            const response = await getAllRooms();
            const allRooms = response.roomList;
            setRooms(allRooms);
            setFilteredRooms(allRooms);
          } catch (error) {
            console.error('Error fetching rooms:', error.message);
          }
        };
    
        const fetchRoomTypes = async () => {
          try {
            const types = await getRoomTypes();
            setRoomTypes(types);
          } catch (error) {
            console.error('Error fetching room types:', error.message);
          }
        };
    
        fetchRooms();
        fetchRoomTypes();
      }, []);
    
      const handleRoomTypeChange = (e) => {
        setSelectedRoomType(e.target.value);
        filterRooms(e.target.value);
      };
    
      const filterRooms = (type) => {
        if (type === '') {
          setFilteredRooms(rooms);
        } else {
          const filtered = rooms.filter((room) => room.roomType === type);
          setFilteredRooms(filtered);
        }
        setCurrentPage(1); // Reset to first page after filtering
      };
    
      // Pagination
      const indexOfLastRoom = currentPage * roomsPerPage;
      const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
      const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
    
      // Change page
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className='all-rooms'>
    <h2>All Rooms</h2>
    <div className='all-room-filter-div' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className='filter-select-div'>
        <label>Filtrar por categoria:</label>
        <select value={selectedRoomType} onChange={handleRoomTypeChange}>
          <option value="">All</option>
          {roomTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button className='detail-button' onClick={() => navigate('/admin/add-room')}>
          Add Room
        </button>
      </div>
    </div>

    <RoomResult roomSearchResults={currentRooms} />

    <PaginationComponent
      roomsPerPage={roomsPerPage}
      totalRooms={filteredRooms.length}
      currentPage={currentPage}
      paginate={paginate}
    />
  </div>
  )
}

export default ManageRoomPage