'use client'

import '../../style/createpost.css';
import NavbarLogin from '../../component/navbar-login/page';
import BlockCreatePost from '../../component/createpost/page';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Createpost() {
    
        const router = useRouter();
          // Function to check authentication state
  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    // If token and role are present, redirect based on role
    if (token && userRole) {
      if (userRole === 'student') {
        router.push('/pages/mainpage-student');
      } else if (userRole === 'teacher') {
        router.push('/pages/mainpage-teacher');
      } else {
        router.push('/'); // Redirect to a default page if the role is unknown
      }
    }
  };
    useEffect(() => {
        checkAuthStatus();
      }, []);
    return (
        <>
            <NavbarLogin />
            <BlockCreatePost />
        </>
    );
}
