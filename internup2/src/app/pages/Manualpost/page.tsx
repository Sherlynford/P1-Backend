'use client'

import { useState } from 'react';
import '../Manualpost/manualpost.css'
import Navbarstudent from '../../component/navbar-student/page';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import AuthGuard from '../../component/checktoken/AuthGuard';

export default function Manualpost() {
    const [userRole, setUserRole] = useState("");
    const [applyDate, setapplyDate] = useState<Date | null>(null);

    return (<AuthGuard>
        <>
            <div>
                <Navbarstudent />
            </div>
            <div className='Manulpost'>
                <div className='flex items-center justify-center'>
                    <div className='block-manualpost'>
                        <div className='content-profile'>
                            <div className='manualpost-title flex justify-center'>
                                <h1>การสมัครงาน</h1>
                            </div>
                            <div className='enter-manual'>
                                <form className='flex flex-col'>
                                    <label htmlFor="nameorganization" className='title-nameuser'>ชื่อหน่วยงาน</label>
                                    <input id="nameorganization" className='nameorganization' type="text" placeholder='กรุณากรอก ชื่อหน่วยงาน....' aria-label="ชื่อหน่วยงาน" />

                                    <label htmlFor="postition-job" className='postition-job'>ชื่อตำแหน่งงาน</label>
                                    <input id="postition-job" className='postition-job' type="text" placeholder='กรุณากรอก ชื่อตำแหน่งงาน....' aria-label="ชื่อตำแหน่งงาน" />

                                    <label htmlFor="emailorganization" className='title-emailorganization'>อีเมลหน่วยงาน</label>
                                    <input id="emailorganization" className='emailorganization' type="text" placeholder='กรุณากรอก อีเมลหน่วยงาน....' aria-label="อีเมลหน่วยงาน" />

                                    <label htmlFor="phone" className='title-phone'>เบอร์หน่วยงาน</label>
                                    <input id="phone" className='phone' type="text" placeholder='กรุณากรอก เบอร์หน่วยงาน....' aria-label="เบอร์หน่วยงาน" />

                                    <label htmlFor="location" className='title-Link'>ที่อยู่หน่วยงาน</label>
                                    <input id="location" className='location' type="text" placeholder='กรุณากรอก ที่อยู่หน่วยงาน....' aria-label="ลิงค์ที่เที่อยู่หน่วยงานกี่ยวข้อง" />

                                    <label htmlFor="status-apply" className='title-status-apply'>สถานะฝึกงาน</label>
                                    <select
                                        id="status-apply"
                                        className="status-apply"
                                        value={userRole}
                                        onChange={(e) => setUserRole(e.target.value)}
                                    >
                                        <option value="" disabled>เลือกประเภทผู้ใช้</option>
                                        <option value="">ยอมรับ</option>
                                        <option value="">ปฏิเสธ</option>
                                        <option value="">ยกเลิก</option>
                                    </select>
                                    <label htmlFor="date-apply">วันที่สมัครฝึกงาน</label>
                                    <DatePicker
                                        selected={applyDate}
                                        onChange={(date) => setapplyDate((prevState) => date)}
                                        className="start-intern"
                                        placeholderText="Select apply date"
                                    />

                                    <div className='btn-confirm-cancel flex justify-between mt-4'>
                                        <button type="submit" className='confirm'>ตกลง</button>
                                        <button type="button" className='cancel'>ยกเลิก</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        </AuthGuard>
    );
}
