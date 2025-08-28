// src/pages/BookingForm.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../css/BookingForm.css';

function BookingForm() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [doctorInfo, setDoctorInfo] = useState({
        name: '',
        specialty: '',
    });

    useEffect(() => {
        const doctorName = searchParams.get('doctorName');
        const specialty = searchParams.get('specialty');
        
        // --- เพิ่มส่วนนี้เพื่อตรวจสอบ ---
        console.log('กำลังอ่านข้อมูลจาก URL:', { doctorName, specialty });
        // -----------------------------

        if (doctorName && specialty) {
            setDoctorInfo({ name: doctorName, specialty: specialty });
        }
    }, [searchParams]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!date || !time) {
            alert('กรุณาเลือกวันและเวลาที่ต้องการนัดหมาย');
            return;
        }

        setIsSubmitting(true);

        const newAppointment = {
            doctorName: doctorInfo.name,
            specialty: doctorInfo.specialty,
            date: date,
            time: time,
            status: 'ยืนยันแล้ว'
        };

        console.log('ข้อมูลที่กำลังจะส่งจาก Form:', newAppointment);

        try {
            const response = await fetch('/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAppointment),
            });

            if (!response.ok) {
                throw new Error('การจองล้มเหลว');
            }

            alert('จองนัดหมายสำเร็จ!');
            navigate('/appointments');

        } catch (error) {
            console.error("Failed to create appointment:", error);
            alert('เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่อีกครั้ง');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="booking-container">
            <form className="booking-form" onSubmit={handleSubmit}>
                {/* --- แก้ไขส่วนนี้ --- */}
                <header className="booking-header">
                    <h2>จองนัดหมายกับ<br /> {doctorInfo.name || 'แพทย์'}</h2>
                    <p>สาขา: {doctorInfo.specialty || '...'}</p>
                </header>
                {/* ------------------- */}
                <main className="form-fields">
                    <div className="input-group">
                        <label htmlFor="date">เลือกวันที่</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="time">เลือกเวลา</label>
                        <input
                            type="time"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'กำลังดำเนินการ...' : 'ยืนยันการจอง'}
                    </button>
                </main>
            </form>
        </div>
    );
}

export default BookingForm;