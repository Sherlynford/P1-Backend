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
        <a href="/pages/login"><button className='login'>เข้าสู่ระบบ</button></a>
            <a href="/pages/register"><button className='rigister'>ลงทะเบียน</button></a>
        </div>
    </div>;

}