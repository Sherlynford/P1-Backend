"use client";

import React, { useState } from 'react';
import './nav-teacher.css';
import Image from 'next/image';
import Logo from '../../image/UP-Logo.png'
import Profileteacher from '../../image/img-teacher.png'


export default function NavberLogin() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    return <div className='nav-main-teacher flex justify-between items-center'>
        <div className='nav-teacher-left flex items-center'>
            <Image src={Logo} alt='Logo UP' />
            <h1 style={{}}>INTERN<strong style={{ color: "#92268F" }}>UP</strong></h1>
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
                        <li><a href="#" className='flex items-center justify-center'>Profile</a></li>
                        <li><a href="#" className='flex items-center justify-center'>Logout</a></li>
                    </ul>
                </div>
            )}
        </div>
    </div>;

}