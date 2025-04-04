import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/common/Navbar/Navbar"
import Footer from "./components/common/Footer/Footer"
import Home from "./components/Home/Home"
import AllRoomsPage from "./components/bookings-rooms/AllRoomsPage/AllRoomsPage"
import MyBookings from "./components/bookings-rooms/MyBookings/MyBookings"
import RoomDetail from "./components/bookings-rooms/RoomDetails/RoomDetail"
import LoginPage from "./components/auth/LoginPage"
import RegisterPage from "./components/auth/RegisterPage"
import ProfilePage from "./components/profile/ProfilePage/ProfilePage"

function App() {
  return (
  <BrowserRouter>
  <div className="app">
      <Navbar/>
      <div className="content">
        <Routes>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/rooms" element={<AllRoomsPage />} />
          <Route path="/my-bookings" element={<MyBookings/>}/>
          <Route path="room-details-book/:roomId" element={<RoomDetail/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>

          <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
        
      </div>
      <Footer/>
  </div>

  </BrowserRouter>
  )
}

export default App
