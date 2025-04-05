import { useEffect, useState } from "react";
import "./adminPage.css";
import { useNavigate } from "react-router-dom";
import useUser from "../../../hooks/useUser";
const AdminPage = () => {
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();
  const { getUserProfile } = useUser();

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const response = await getUserProfile();
        setAdminName(response.user.name);
      } catch (error) {
        console.error("Error fetching admin details", error.message);
      }
    };
    fetchAdminName()
  },[]);
  return (
    <div className="admin-page">
      <h1 className="welcome-message">Bienvenido, {adminName}</h1>
      <div className="admin-actions">
        <button
          className="detail-button"
          onClick={() => navigate("/admin/manage-rooms")}
        >
          Administrar Habitaciones
        </button>
        <button
          className="detail-button"
          onClick={() => navigate("/admin/manage-bookings")}
        >
          Administrar Reservas
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
