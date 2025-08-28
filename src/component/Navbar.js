// src/component/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // --- เพิ่มส่วนนี้เข้ามา ---
    // ลบ token ออกจาก localStorage
    localStorage.removeItem('authToken');
    // -----------------------

    console.log('User logged out');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/search" className="navbar-brand">
        MediCare
      </Link>
      <div className="navbar-right-group">
        <div className="navbar-links">
          <Link to="/search">ค้นหาแพทย์</Link>
          <Link to="/appointments">นัดหมายของฉัน</Link>
        </div>
        <button onClick={handleLogout} className="logout-btn">ออกจากระบบ</button>
      </div>
    </nav>
  );
}

export default Navbar;