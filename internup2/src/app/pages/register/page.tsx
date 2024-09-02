'use client'
import { useState } from 'react';
import '../register/register.css'

export default function Register() {
    const [userRole, setUserRole] = useState("");

    return (
        <div>
            <div className='register-container flex justify-center items-center'>
                <div className='block-register'>
                    <div className='content-register'>
                        <h1>ลงทะเบียน</h1>
                        <div className='flex flex-col'>
                            <label htmlFor="username" className='title-username'>ชื่อ</label>
                            <input id="username" className='username' type="text" placeholder='กรุณากรอก ชื่อผู้ใช้....' />
                        </div>
                        <form className="role">
                            <label htmlFor="userrole" className="selectrole block">ประเภทผู้ใช้</label>
                            <select
                                id="userrole"
                                className="userrole"
                                value={userRole}
                                onChange={(e) => setUserRole(e.target.value)}
                            >
                                <option value="" disabled>เลือกประเภทผู้ใช้</option>
                                <option value="TC">อาจารย์</option>
                                <option value="ST">นักศึกษา</option>
                            </select>
                        </form>
                        <div className='flex flex-col'>
                            <label htmlFor="email" className='title-email'>อีเมล</label>
                            <input id="email" className='email' type="email" placeholder='กรุณากรอก อีเมล....' />
                        
                            <label htmlFor="password" className='title-password'>รหัสผ่าน</label>
                            <input id="password" className='password' type="password" placeholder='กรุณากรอก รหัสผ่าน....' />
                        
                            <label htmlFor="confirm-password" className='title-confirm-password'>ยืนยันรหัสผ่าน</label>
                            <input id="confirm-password" className='password' type="password" placeholder='กรุณากรอก ยืนยันรหัสผ่าน....' />
                        </div>
                        <div className='btn-register mt-5 flex justify-between'>
                            <button className='register'>ลงทะเบียน</button>
                            <button className='cancel'>ยกเลิก</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
