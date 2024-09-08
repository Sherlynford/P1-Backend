import Image from "next/image";
import '../../style/detail.css';
import Imgdetail from '../../image/img-job.png'
import Imgcalendar from '../../image/iocn-calendar.png'

export default function Detail() {
    return (
            <div>
                <div className="detail">
                    <div className="flex justify-center w-full">
                        <div className="block-detail">
                            <div className=" flex justify-center items-center w-full">
                                <div className="image-jobdetail">
                                    <img id="img" src="{}" alt="this image job" />
                                    <div className="name-organization w-full text-center"><h1 id="organizationName">Sodium Software Co.</h1></div>
                                </div>
                            </div>
                            <div className="deside-job">
                                <div className="Title-job"><h2 id="topic">รับสมัครนักศึกษาฝึกงานจำนวนมาก: Frontend, Backend</h2></div>
                                <div className="content-detail">
                                    <p id="detail">ลักษณะงาน

                                        •	พัฒนาและทดสอบซอฟต์แวร์ ให้ตรงตาม Requirement เพื่อตอบสนองความต้องการของลูกค้า <br />
                                        •	สามารถแก้ปัญหา และวิเคราะห์สาเหตุ ที่เกิดขึ้นระหว่างการใช้งานได้<br />
                                        •	สามารถทำงานเป็นทีมได้ (ทำงานร่วมกับ Project Co-ordinate, Tester, Project manager)
                                        คุณสมบัติผู้สมัคร<br />
                                        •	Bachelor’s Degree or higher in Computer Science or a related field.<br />
                                        •	สามารถพัฒนาระบบด้วย  JavaScript  HTML   CSS<br />
                                        <br />
                                        เงินเดือน/ค่าตอบแทน  22,000 - 35,000 บาท<br />
                                        <br />
                                        •	สวัสดิการ<br />
                                        •	ประกันสังคม<br />
                                        •	โบนัส<br />
                                        •	 ค่าล่วงเวลา<br />
                                        •	ค่าเดินทาง<br />
                                        •	กองทุนสำรองเลี้ยงชีพ<br />
                                        •	ค่ารักษาพยาบาลปีละ 5,000 บาท<br />

                                    </p>
                                </div>
                                <div className="link-about"> <strong>Link : </strong><a href="http://internth.com/job/5393"><strong id="link">https://internth.com/job/5393</strong></a></div>
                                <div className="Location"><strong>Location :</strong> <span id="location">Bangkok</span></div>
                                <div className="name-date flex">
                                    <div className="name-post">
                                        <p id="username">Chatchai Sorapin</p>
                                    </div>
                                    <div className="date-post flex ml-10">
                                        <Image src={Imgcalendar} alt="date calendar" />
                                        <div id="dateTime" className="dateTime">09/08/2567</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}
