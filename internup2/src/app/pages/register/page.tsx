'use client'
import { useState } from 'react';
import '../register/register.css'

export default function Register() {
    const [userRole, setUserRole] = useState("");

    return <div>
        <div className='register-container flex justify-center items-center'>
            <div className='block-register'>
                <div className='content-register'>
                    <h1>ลงทะเบียน</h1>
                    <div className='flex flex-col'>
                        <label htmlFor="usename" className='title-usename'>ชื่อ</label>
                        <input className='usename' type="text" placeholder='กรุณกรอก ชื่อผู้ใช้....' />
                    </div>
                    <form className="role">
                        <label htmlFor="userrole" className="selectrole block">ประเภทผู้ใช้</label>
                        <select
                            id="userrole"
                            className="userrole"
                            value={userRole}
                            onChange={(e) => setUserRole(e.target.value)}// กำหนดค่าที่เลือก
                        >
                            <option value="">เลือกประเภทผู้ใช้</option>
                            <option value="TC">อาจารย์</option>
                            <option value="ST">นักศึกษา</option>
                        </select>
                    </form>
                    <div className='flex flex-col'>
                        <label htmlFor="email" className='title-email'>อีเมล</label>
                        <input className='email' type="text" placeholder='กรุณกรอก อีเมล....' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password" className='title-email'>รหัสผ่าน</label>
                        <input className='password' type="text" placeholder='กรุณกรอก รหัสผ่าน....' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password" className='title-email'>ยืนยันรหัสผ่าน</label>
                        <input className='password' type="text" placeholder='กรุณกรอก ยืนยันรหัสผ่าน....' />
                    </div>
                    <div className='btn-register mt-5 flex justify-between'>
                        <button className='Register'>ลงทะเบียน</button>
                        <button className='cancle'>ยกเลิก</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}