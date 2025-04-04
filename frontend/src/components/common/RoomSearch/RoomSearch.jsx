import { useEffect, useState } from "react";
import { DatePicker } from "antd";
import useRoom from "../../../hooks/useRoom";
import "antd/dist/reset.css"; // Si usas Tailwind, revisa los estilos de AntD
import "./roomSearch.css"
const { RangePicker } = DatePicker;

const RoomSearch = ({ handleSearchResult }) => {
  const [dates, setDates] = useState([]);
  const [roomType, setRoomType] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [error, setError] = useState("");
  const { getRoomTypes, getAvailableRoomsByDateAndType } = useRoom();

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await getRoomTypes();
        if (Array.isArray(types)) {
          setRoomTypes(types);
        } else {
          console.error("Error: getRoomTypes() no devolvió un array", types);
          setRoomTypes([]); 
        }
      } catch (err) {
        console.log(err.message);
        setRoomTypes([]); 
      }
    };
    fetchRoomTypes();
  }, []);

  const showError = (message, timeOut = 5000) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, timeOut);
  };
  const handleInternalSearch = async () => {
    if (!dates.length || !roomType) {
      showError("Por favor rellene todos los campos");
      return;
    }
  
    try {
      const formattedStartDate = dates[0]?.format("YYYY-MM-DD") || null;
      const formattedEndDate = dates[1]?.format("YYYY-MM-DD") || null;
      const response = await getAvailableRoomsByDateAndType(formattedStartDate, formattedEndDate, roomType);

      if (response.statusCode === 200) {
        if (!response.roomList || response.roomList.length === 0) {
          showError("Habitaciones no disponibles para ese rango de fecha");
        } else {
          handleSearchResult(response.roomList);
          setError("");
        }
      }
      
    } catch (err) {
      console.error("Error en la búsqueda:", err); // 🔍 Ver el error real
      const errorMessage = err.response?.data?.message || "Error al buscar habitaciones";
      showError(errorMessage);
    }
  };
  
  

  return (
    <section>
      <div className="search-container">
        <div>
          <RangePicker
            value={dates}
            onChange={(value) => setDates(value || [])}
            format="DD/MM/YYYY"
            placeholder={["Check-in Date", "Check-out Date"]}
          />
        </div>
        <div className="category-search-container">
            <div>
          <select className="category-select" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
            <option disabled value="">Categoria</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <button className="home-search-button" onClick={handleInternalSearch}>
          Search Rooms
        </button>
        </div>
      
      {error && <p className="error-message">{error}</p>}
      </div>
    </section>
  );
};

export default RoomSearch;
// const RoomSearch = ({ onFilterChange }) => {
//   const [dates, setDates] = useState([]);
//   const [roomType, setRoomType] = useState("");
//   const [roomTypes, setRoomTypes] = useState([]);
//   const [error, setError] = useState("");
//   const { getRoomTypes } = useRoom();

//   useEffect(() => {
//     const fetchRoomTypes = async () => {
//       try {
//         const types = await getRoomTypes();
//         if (Array.isArray(types)) {
//           setRoomTypes(types);
//         } else {
//           console.error("Error: getRoomTypes() no devolvió un array", types);
//           setRoomTypes([]); 
//         }
//       } catch (err) {
//         console.log(err.message);
//         setRoomTypes([]); 
//       }
//     };
//     fetchRoomTypes();
//   }, []);

//   const showError = (message, timeOut = 5000) => {
//     setError(message);
//     setTimeout(() => {
//       setError("");
//     }, timeOut);
//   };

//   const handleInternalSearch = () => {
//     if (!dates.length || !roomType) {
//       showError("Por favor rellene todos los campos");
//       return;
//     }

//     const formattedStartDate = dates[0]?.format("YYYY-MM-DD");
//     const formattedEndDate = dates[1]?.format("YYYY-MM-DD");

//     onFilterChange({
//       startDate: formattedStartDate,
//       endDate: formattedEndDate,
//       roomType,
//     });
//   };

//   return (
//     <section>
//       <div className="search-container">
//         <div>
//           <RangePicker
//             value={dates}
//             onChange={(value) => setDates(value || [])}
//             format="DD/MM/YYYY"
//             placeholder={["Check-in Date", "Check-out Date"]}
//           />
//         </div>
//         <div className="category-search-container">
//           <div>
//             <select className="category-select" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
//               <option disabled value="">Categoria</option>
//               {roomTypes.map((type, index) => (
//                 <option key={index} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>
//           <button className="home-search-button" onClick={handleInternalSearch}>
//             Search Rooms
//           </button>
//         </div>

//         {error && <p className="error-message">{error}</p>}
//       </div>
//     </section>
//   );
// };

// export default RoomSearch;
