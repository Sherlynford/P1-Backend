import '../login/login.css';
import Image from 'next/image';
import Logologin from '../../image/Logo-login.png'

export default function Login() {
    return <div>
        <div className='Login-container flex justify-center items-center'>
            <div className='block-login flex'>
                <div className=''>
                    <div className='left-login flex items-center justify-center'>
                        <Image src={Logologin} alt='logoup login' />
                    </div>
                </div>
                <div className=''>
                    <div className='right-login'>
                        <h1 className='flex justify-center'>เข้าสู่ระบบ</h1>
                        <div className='login-main'>
                            <p>อีเมล</p>
                            <input type="text" placeholder="กรุณากรอก อีเมล" />
                            <p>รหัสผ่าน</p>
                            <input type="text" placeholder="กรุณากรอก รหัสผ่าน" /><br />
                           <div className='btn-login flex flex-col items-center'>
                           <button className='login'>เข้าสู่ระบบ</button>
                            <p className='flex justify-center'>หรือ</p>
                            <button className='Register'>ลงทะเบียน</button>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}