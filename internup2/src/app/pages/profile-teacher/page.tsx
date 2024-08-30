import '../profile-teacher/profile.css';
import Image from 'next/image';
import Navbarteacher from '../../component/navbar-Teacher/page';
import Profileteacher2 from '../../image/img-teacher2.png';


export default function Profile() {
    return <><div>
        <Navbarteacher />

    </div><div className='proflie-teacher'>
            <div className='flex items-center justify-center'>
                <div className='blcok-profile'>
                    <div className='content-profile'>
                        <div className='image-teacher flex justify-center'>
                            <Image src={Profileteacher2} alt='' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="firstname" className='title-firstname'>ชื่อ</label>
                            <input className='firstname' type="text" value={"กิตติพงศ์"} />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="lastname" className='title-lastname'>นามสกุล</label>
                            <input className='lastname' type="text" value={"ยินดีชื่นชม"} />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="studentid" className='title-studentid'>รหัสประจำตัวนิสิต</label>
                            <input className='studentid' type="text" value={"291107"} />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="number-phone" className='title-numberphone'>เบอร์โทรศัพน์</label>
                            <input className='number-phone' type="text" value={"0726175672"} />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="faculty" className='title-faculty'>คณะ</label>
                            <input className='faculty' type="text" value={"เทคโนโลยีสารสนเทศและการสื่อสาร"} />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="major" className='title-major'>สาขา</label>
                            <input className='major' type="text" value={"วิศวกรรมคอมพิวเตอร์"} />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="email" className='title-email'>อีเมล</label>
                            <input className='email' type="text" value={"kittiphog@up.ac.th"} />
                        </div>
                    </div>
                    <div className='btn-edit flex justify-center'>
                        <button className='edit'>แก้ไข</button>
                    </div>
                </div>
            </div>
        </div></>
}