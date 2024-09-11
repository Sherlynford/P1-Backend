import './nav-login.css';
import Image from 'next/image';
import Logo from '../../image/UP-Logo.png'

export default function NavberLogin() {
    return <div className='nav-main flex justify-between items-center'>
        <div className='nav-login-left flex items-center'>
            <Image src={Logo} alt='Logo UP'/>
            <h1><a href="/">INTERN<strong style={{ color: "#92268F" }}>UP</strong></a></h1>
            <p style={{marginLeft:"83px"}}><a href="/pages/createpost-login">สร้างโพสต์</a></p>
        </div>
        <div className='nav-login-right'>
            <button className='login'><a href="/pages/login">เข้าสู่ระบบ</a></button>
            <button className='rigister'><a href="/pages/register">ลงทะเบียน</a></button>
        </div>
    </div>;

}