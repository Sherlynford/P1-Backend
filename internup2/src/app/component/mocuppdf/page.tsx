'use client';
import React, { useEffect, useState } from 'react';
import '../../component/mocuppdf/pdf.css';
import Image from 'next/image';
import LogoUp from '../../image/logo.jpg';


const Mocuppdf = () => {
    const [formData, setFormData] = useState({
        documentNumber: '',
        fullname: '',
        position: '',
        telephone: ''
    });

    useEffect(() => {
        // Get the selected application from localStorage
        const storedApplication = localStorage.getItem('formData');
    
        if (storedApplication) {
            const application = JSON.parse(storedApplication);
            
            setFormData({
                documentNumber: application.documentNumber, // Ensure this matches the key used for saving
                fullname: application.fullname,
                position: application.position,
                telephone: application.telephone,
            });
        }
    }, []); // <-- Add empty array here
    
   
    return (
        <div>
            <div className='Form-pdf flex justify-center'>
                <div>
                    <div className='form-box flex'>
                        <div className='LogoUP flex justify-between'>
                            <div className='left-top flex items-center'>
                                <p id='documentnumber'>{formData.documentNumber}</p>
                            </div>
                            <Image src={LogoUp} alt='Logo UP' />
                            <p className='right-top'>
                                คณะเทคโนโลยีสารสนเทศและการสื่อสาร <br />
                                มหาวิทยาลัยพะเยา <br />
                                ตำบลแม่กา อำเภอเมือง <br />
                                จังหวัดพะเยา ๕๖๐๐๐ <br />
                            </p>
                        </div>
                        <div className='Date flex justify-center'>
                            <p>2 กุมภาพันธ์ ๒๕๖7</p>
                        </div>
                        <div className='content-form'>
                            <p>เรื่อง <span>ขอส่งนิสิตเข้ารับการฝึกประสบการณ์ทางด้านวิชาชีพ</span></p>
                            <p>เรียน <span>กรรมการบริษัท ซอฟต์สแควร์ อินเตอร์เนชั่นแนล จำกัด</span></p>
                            <p className='paragraph'>
                                <span>ตามที่ คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา ได้รับความอนุเคราะห์</span>
                                จากสถานประกอบการของท่านในการรับนิสิตเข้าฝึกประสบการณ์ทางด้านวิชาชีพ โดยมีวัตถุประสงค์
                                เพื่อฝึกทักษะประสบการณ์ทางด้านวิชาชีพร่วมกับสถานประกอบการ ตลอดจนการนำความรู้ที่ได้รับ
                                จากสถานประกอบการมาประยุกต์ใช้กับการศึกษาของนิสิต
                            </p>
                            <p className='paragraph'>
                                <span>ในการนี้ คณะเทคโนโลยีสารสนเทศและการสื่อสาร จึงขอส่งนิสิตเข้ารับการฝึกประสบการณ์</span>
                                ทางด้านวิชาชีพ รายละเอียดตามเอกสารแนบ ทั้งนี้ มอบหมายให้ {formData.fullname} ตำแหน่ง {formData.position}
                                วิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมซอฟต์แวร์ เป็นผู้ประสานงาน หมายเลขโทรศัพท์ {formData.telephone}
                            </p>
                            <p className='notice'>จึงเรียนมาเพื่อโปรดทราบ จะขอบคุณยิ่ง</p>
                            <p className='reason flex justify-center'>ขอแสดงความนับถือ</p>
                            <div className='name-teacher flex flex-col items-center'>
                                <p id='fullname'>{formData.fullname}</p>
                                <p id='position'>{formData.position}</p>
                                <p>คณะเทคโนโลยีสารสนเทศและการสื่อสาร</p>
                            </div>
                            <div className='low-test'>
                                <p>งานวิชาการ คณะเทคโนโลยีสารสนเทศและการสื่อสาร</p>
                                <p>โทร <span id='telephone'>{formData.telephone}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mocuppdf;
