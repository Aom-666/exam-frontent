// src/pages/BookingForm.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../css/BookingForm.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BookingForm() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [doctorInfo, setDoctorInfo] = useState({ name: '', specialty: '' });

    useEffect(() => {
        const doctorName = searchParams.get('doctorName');
        const specialty = searchParams.get('specialty');
        if (doctorName && specialty) {
            setDoctorInfo({ name: doctorName, specialty: specialty });
        }
    }, [searchParams]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedDate) {
            alert('กรุณาเลือกวันและเวลาที่ต้องการนัดหมาย');
            return;
        }

        setIsSubmitting(true);

        const newAppointment = {
            doctorName: doctorInfo.name,
            specialty: doctorInfo.specialty,
            date: selectedDate.toISOString().split('T')[0], // YYYY-MM-DD
            // ปรับรูปแบบเวลาให้เป็น HH:mm (เช่น 06:00) เพื่อให้สอดคล้องกับ DatePicker
            time: selectedDate.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false }),
            status: 'ยืนยันแล้ว'
        };

        console.log('ข้อมูลที่กำลังจะส่งจาก Form:', newAppointment);

        try {
            const response = await fetch('/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
                <header className="booking-header">
                    <h2>จองนัดหมายกับ<br /> {doctorInfo.name || 'แพทย์'}</h2>
                    <p>สาขา: {doctorInfo.specialty || '...'}</p>
                </header>
                <main className="form-fields">
                    <div className="input-group">
                        <label htmlFor="appointment-date">เลือกวันและเวลา</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            showTimeSelect
                            minDate={new Date()}
                            // ปรับ dateFormat ให้แสดง "วัน เดือน ปี เวลา HH:mm น."
                            // เช่น "5 กันยายน 2025 เวลา 06:00 น."
                            dateFormat="d MMMM yyyy เวลา HH:mm น." // เปลี่ยน h:mm aa เป็น HH:mm น.
                            timeFormat="HH:mm" // กำหนด format เวลาเป็น 24-hour (00-23)
                            timeIntervals={15} // สามารถเลือกเวลาเป็นช่วง 15 นาที
                            className="date-picker-input"
                            placeholderText="กรุณาเลือกวันและเวลา"
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