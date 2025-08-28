// src/pages/MyAppointments.js
import React, { useState, useEffect } from 'react';
import '../css/MyAppointments.css';

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/appointments');
        if (!response.ok) {
          throw new Error('ไม่สามารถดึงข้อมูลนัดหมายได้');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        setError(error.message);
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusClass = (status) => {
    if (status === 'ยืนยันแล้ว') return 'status-confirmed';
    if (status === 'เสร็จสิ้น') return 'status-completed';
    return '';
  };

  if (loading) {
    return <div className="appointments-container"><p className="message">กำลังโหลดข้อมูล...</p></div>;
  }

  if (error) {
    return <div className="appointments-container"><p className="message">เกิดข้อผิดพลาด: {error}</p></div>;
  }

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
                <p><strong>วันที่:</strong> {app.date} | <strong>เวลา:</strong> {app.time} น. </p>
              </div>
              <div className={`appointment-status ${getStatusClass(app.status)}`}>
                {app.status}
              </div>
            </div>
          ))
        ) : (
          <p className="message">คุณยังไม่มีรายการนัดหมาย</p>
        )}
      </main>
    </div>
  );
}

export default MyAppointments;