// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// 1. เพิ่ม Middlewares พื้นฐานของ json-server
server.use(middlewares);

// 2. สร้าง Route พิเศษสำหรับ POST /login
//    เพื่อให้รองรับการ Login แม้ข้อมูลใน db.json จะเป็น Object
server.post('/login', (req, res) => {
  const db = router.db.getState();
  const { login } = db;
  res.status(200).jsonp(login);
});

// 3. ใช้ Route มาตรฐานของ json-server สำหรับ endpoint อื่นๆ ที่เหลือ
//    (เช่น GET /doctors, GET /appointments)
server.use(router);

// 4. เริ่มรันเซิร์ฟเวอร์ที่ port 3001
server.listen(3001, () => {
  console.log('JSON Server with custom login is running on port 3001');
});