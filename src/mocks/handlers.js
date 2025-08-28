// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'

// นำข้อมูลจำลองมาใช้
const doctors = [
    { "id": 1, "name": "นพ. สมชาย เก่งมาก", "specialty": "อายุรกรรม", "image":"/images/doctor1.jpg" },
    { "id": 2, "name": "พญ. สุจิตรา ใจดี", "specialty": "กุมารเวชศาสตร์", "image":"/images/doctor2.png" },
    { "id": 3, "name": "นพ. วิชัย มีชัย", "specialty": "ศัลยกรรม", "image":"/images/doctor3.png" },
];

const loginResponse = {
    "token": "msw-mock-jwt-token-12345"
};

// --- เพิ่มข้อมูลนัดหมายตรงนี้ ---
const appointments = [
    { "id": 1, "doctorName": "นพ. สมชาย เก่งมาก", "specialty": "อายุรกรรม", "date": "2025-09-05", "time": "10:00", "status": "ยืนยันแล้ว" },
];
// ------------------------------

export const handlers = [
    // จัดการ GET /doctors
    http.get('/doctors', () => {
        return HttpResponse.json(doctors)
    }),

    // จัดการ POST /login
    http.post('/login', () => {
        return HttpResponse.json(loginResponse)
    }),

    // Handler สำหรับดึงข้อมูลนัดหมายทั้งหมด
    http.get('/appointments', () => {
        console.log('[MSW] Returning appointments:', appointments);
        return HttpResponse.json(appointments)
    }),

    // Handler สำหรับสร้างนัดหมายใหม่
    http.post('/appointments', async ({ request }) => {
        const newAppointment = await request.json();
        
        // สร้าง id ใหม่ (วิธีจำลอง)
        const newId = appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1;
        newAppointment.id = newId;

        // เพิ่มข้อมูลใหม่เข้าไปใน array
        appointments.push(newAppointment);

        console.log('[MSW] New appointment created:', newAppointment);
        console.log('[MSW] Current appointments list:', appointments);

        return HttpResponse.json(newAppointment, { status: 201 }); // 201 Created
    }),
]