// src/pages/DoctorSearch.js
import React, { useState, useEffect } from 'react';
import '../css/DoctorSearch.css'; // ไฟล์ CSS ที่จะสร้างในขั้นตอนถัดไป

function DoctorSearch() {
    const [searchTerm, setSearchTerm] = useState('');

    // 3. เปลี่ยน State เริ่มต้นของ filteredDoctors เป็น array ว่าง
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    // State สำหรับเก็บข้อมูลแพทย์ทั้งหมดที่ดึงมาจาก API
    const [allDoctors, setAllDoctors] = useState([]);

    // 4. ใช้ useEffect เพื่อดึงข้อมูลจาก API แค่ครั้งเดียวตอนหน้าเว็บโหลด
    useEffect(() => {
        // ฟังก์ชันสำหรับดึงข้อมูล
        const fetchDoctors = async () => {
            try {
                const response = await fetch('https://68b032083b8db1ae9c031b25.mockapi.io/doctors');
                const data = await response.json();
                setAllDoctors(data); // เก็บข้อมูลแพทย์ทั้งหมดไว้ใน State
                setFilteredDoctors(data); // กำหนดให้แสดงแพทย์ทั้งหมดในตอนแรก
            } catch (error) {
                console.error("Failed to fetch doctors:", error);
                // ในโปรเจกต์จริงควรมีการจัดการ Error ที่ดีกว่านี้
            }
        };

        fetchDoctors();
    }, []); // [] หมายถึงให้ useEffect ทำงานแค่ครั้งเดียวตอน component โหลด

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            setFilteredDoctors(allDoctors); // ถ้าค้นหาว่างเปล่า ให้แสดงแพทย์ทั้งหมด
            return;
        }

        // 5. เปลี่ยนมาฟิลเตอร์จาก State 'allDoctors' แทน
        const searchResult = allDoctors.filter(doctor =>
            doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredDoctors(searchResult);
    };
    return (
        <div className="search-container">
            <header className="search-header">
                <h1>ค้นหาแพทย์</h1>
                <p>ค้นหาแพทย์ผู้เชี่ยวชาญตามสาขาที่คุณต้องการ</p>
                <div className="search-box">
                    <input type="text"
                        placeholder="เช่น อายุรกรรม, ศัลยกรรม..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    <button onClick={handleSearch}>ค้นหา</button>
                </div>
            </header>

            <main className="results-grid">
                {/* --- 5. เปลี่ยนมาใช้ State 'filteredDoctors' ในการแสดงผล --- */}
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map(doctor => (
                        <div key={doctor.id} className="doctor-card">
                            <img src={doctor.image} alt={`รูปของ ${doctor.name}`} />
                            <h3>{doctor.name}</h3>
                            <p className="specialty">{doctor.specialty}</p>
                            <p className="hospital">{doctor.hospital}</p>
                            <button className="appointment-btn">จองนัดหมาย</button>
                        </div>
                    ))
                ) : (
                    // กรณีค้นหาไม่เจอ
                    <p className="no-results">ไม่พบแพทย์ตามสาขาที่ค้นหา</p>
                )}
            </main>
        </div>
    );
}

export default DoctorSearch;