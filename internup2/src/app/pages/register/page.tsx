'use client'
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import '../register/register.css';

export default function Register() {
    const [role, setUserRole] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();

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
            username,
            role,
            email,
            password
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
                console.log('Response:', response.data);

                setUsername("");
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
        <div>
            <div className='register-container flex justify-center items-center'>
                <div className='block-register'>
                    <div className='content-register'>
                        <h1>ลงทะเบียน</h1>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col'>
                                <label htmlFor="username" className='title-username'>ชื่อ</label>
                                <input
                                    id="username"
                                    className='username'
                                    type="text"
                                    placeholder='กรุณากรอก ชื่อผู้ใช้....'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="role">
                                <label htmlFor="role" className="selectrole block">ประเภทผู้ใช้</label>
                                <select
                                    id="role"
                                    className="role"
                                    value={role}
                                    onChange={(e) => setUserRole(e.target.value)}
                                >
                                    <option value="" disabled>เลือกประเภทผู้ใช้</option>
                                    <option value="teacher">อาจารย์</option>
                                    <option value="student">นักศึกษา</option>
                                </select>
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="email" className='title-email'>อีเมล</label>
                                <input
                                    id="email"
                                    className='email'
                                    type="email"
                                    placeholder='กรุณากรอก อีเมล....'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="password" className='title-password'>รหัสผ่าน</label>
                                <input
                                    id="password"
                                    className='password'
                                    type="password"
                                    placeholder='กรุณากรอก รหัสผ่าน....'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label htmlFor="confirm-password" className='title-confirm-password'>ยืนยันรหัสผ่าน</label>
                                <input
                                    id="confirm-password"
                                    className='password'
                                    type="password"
                                    placeholder='กรุณากรอก ยืนยันรหัสผ่าน....'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className='btn-register mt-5 flex justify-between'>
                                <button type='submit' className='register'onClick={() => {
                                    setUsername("");
                                    setUserRole("");
                                    setEmail("");
                                    setPassword("");
                                    setConfirmPassword("");
                                }}>ลงทะเบียน</button>
                                <button type='button' className='cancel'><a href="/">ยกเลิก</a></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
