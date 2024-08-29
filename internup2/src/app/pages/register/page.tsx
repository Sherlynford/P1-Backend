import '../register/register.css';
import Image from 'next/image';

export default function Register() {
    return <div>
        <div className='register-container flex justify-center items-center'>
            <div className='block-register'>
                <div className='content-register'>
                    <h1>ลงทะเบียน</h1>
                    <p>ชื่อผู้ใช้งาน</p>
                    <input type="text" placeholder="กรุณากรอกชื่อผู้ใช้งาน" />
                    <form className="role">
                        <label htmlFor="userrole" className="selectrole block">ประเภทผู้ใช้</label>
                        <select id="userrole" className="userrole">
                            <option selected>เลือกประเภทผู้ใช้</option>
                            <option value="TC">อาจารย์</option>
                            <option value="ST">นักศึกษา</option>
                        </select>
                    </form>
                    <p>อีเมล</p>
                    <input type="text" placeholder="กรุณากรอกอีเมล" />
                    <p>รหัสผ่าน</p>
                    <input type="text" placeholder="กรุณากรอกรหัสผ่าน" />
                    <p>ยืนยันรหัสผ่าน</p>
                    <input type="text" placeholder="กรุณายืนยันรหัสผ่าน" />
                    <div className='btn-register mt-5 flex justify-between'>
                    <button className='Register'>ลงทะเบียน</button>
                    <button className='cancle'>ยกเลิก</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}