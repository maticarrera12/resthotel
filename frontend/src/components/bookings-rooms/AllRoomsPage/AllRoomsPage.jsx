import { useEffect } from "react";
import { useState } from "react"
import useRoom from "../../../hooks/useRoom"
import RoomSearch from "../../common/RoomSearch/RoomSearch";
import RoomResult from "../../common/RoomResults/RoomResult";
import PaginationComponent from "../../common/Pagination/PaginationComponent";
import "./allRoomsPage.css"
const AllRoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(6)
    const { getAllRooms , getRoomTypes } = useRoom();

    const handleSearchResult = (results) =>{
        setRooms(results);
        setFilteredRooms(results)
    }

    useEffect(()=>{
        const fetchRooms = async () =>{
            try {
                const response = await getAllRooms();
                const allRooms = response.roomList;
                setRooms(allRooms);
                setFilteredRooms(allRooms)
            } catch (error) {
                console.error('Error fetching rooms:', error.message);
            }
        }

        const fetchRoomTypes = async () => {
            try {
                const types = await getRoomTypes();
                setRoomTypes(types)
            } catch (error) {
                console.error('Error fetching room types:', error.message);
            }
        }
        fetchRooms();
        fetchRoomTypes();
    },[])

    const handleRoomTypeChange = (e) =>{
        setSelectedRoomType(e.target.value);
        filterRooms(e.target.value)
    }

    const filterRooms = (type) => {
        if (type === '') {
          setFilteredRooms(rooms);
        } else {
          const filtered = rooms.filter((room) => room.roomType === type);
          setFilteredRooms(filtered);
        }
        setCurrentPage(1); 
      };

      //paginatiom

      const indexOfLastRoom = currentPage * roomsPerPage;
      const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
      const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
      
      const paginate = (event, page) => {
        setCurrentPage(page);
      };
  
      return (
    <div className="all-rooms-page">
      <div className="search-container">
           <h2>Habitaciones</h2>
        <div className="all-rooms-category">
            <label>Filtrar por categoria:</label>
            <select value={selectedRoomType} onChange={handleRoomTypeChange}>
                <option value="">All</option>
                {roomTypes.map((type,index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
            </select>
        </div>
      </div>
     

        <RoomSearch handleSearchResult={handleSearchResult}/>
        <RoomResult roomSearchResults={currentRooms}/>

        <PaginationComponent 
        roomsPerPage={roomsPerPage}
        totalRooms={filteredRooms.length}
        currentPage={currentPage}
        paginate={paginate}
        />
    </div>
  )
}

export default AllRoomsPage
// import { useEffect, useState } from "react";
// import { Pagination } from "@mui/material";
// import useRoom from "../../../hooks/useRoom";
// import RoomSearch from "../../common/RoomSearch/RoomSearch";
// import RoomResult from "../../common/RoomResults/RoomResult";
// import "./allRoomsPage.css";

// const AllRoomsPage = () => {
//   const [rooms, setRooms] = useState([]);
//   const [roomTypes, setRoomTypes] = useState([]);
//   const [selectedRoomType, setSelectedRoomType] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const roomsPerPage = 6;

//   const { getAllRooms, getRoomTypes } = useRoom();

//   const fetchRooms = async (page = 1) => {
//     try {
//       const response = await getAllRooms(page - 1, roomsPerPage); // page - 1 porque Spring arranca en 0
//       setRooms(response.roomList);
//       setTotalPages(response.totalPages);
//     } catch (error) {
//       console.error("Error fetching rooms:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchRooms(currentPage);
//   }, [currentPage]);

//   useEffect(() => {
//     const fetchRoomTypes = async () => {
//       try {
//         const types = await getRoomTypes();
//         setRoomTypes(types);
//       } catch (error) {
//         console.error("Error fetching room types:", error.message);
//       }
//     };
//     fetchRoomTypes();
//   }, []);

//   const handleRoomTypeChange = (e) => {
//     setSelectedRoomType(e.target.value);
//     // Si necesitás filtrar desde el backend, deberías agregar ese parámetro en la request
//   };

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   return (
//     <div className="all-rooms-page">
//       <div className="search-container">
//         <h2>Habitaciones</h2>
//         <div>
//           <label>Filtrar por categoría:</label>
//           <select value={selectedRoomType} onChange={handleRoomTypeChange}>
//             <option value="">Todas</option>
//             {roomTypes.map((type, index) => (
//               <option key={index} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <RoomSearch handleSearchResult={(results) => setRooms(results)} />
//       <RoomResult roomSearchResults={rooms} />

//       <Pagination
//         count={totalPages}
//         page={currentPage}
//         onChange={handlePageChange}
//         color="primary"
//         shape="rounded"
//         sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" , paddingBlock:"1rem"}}
//       />
//     </div>
//   );
// };

// export default AllRoomsPage;
// import { useEffect, useState } from "react";
// import { Pagination } from "@mui/material";
// import useRoom from "../../../hooks/useRoom";
// import RoomSearch from "../../common/RoomSearch/RoomSearch";
// import RoomResult from "../../common/RoomResults/RoomResult";
// import "./allRoomsPage.css";

// const AllRoomsPage = () => {
//   const [rooms, setRooms] = useState([]);
//   const [roomTypes, setRoomTypes] = useState([]);
//   const [selectedRoomType, setSelectedRoomType] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isSearching, setIsSearching] = useState(false); // ← para saber si estamos en modo búsqueda

//   const roomsPerPage = 6;
//   const { getAllRooms, getRoomTypes } = useRoom();

//   const fetchRooms = async (page = 1) => {
//     try {
//       const response = await getAllRooms(page - 1, roomsPerPage);
//       setRooms(response.roomList);
//       setTotalPages(response.totalPages);
//     } catch (error) {
//       console.error("Error fetching rooms:", error.message);
//     }
//   };

//   const handleSearchResult = (results) => {
//     setRooms(results);
//     setTotalPages(1); // Buscamos todo, no hay paginación
//     setCurrentPage(1);
//     setIsSearching(true);
//   };

//   useEffect(() => {
//     if (!isSearching) {
//       fetchRooms(currentPage);
//     }
//   }, [currentPage, isSearching]);

//   useEffect(() => {
//     const fetchTypes = async () => {
//       try {
//         const types = await getRoomTypes();
//         setRoomTypes(types);
//       } catch (error) {
//         console.error("Error fetching room types:", error.message);
//       }
//     };
//     fetchTypes();
//   }, []);

//   const handleRoomTypeChange = (e) => {
//     setSelectedRoomType(e.target.value);
//     // Esto lo podés usar si querés volver a activar el filtro local
//     // o implementarlo desde el backend
//   };

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   return (
//     <div className="all-rooms-page">
//       <div className="search-container">
//         <h2>Habitaciones</h2>
//         <div>
//           <label>Filtrar por categoría:</label>
//           <select value={selectedRoomType} onChange={handleRoomTypeChange}>
//             <option value="">Todas</option>
//             {roomTypes.map((type, index) => (
//               <option key={index} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* <RoomSearch handleSearchResult={handleSearchResult} /> */}
//       <RoomResult roomSearchResults={rooms} />

//       {!isSearching && (
//         <Pagination
//           count={totalPages}
//           page={currentPage}
//           onChange={handlePageChange}
//           color="primary"
//           shape="rounded"
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             marginTop: "2rem",
//             paddingBlock: "1rem"
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default AllRoomsPage;


