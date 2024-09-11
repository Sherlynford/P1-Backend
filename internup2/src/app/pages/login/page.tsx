'use client'; // Ensure this is at the top of the file

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13
import Image from 'next/image';
import Logologin from '../../image/Logo-login.png';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Log in and get the token
      const loginResponse = await fetch('http://localhost:8080/api/persons/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const loginResult = await loginResponse.json();

      if (loginResponse.ok && loginResult.token) {
        const token = loginResult.token;

        // Step 2: Fetch user information including the role
        const userResponse = await fetch('http://localhost:8080/api/persons/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Use the token to authenticate the request
          },
        });

        const userResult = await userResponse.json();

        if (userResponse.ok) {
          const userRole = userResult.role; // Assuming role is included in the response

          // Step 3: Navigate based on user role
          if (userRole === 'student') {
            router.push('/mainpage-student');
          } else if (userRole === 'teacher') {
            router.push('/mainpage-teacher');
          } else {
            alert('Unknown role');
          }
        } else {
          alert(userResult.message || 'Failed to fetch user role');
        }
      } else {
        alert(loginResult.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='Login-container flex justify-center items-center'>
      <div className='block-login flex'>
        <div className='left-login flex items-center justify-center'>
          <Image src={Logologin} alt='Login logo' />
        </div>
        <div className='right-login'>
          <h1 className='flex justify-center'>เข้าสู่ระบบ</h1>
          <form className='login-main flex flex-col' onSubmit={handleSubmit}>
            <label htmlFor="email">อีเมล</label>
            <input
              type="email"
              id="email"
              placeholder="กรุณากรอก อีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
            />
            
            <label htmlFor="password">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              placeholder="กรุณากรอก รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
            
            <div className='btn-login flex flex-col items-center'>
              <button type="submit" className='login'>เข้าสู่ระบบ</button>
              <p className='flex justify-center'>หรือ</p>
              <a href="/register" className='Register'>ลงทะเบียน</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
