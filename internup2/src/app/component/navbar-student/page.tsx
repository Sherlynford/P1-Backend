"use client";

import React, { useState } from 'react';
import './nav-student.css';
import Image from 'next/image';
import Logo from '../../image/UP-Logo.png';
import Profilestudent from '../../image/img-student.png';

export default function NavberLogin() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <div className='nav-main flex justify-between items-center'>
      <div className='nav-student-left flex items-center'>
        <Image src={Logo} alt='Logo UP' />
        <h1>INTERN<strong style={{ color: "#92268F" }}>UP</strong></h1>
        <p style={{ marginLeft: "83px" }}>สร้างโพสต์</p>
        <p style={{ marginLeft: "40px" }}>การสมัครงาน</p>
        <p style={{ marginLeft: "40px" }}>สถานะฝึกงาน</p>
      </div>
      <div className='nav-student-right'>
        <button className='profile-student-nav' onClick={toggleDropdown}>
          <Image src={Profilestudent} alt='this is image student' />
        </button>
        {isDropdownOpen && (
          <div className='dropdown-menu'>
            <ul>
              <li><a href="#" className='flex items-center justify-center'>Profile</a></li>
              <li><a href="#" className='flex items-center justify-center'>Logout</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
