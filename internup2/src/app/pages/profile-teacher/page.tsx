import '../profile-teacher/profile.css';
import Image from 'next/image';
import Navbarteacher from '../../component/navbar-Teacher/page';
import Profileteacher2 from '../../image/img-teacher2.png';


export default function Profile(){
    return <><div>
        <Navbarteacher />

    </div><div className='proflie-teacher'>
            <div className='flex items-center justify-center'>
                <div className='blcok-profile'>
                    <div className='content-profile'>
                        <div className='image-teacher flex justify-center'>
                            <Image src={Profileteacher2} alt=''/>
                        </div>
                        <p>ชื่อ</p>
                        <div className='fristname flex items-center'>กิตติพงศ์</div>
                        <p>นามสกุล</p>
                        <div className='lastname flex items-center'>ยินดีชื่นชม</div>
                        <p>รหัสประจำตัวอาจารย์</p>
                        <div className='studentid flex items-center'>291107</div>
                        <p>เบอร์โทรศัพท์</p>
                        <div className='number-phone flex items-center'>0726175672</div>
                        <p>คณะ</p>
                        <div className='faculty flex items-center'>เทคโนโลยีสารสนเทศและการสื่อสาร</div>
                        <p>สาขา</p>
                        <div className='major flex items-center'>วิศวกรรมคอมพิวเตอร์</div>
                        <p>อีเมล</p>
                        <div className='email flex items-center'>kittiphog@up.ac.th</div>
                    </div>
                    <div className='btn-edit flex justify-center'>
                        <button className='edit'>แก้ไข</button>
                    </div>
                </div>
            </div>
        </div></>
}