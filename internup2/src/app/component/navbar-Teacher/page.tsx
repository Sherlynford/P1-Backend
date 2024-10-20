"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import './nav-teacher.css';
import Image from 'next/image';
import Logo from '../../image/UP-Logo.png';
import Profileteacher from '../../image/img-teacher.png';
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

export default function NavberLogin() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter(); // Initialize useRouter for redirection
  const [id, setId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // State to store admin status
  const [formData, setFormData] = useState({
    teacherProfile: {
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
      setIsAdmin(decoded.admin || false); // Store isAdmin status from the decoded token
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!id) return;

    axios.get(`http://localhost:8080/api/persons/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        const teacherProfile = response.data.teacherProfile;

        // Check if teacherProfile exists, and update the states accordingly
        if (teacherProfile) {
          setFormData(response.data);
        }
      })
  }, [id]);

  // Handle Logout
  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    router.push('/pages/login'); // Adjust the path if needed
  };

  return (
    <div className='nav-main-teacher flex justify-between items-center'>
      <div className='nav-teacher-left flex items-center'>
        <Image src={Logo} alt='Logo UP' />
        <h1><a href="/pages/mainpage-teacher">INTERN<strong style={{ color: "#92268F" }}>UP</strong></a></h1>
        <p style={{ marginLeft: "83px" }}> <a href="/pages/createpost-teacher">สร้างโพสต์</a></p>
        <p style={{ marginLeft: "40px" }}><a href="/pages/confirm-student">ยืนยันสถานะนิสิต</a></p>
        <p style={{ marginLeft: "40px" }}><a href="/pages/status-student">สถานะนิสิต</a></p>
      </div>
      <div className='nav-teacher-right flex items-center'>
        {/* Conditionally render based on isAdmin */}
        <div className='mr-10'>{isAdmin ? 'แอดมิน' : 'อาจารย์'}</div>
        <button className='profile-teacher-nav' onClick={toggleDropdown}>
          <img src={formData?.teacherProfile?.profileIMG} alt='this is image teacher' />
        </button>
        {isDropdownOpen && (
          <div className='dropdown-menu'>
            <ul>
              <li><a href="/pages/profile-teacher" className='flex items-center justify-center'>โปรไฟล์</a></li>
              <li><a href="#" onClick={handleLogout} className='flex items-center justify-center'>ออกจากระบบ</a></li> {/* Call handleLogout on click */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
