import { useEffect, useState } from "react"
import "./editProfilePage.css"
import { useNavigate } from "react-router-dom"
import useUser from "../../../hooks/useUser"
const EditProfilePage = () => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const {getUserProfile, deleteUser} = useUser()

    useEffect(()=>{
        const fetchUserProfile = async () => {
            try {
                const response = await getUserProfile()
                setUser(response.user)
            } catch (error) {
                setError(error.message);
            }
        }

        fetchUserProfile()
    },[])

    const handleDeleteProfile = async () => {
        if (!window.confirm('Estas seguro que deseas borrar tu perfil?')) {
            return;
        }
        try {
            await deleteUser(user.id);
            navigate('/signup');
        } catch (error) {
            setError(error.message);
        }
    }

  return (
    <div className="edit-profile-page">
    <h2>Edit Profile</h2>
    {error && <p className="error-message">{error}</p>}
    {user && (
        <div className="profile-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            <button className="delete-profile-button" onClick={handleDeleteProfile}>Delete Profile</button>
        </div>
    )}
</div>
  )
}

export default EditProfilePage