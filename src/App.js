import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './component/login';
import DoctorSearch from './component/DoctorSearch';
import MyAppointments from './component/MyAppointments';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<DoctorSearch />} />
        <Route path="/appointments" element={<MyAppointments />} />
      </Routes>
    </Router>
  );
}

export default App;
