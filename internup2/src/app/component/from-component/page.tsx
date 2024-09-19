import { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import '../../style/form.css';
import Image from 'next/image';
import LogoUp from '../../image/logo.jpg';

const PdfDownload = () => {
    const contentRef = useRef();

    const downloadPdf = () => {
        const element = contentRef.current;
        html2pdf()
            .from(element)
            .save('sample.pdf');
    };


    return (
        <div>
            <div ref={contentRef} id="content">
                <div className='Form-pdf flex justify-center'>
                    <div>
                        <div className='form-box flex'>
                            <div className='LogoUP flex justify-between'>
                                <form action="" className='left-top'>
                                    <label htmlFor="formaddress">ที่</label>
                                    <input className='formaddress' type="text" placeholder='กรุณากรอกข้อมูล' />
                                </form>
                                <Image src={LogoUp} alt='Logo UP' />
                                <p className='right-top'>
                                    คณะเทคโนโลยีสารสนเทศและการสื่อสาร <br />
                                    มหาวิทยาลัยพะเยา <br />
                                    ตำบลแม่กา อำเภอเมือง <br />
                                    จังหวัดพะเยา ๕๖๐๐๐ <br />
                                </p>
                            </div>
                            <form action="Date" className='flex justify-center'>
                                <label htmlFor="formdate" className='hidden'></label>
                                <input className='formdate' type="text" placeholder='กรุณากรอกวันที่ เดือน ปี' />
                            </form>
                            <div className='content-form'>
                                <p><span>เรื่อง </span>ขอส่งนิสิตเข้ารับการฝึกประสบกการณ์ทางด้านวิชาชีพ</p>
                                <p><span>เรียน </span><input type="text" placeholder='กรุณากรอชื่อบริษัท' /></p>
                                <p className='paragraph'><span>ตามที่ คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา ได้รับความอนุเคราะห์</span>
                                    จากสถานประกอบการของท่านในการรับนิสิตเข้าฝึกประสบการณ์ทางด้านวิชาชีพ โดยมีวัตถุประสงค์
                                    เพื่อฝึกทักษะประสบการณ์ทางด้านวิชาชีพร่วมกับสถานประกอบการ ตลอดจนการนำความรู้ที่ได้รับ
                                    จากสถานประกอบการมาประยุกต์ใช้กับการศึกษาของนิสิต และได้พิจารณาคัดเลือกนิสิตเข้าประสบการณ์
                                    ทางด้านวิชาชีพกับสถานประกอบการของท่านเรียบร้อยแล้ว นั้น
                                </p>
                                <p className='paragraph'><span>ในการนี้ คณะเทคโนโลยีสารสนเทศและการสื่อสาร จึงขอส่งนิสิตเข้ารับการฝึกประสบการณ์</span>
                                    ทางด้านวิชาชีพ รายละเอียดตามเอกสารแนบ ทั้งนี้ มอบหมายให้ นายเชาวน์ บ่อแก้ว ตำแหน่ง ประธานหลักสูตร
                                    วิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมซอฟต์แวร์ เป็นผู้ประสานงาน หมายเลขโทรศัพท์ ๐๘๗-๔๙๘ ๕๑๕๘
                                </p>
                                <p>จึงเรียนมาเพื่อโปรดทราบ จะขอบคุณยิ่ง</p>
                                <p>ขอแสดงความนับถือ</p>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <button className='pt-5' onClick={downloadPdf}>ดาวน์โหลด PDF</button>
            </div>
        </div>
    );
};

export default PdfDownload;
