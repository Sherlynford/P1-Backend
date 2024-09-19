'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './nav-student.css';
import Image from 'next/image';
import Logo from '../../image/UP-Logo.png';
import Profilestudent from '../../image/img-student.png';
import axios from 'axios';

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1]; // Extract the payload from JWT
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Handle Base64 encoding
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload); // Convert the result to a JSON object
  } catch (error) {
    console.error("Invalid JWT token");
    return null;
  }
}

const url = 'http://localhost:8080/api/students/';

export default function NavberLogin() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    studentProfile: {
      profileIMG: '',
    },
  });

  
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }
    const decoded = parseJwt(token);
    if (decoded) {
        setId(decoded.id || null);
    } else {
    }
}, []);

  useEffect(() => {
    if (!id) return;

    axios.get(`http://localhost:8080/api/persons/${id}`)
        .then(response => {
            const studentProfile = response.data.studentProfile;

            // Log the full response for debugging

            // Check if studentProfile exists, and update the states accordingly
            if (studentProfile) {
                setFormData(response.data);
            } 
        })
}, [id]);

  // Handle Logout
  const handleLogout = () => {
    // Clear local storage
    localStorage.clear(); 

    router.push('/pages/login');
  };

  return (
    <div className='nav-main-student flex justify-between items-center'>
      <div className='nav-student-left flex items-center'>
        <Image src={Logo} alt='Logo UP' />
        <h1>
          <a href="/pages/mainpage-student">INTERN<strong style={{ color: "#92268F" }}>UP</strong></a>
        </h1>
        <p style={{ marginLeft: "83px" }}>
          <a href="/pages/createpost-student">สร้างโพสต์</a>
        </p>
        <p style={{ marginLeft: "40px" }} onClick={() => router.push('/pages/Manualpost')}>
          การสมัครงาน
        </p>
        <p style={{ marginLeft: "40px" }} onClick={() => router.push('/pages/status-intern')}>
          สถานะฝึกงาน
        </p>
      </div>
      <div className='nav-student-right flex items-center'> 
        <div className='mr-10'>Student</div>
        <button className='profile-student-nav' onClick={toggleDropdown}>
          <img id='profileIMG' src={formData?.studentProfile?.profileIMG} alt='this is image student' />  
        </button>
        {isDropdownOpen && (
          <div className='dropdown-menu-student'>
            <ul>
              <li>
                <a href="/pages/profile-student" className='flex items-center justify-center'>Profile</a>
              </li>
              <li>
                <a href="#" onClick={handleLogout} className='flex items-center justify-center'>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
