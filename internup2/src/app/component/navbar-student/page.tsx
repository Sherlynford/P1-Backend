'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import './nav-student.css';
import Image from 'next/image';
import Logo from '../../image/UP-Logo.png';
import Profilestudent from '../../image/img-student.png';

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
    <div className='nav-main-student flex justify-between items-center'>
      <div className='nav-student-left flex items-center'>
        <Image src={Logo} alt='Logo UP' />
        <h1><a href="/pages/mainpage-student">INTERN<strong style={{ color: "#92268F" }}>UP</strong></a></h1>
        <p style={{ marginLeft: "83px" }}><a href="/pages/createpost-student">สร้างโพสต์</a></p>
        <p style={{ marginLeft: "40px" }}>การสมัครงาน</p>
        <p style={{ marginLeft: "40px" }}>สถานะฝึกงาน</p>
      </div>
      <div className='nav-student-right flex items-center'> 
        <div className=' mr-10'>student</div>
        <button className='profile-student-nav' onClick={toggleDropdown}>
          <Image src={Profilestudent} alt='this is image student' />  
        </button>
        {isDropdownOpen && (
          <div className='dropdown-menu-student'>
            <ul>
              <li><a href="/pages/profile-student" className='flex items-center justify-center'>Profile</a></li>
              <li><a href="#" onClick={handleLogout} className='flex items-center justify-center'>Logout</a></li> {/* Call handleLogout on click */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
