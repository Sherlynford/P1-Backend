import './profile.css';
import Image from 'next/image';
import Navbarstudent from '../../component/navbar-student/page';
import Profilestudent1 from '../../image/img-student2.png';


export default function Profile(){
    return <><div>
        <Navbarstudent />

    </div><div className='proflie-student'>
            <div className='flex items-center justify-center'>
                <div className='blcok-profile'>
                    <div className='content-profile'>
                        <div className='image-student flex justify-center'>
                            <Image src={Profilestudent1} alt=''/>
                        </div>
                        <p>ชื่อ</p>
                        <div className='fristname flex items-center'>ฉัตรชัย</div>
                        <p>นามสกุล</p>
                        <div className='lastname flex items-center'>สรพิน</div>
                        <p>รหัสนิสิต</p>
                        <div className='studentid flex items-center'>65022403</div>
                        <p>เบอร์โทรศัพท์</p>
                        <div className='number-phone flex items-center'>0638763456</div>
                        <p>คณะ</p>
                        <div className='faculty flex items-center'>เทคโนโลยีสารสนเทศและการสื่อสาร</div>
                        <p>สาขา</p>
                        <div className='major flex items-center'>วิศวกรรมซอฟต์แวร์</div>
                        <p>อีเมล</p>
                        <div className='email flex items-center'>65022403@up.ac.th</div>
                        <p>CV</p>
                        <div className='cv'></div>
                        <p>Transcript</p>
                        <div className='transcript'></div>
                        <p>วันที่เริ่มฝึกงาน</p>
                        <div className='start-intern flex items-center'>1 พศ. 2567</div>
                        <p>วันที่เลิกฝึกงาน</p>
                        <div className='end-intern flex items-center'>30 กย. 2568</div>
                    </div>
                    <div className='btn-edit flex justify-center'>
                        <button className='edit'>แก้ไข</button>
                    </div>
                </div>
            </div>
        </div></>
}