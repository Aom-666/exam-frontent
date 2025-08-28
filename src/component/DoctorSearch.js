// src/pages/DoctorSearch.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/DoctorSearch.css'; // ไฟล์ CSS ที่จะสร้างในขั้นตอนถัดไป

function DoctorSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleBookAppointment = (doctor) => {
        // สร้าง URL ที่มีข้อมูลของหมอแนบไปด้วย
        const params = new URLSearchParams({
            doctorId: doctor.id,
            doctorName: doctor.name,
            specialty: doctor.specialty,
        });

        // สั่งให้เปลี่ยนหน้าพร้อมส่งข้อมูล
        navigate(`/book-appointment?${params.toString()}`);
    };

    // 3. เปลี่ยน State เริ่มต้นของ filteredDoctors เป็น array ว่าง
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    // State สำหรับเก็บข้อมูลแพทย์ทั้งหมดที่ดึงมาจาก API
    const [allDoctors, setAllDoctors] = useState([]);

    // 4. ใช้ useEffect เพื่อดึงข้อมูลจาก API แค่ครั้งเดียวตอนหน้าเว็บโหลด
    useEffect(() => {
        // ฟังก์ชันสำหรับดึงข้อมูล
        const fetchDoctors = async () => {
            try {
                setLoading(true); // เริ่ม Loading
                setError(null);   // เคลียร์ Error เก่า
                const response = await fetch('/doctors');
                if (!response.ok) {
                    throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
                }
                const data = await response.json();
                setAllDoctors(data); // เก็บข้อมูลแพทย์ทั้งหมดไว้ใน State
                setFilteredDoctors(data); // กำหนดให้แสดงแพทย์ทั้งหมดในตอนแรก
            } catch (error) {
                console.error("Failed to fetch doctors:", error);
                setError(error.message); // หากเกิด Error ให้เก็บข้อความไว้
            } finally {
                setLoading(false); // สิ้นสุด Loading
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

    if (loading) {
        return <div className="state-container"><p>กำลังโหลดข้อมูลแพทย์...</p></div>;
    }

    if (error) {
        return <div className="state-container"><p>เกิดข้อผิดพลาด: {error}</p></div>;
    }

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
                            <button
                                className="appointment-btn"
                                onClick={() => handleBookAppointment(doctor)}>จองนัดหมาย
                            </button>
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