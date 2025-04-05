import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";
import Home from "./components/Home/Home";
import AllRoomsPage from "./components/bookings-rooms/AllRoomsPage/AllRoomsPage";
import MyBookings from "./components/bookings-rooms/MyBookings/MyBookings";
import RoomDetail from "./components/bookings-rooms/RoomDetails/RoomDetail";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import ProfilePage from "./components/profile/ProfilePage/ProfilePage";
import EditProfilePage from "./components/profile/EditProfile/EditProfilePage";
import { ProtectedRoute, AdminRoute } from "./service/guard";
import AdminPage from "./components/admin/AdminPage/AdminPage";
import ManageRoomPage from "./components/admin/ManageRoomPage/ManageRoomPage";
import ManageBookingsPage from "./components/admin/ManageBookingsPage/ManageBookingsPage";
import AddRoomPage from "./components/admin/AddRoomPage/AddRoomPage";
import EditRoomPage from "./components/admin/EditRoomPage/EditRoomPage";
import EditBookingPage from "./components/admin/EditBookingPage/EditBookingPage";


function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            {/* <Route path="*" element={<Navigate to="/home" />} /> */}
            {/* Public Route */}
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/rooms" element={<AllRoomsPage />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* authenticathed Routes */}
            <Route
              path="room-details-book/:roomId"
              element={
                <ProtectedRoute>
                  <RoomDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>}/>
            <Route path="/admin/manage-rooms"element={<AdminRoute><ManageRoomPage/></AdminRoute> }/>
            <Route path="/admin/manage-bookings" element={<AdminRoute><ManageBookingsPage/></AdminRoute>}/>
            <Route path="/admin/add-room" element={<AdminRoute><AddRoomPage/></AdminRoute>}/>
            
            <Route path="/admin/edit-room/:roomId" element={<AdminRoute><EditRoomPage/></AdminRoute>}/>
            <Route path="/admin/edit-booking/:bookingCode" element={<AdminRoute><EditBookingPage/></AdminRoute>}/>
          
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
