import '../login/login.css';
import Image from 'next/image';
import Logologin from '../../image/Logo-login.png';

export default function Login() {

    return (
        <div className='Login-container flex justify-center items-center'>
            <div className='block-login flex'>
                <div className='left-login flex items-center justify-center'>
                    <Image src={Logologin} alt='Login logo' />
                </div>
                <div className='right-login'>
                    <h1 className='flex justify-center'>เข้าสู่ระบบ</h1>
                    <form className='login-main flex flex-col'>
                        <label htmlFor="email">อีเมล</label>
                        <input type="email" id="email" placeholder="กรุณากรอก อีเมล" required />
                        
                        <label htmlFor="password">รหัสผ่าน</label>
                        <input type="password" id="password" placeholder="กรุณากรอก รหัสผ่าน" required />
                        
                        <div className='btn-login flex flex-col items-center'>
                            <button type="submit" className='login'>เข้าสู่ระบบ</button>
                            <p className='flex justify-center'>หรือ</p>
                            <button type="button" className='Register'>ลงทะเบียน</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
