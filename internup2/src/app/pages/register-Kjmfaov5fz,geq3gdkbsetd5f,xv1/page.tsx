'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import '../register/register.css';

export default function Register() {
    const [role, setUserRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();

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

  // Check auth status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            Swal.fire({
                title: 'Error!',
                text: 'Passwords do not match',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const user = {
            role: 'teacher',
            email,
            password,
            isAdmin: true
        };

        const { isConfirmed } = await Swal.fire({
            title: 'ยืนยัน',
            text: 'ต้องการลงเบียนหรือไหม ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก'
        });

        if (isConfirmed) {
            try {
                const response = await axios.post('http://localhost:8080/api/persons/', user);

                setUserRole("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");

                Swal.fire({
                    title: 'Success!',
                    text: 'ลงทะเบียนสำเร็จ',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    router.push('/pages/login');
                });
            } catch (error) {
                console.error("There was an error registering!", error);
                Swal.fire({
                    title: 'Error!',
                    text: error.response?.data?.message || 'ลงทะเบียนไม่สำเร็จ',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    return (
        <>
        <div>
            <div className='register-container flex justify-center items-center'>
                <div className='block-register'>
                    <div className='content-register'>
                        <h1>ลงทะเบียนสำหรับเจ้าหน้าที่ประจำคณะ</h1>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col'>
                            <label htmlFor="email" className='title-email'>อีเมล<span style={{ color: 'red' }}>*</span></label>
                                <input
                                    id="email"
                                    className='email'
                                    type="email"
                                    placeholder='กรุณากรอก อีเมล(สามารถใส่อีเมลอะไรก็ได้)'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="password" className='title-password'>รหัสผ่าน<span style={{ color: 'red' }}>*</span></label>
                                <input
                                    id="password"
                                    className='password'
                                    type="password"
                                    placeholder='กรุณากรอก รหัสผ่าน(8 ตัวอักษรขึ้นไป)'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label htmlFor="confirm-password" className='title-confirm-password'>ยืนยันรหัสผ่าน<span style={{ color: 'red' }}>*</span></label>
                                <input
                                    id="confirm-password"
                                    className='password'
                                    type="password"
                                    placeholder='กรุณากรอก ยืนยันรหัสผ่าน(8 ตัวอักษรขึ้นไป)'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className='btn-register mt-5 flex justify-between'>
                                <button type='submit' className='register'onClick={() => {}}>ลงทะเบียน</button>
                                <a href="/pages/login"><button type='button' className='cancel'>ยกเลิก</button></a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div></>);
}
