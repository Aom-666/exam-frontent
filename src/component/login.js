import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 2. เรียกใช้งาน useNavigate

  // 3. แก้ไขฟังก์ชัน handleSubmit ใหม่ทั้งหมด
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // ยิง Request ไปยัง Mock API ที่เราสร้างไว้
      const response = await fetch('https://68b032083b8db1ae9c031b25.mockapi.io/login', {
        method: 'POST', // กำหนด method เป็น POST
        headers: {
          'Content-Type': 'application/json',
        },
        // ส่ง email และ password ไปใน body
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // กรณี API ส่ง error กลับมา (เช่น login ผิด)
        throw new Error('Login failed');
      }

      // ดึงข้อมูล token จาก response
      const data = await response.json();
      console.log('Login successful, token:', data.token);

      // (ในโปรเจกต์จริง เราจะเก็บ token นี้ไว้ใน localStorage)

      // ***** นี่คือส่วนสำคัญ: สั่งให้เปลี่ยนหน้าไปที่ '/search' *****
      navigate('/search');

    } catch (error) {
      console.error('An error occurred during login:', error);
      alert('Login ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;