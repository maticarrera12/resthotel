import React from 'react'
import useAuth from "../../../hooks/useAuth.js"
import { NavLink, useNavigate } from 'react-router-dom';
import "./navbar.css"
const Navbar = () => {

    const { isAuthenticated, isAdmin, isUser, logout} = useAuth();
    const navigate = useNavigate();


    const handleLogout = () => {
        const isLogout = window.confirm("Estas seguro que deseas cerrar sesion");
        if(isLogout){
            logout()
            navigate("/home")
        }
    }

  return     (
    <nav className='navbar'>
        <div >
            <NavLink className="logo" to={"/home"}>RestHotel</NavLink>
        </div>
        <div className='btn-nav'>
        <ul>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/rooms">Habitaciones</NavLink></li>
            {isAuthenticated() && <li><NavLink to="/my-bookings">Mis Reservas</NavLink></li>}
            { isUser() && <li><NavLink to="/profile">Perfil</NavLink></li>}
            { isAdmin() &&<li><NavLink to="/admin">Admin</NavLink></li>}
            
            {!isAuthenticated() && <li><NavLink to="/login">Login</NavLink></li>}
            {!isAuthenticated() && <li><NavLink to="/register">Register</NavLink></li>}
            
            {isAuthenticated() && <li onClick={handleLogout}>Logout</li>}
        </ul>
        </div>
    </nav>
  )
}

export default Navbar