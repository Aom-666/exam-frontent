// src/pages/MyAppointments.js

import React, { useState, useEffect } from 'react';
import '../css/MyAppointments.css';

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // ---- ใช้ URL ของคุณตรงนี้ ----
        const response = await fetch('YOUR_MOCK_API_URL/appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // ฟังก์ชันสำหรับเปลี่ยนสีสถานะ
  const getStatusClass = (status) => {
    if (status === 'ยืนยันแล้ว') return 'status-confirmed';
    if (status === 'เสร็จสิ้น') return 'status-completed';
    return '';
  };

  return (
    <div className="appointments-container">
      <header className="appointments-header">
        <h1>นัดหมายของฉัน</h1>
      </header>
      <main className="appointments-list">
        {appointments.length > 0 ? (
          appointments.map(app => (
            <div key={app.id} className="appointment-card">
              <div className="appointment-details">
                <h3>{app.specialty}</h3>
                <p><strong>แพทย์:</strong> {app.doctorName}</p>
                <p><strong>วันที่:</strong> {app.date} | <strong>เวลา:</strong> {app.time}</p>
              </div>
              <div className={`appointment-status ${getStatusClass(app.status)}`}>
                {app.status}
              </div>
            </div>
          ))
        ) : (
          <p className="no-appointments">คุณยังไม่มีรายการนัดหมาย</p>
        )}
      </main>
    </div>
  );
}

export default MyAppointments;