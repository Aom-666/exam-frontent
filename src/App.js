import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Login from './component/login';
import DoctorSearch from './component/DoctorSearch';
import MyAppointments from './component/MyAppointments';
import Navbar from './component/Navbar';
import BookingForm from './component/BookingForm'

// Layout Component ที่จะมี Navbar
const AppLayout = () => {
  const location = useLocation();
  // ไม่แสดง Navbar ในหน้า Login
  const noNavbar = location.pathname === '/login' || location.pathname === '/';

  return (
    <>
      {!noNavbar && <Navbar />}
      <Outlet /> {/* นี่คือที่ที่ Component ลูก (เช่น DoctorSearch) จะถูกแสดงผล */}
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Route สำหรับหน้า Login ที่ไม่มี Navbar */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Routes สำหรับหน้าที่ล็อกอินแล้ว และต้องมี Navbar */}
        <Route element={<AppLayout />}>
          <Route path="/search" element={<DoctorSearch />} />
          <Route path="/appointments" element={<MyAppointments />} />
          <Route path="/book-appointment" element={<BookingForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
