import '../profile-student/profile.css';
import Image from 'next/image';
import Navbarstudent from '../../component/navbar-student/page';
import Profilestudent1 from '../../image/img-student2.png';
import IMGCV from '../../image/img-cv.png';
import Transcript from '../../image/transcript.jpg';

export default function Profile() {
    return (
        <>
            <div>
                <Navbarstudent />
            </div>
            <div className='profile-student'>
                <div className='flex items-center justify-center'>
                    <div className='block-profile'>
                        <div className='content-profile'>
                            <div className='image-student flex justify-center'>
                                <Image src={Profilestudent1} alt='Profile picture of student' />
                            </div>
                            <form className='flex flex-col'>
                                <label htmlFor="firstname" className='title-firstname'>ชื่อ</label>
                                <input className='firstname' type="text" value="ฉัตรชัย" readOnly />
                            
                                <label htmlFor="lastname" className='title-lastname'>นามสกุล</label>
                                <input className='lastname' type="text" value="สรพิน" readOnly />
                            
                                <label htmlFor="studentid" className='title-studentid'>รหัสประจำตัวนิสิต</label>
                                <input className='studentid' type="text" value="65022403" readOnly />
                            
                                <label htmlFor="number-phone" className='title-numberphone'>เบอร์โทรศัพท์</label>
                                <input className='number-phone' type="text" value="0638763456" readOnly />
                            
                                <label htmlFor="faculty" className='title-faculty'>คณะ</label>
                                <input className='faculty' type="text" value="เทคโนโลยีสารสนเทศและการสื่อสาร" readOnly />
                            
                                <label htmlFor="major" className='title-major'>สาขา</label>
                                <input className='major' type="text" value="วิศวกรรมซอฟต์แวร์" readOnly />
                            
                                <label htmlFor="email" className='title-email'>อีเมล</label>
                                <input className='email' type="text" value="65022403@up.ac.th" readOnly />
                            
                                <label htmlFor="cv" className='title-cv'>CV</label>
                                <div className='cv'>
                                    <Image src={IMGCV} alt='CV document' />
                                </div>
                            
                                <label htmlFor="transcript" className='title-transcript'>Transcript</label>
                                <div className='transcript'>
                                    <Image src={Transcript} alt='Transcript document' />
                                </div>
                            
                                <label htmlFor="start-intern" className='title-start-intern'>วันที่เริ่มฝึกงาน</label>
                                <input className='start-intern' type="text" value="1 พศ. 2567" readOnly />
                            
                                <label htmlFor="end-intern" className='title-end-intern'>วันที่เลิกฝึกงาน</label>
                                <input className='end-intern' type="text" value="30 กย. 2568" readOnly />
                            </form>
                        </div>
                        <div className='btn-edit flex justify-center'>
                            <button className='edit'>แก้ไข</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
