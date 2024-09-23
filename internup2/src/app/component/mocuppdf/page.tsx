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
        telephone: '',
    });

    const [selectedStudent, setSelectedStudent] = useState({
        student: {
            studentID: '',
            firstName: '',
            lastName: '',
            organizationName: '',
            jobName: '',
            applicationDate: '',
        },
        teacher: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            faculty: '',
            major: '',
        },
        dateSelected: '',
    });

    const formatThaiDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Bangkok', locale: 'th-TH' };
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('th-TH', { month: 'long' });
        const year = date.getFullYear() + 543; // เพิ่ม 543 เพื่อแปลงเป็นปีไทย
        return `${day} ${month} ${year}`;
    };

    
    useEffect(() => {
        const storedSelectedStudent = localStorage.getItem('selectedStudent');
        if (storedSelectedStudent) {
            const student = JSON.parse(storedSelectedStudent);
            console.log(student); // ตรวจสอบค่าที่ถูกโหลด
            setSelectedStudent(JSON.parse(storedSelectedStudent));
        } else {
            setSelectedStudent({
               student:{
                studentID: '',
                firstName: '',
                lastName: '',
                organizationName: '',
                jobName: '',
                applicationDate: '',
               },
                teacher: {
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    faculty: '',
                    major: '',
                },
                dateSelected: '',
            });
        }
    }, [])
    useEffect(() => {
        const storedFormData = localStorage.getItem('formData');
        if (storedFormData) {
            const application = JSON.parse(storedFormData);
            setFormData({
                documentNumber: application.documentNumber,
                fullname: application.fullname,
                position: application.position,
                telephone: application.telephone,
            });
        }
    }, []);

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
                                <span>{selectedStudent.teacher.faculty}</span> <br />
                                มหาวิทยาลัยพะเยา <br />
                                ตำบลแม่กา อำเภอเมือง <br />
                                จังหวัดพะเยา 56000 <br />
                            </p>
                        </div>
                        <div className='Date flex justify-center'>
                            <p>{formatThaiDate(selectedStudent.dateSelected)}</p>
                        </div>
                        <div className='content-form'>
                            <p>เรื่อง <span>ขอส่งนิสิตเข้ารับการฝึกประสบการณ์ทางด้านวิชาชีพ</span></p>
                            <p>เรียน <span>กรรมการบริษัท {selectedStudent.student.organizationName}</span></p>
                            <p className='paragraph'>
                                <span>ตามที่ {selectedStudent.teacher.faculty} มหาวิทยาลัยพะเยา ได้รับความอนุเคราะห์</span>
                                จากสถานประกอบการของท่านในการรับนิสิตเข้าฝึกประสบการณ์ทางด้านวิชาชีพ โดยมีวัตถุประสงค์
                                เพื่อฝึกทักษะประสบการณ์ทางด้านวิชาชีพร่วมกับสถานประกอบการ ตลอดจนการนำความรู้ที่ได้รับ
                                จากสถานประกอบการมาประยุกต์ใช้กับการศึกษาของนิสิต
                            </p>
                            <p className='paragraph'>
                                <span>ในการนี้ {selectedStudent.teacher.faculty} จึงขอส่ง {selectedStudent.student.firstName} {selectedStudent.student.lastName} นิสิตสาขา{selectedStudent.teacher.major} {selectedStudent.teacher.faculty} เข้าฝึกประสบการณ์ด้านวิชาชีพ ระยะเวลาการฝึกปฏิบัติ
                                {formatThaiDate(selectedStudent.student.internStartDate)} ถึง {formatThaiDate(selectedStudent.student.internEndDate)} </span>
                                ทั้งนี้ มอบหมายให้ {formData.fullname} ตำแหน่ง {formData.position}
                                เป็นผู้ประสานงาน หมายเลขโทรศัพท์ {selectedStudent.teacher.phoneNumber}
                            </p>
                            <p className='notice'>จึงเรียนมาเพื่อโปรดทราบ จะขอบคุณยิ่ง</p>
                            <p className='reason flex justify-center'>ขอแสดงความนับถือ</p>
                            <div className='name-teacher flex flex-col items-center'>
                                <p id='fullname'>{formData.fullname}</p>
                                <p id='position'>{formData.position}</p>
                                <p>{selectedStudent.teacher.faculty}</p>
                            </div>
                            <div className='low-test'>
                                <p>งานวิชาการ <span>{selectedStudent.teacher.faculty}</span></p>
                                <p>โทร 054 466 6666 ต่อ <span id='telephone'>{formData.telephone}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mocuppdf;
