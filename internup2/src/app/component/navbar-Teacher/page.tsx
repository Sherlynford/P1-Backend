"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import './nav-teacher.css';
import Image from 'next/image';
import Logo from '../../image/UP-Logo.png';
import Profileteacher from '../../image/img-teacher.png';

export default function NavberLogin() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter(); // Initialize useRouter for redirection

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

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
        <p style={{ marginLeft: "40px" }}>ยืนยันสถานะนิสิต</p>
        <p style={{ marginLeft: "40px" }}>สถานะนิสิต</p>
      </div>
      <div className='nav-teacher-right'>
        <button className='profile-teacher-nav' onClick={toggleDropdown}>
          <Image src={Profileteacher} alt='this is image teacher' />
        </button>
        {isDropdownOpen && (
          <div className='dropdown-menu'>
            <ul>
              <li><a href="/pages/profile-teacher" className='flex items-center justify-center'>Profile</a></li>
              <li><a href="#" onClick={handleLogout} className='flex items-center justify-center'>Logout</a></li> {/* Call handleLogout on click */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
