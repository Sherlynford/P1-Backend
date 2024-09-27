'use client';
import React, { useEffect, useState } from 'react';
import '../../component/dataall/data.css';
import Image from 'next/image';
import LogoUp from '../../image/logo.jpg';

const Mocuppdf = () => {
    const [formData, setFormData] = useState({
        documentNumber: '',
        fullname: '',
        dateout: '',
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
            setSelectedStudent(JSON.parse(storedSelectedStudent));
        } else {
            setSelectedStudent({
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
        }
    }, [])
    useEffect(() => {
        const storedFormData = localStorage.getItem('formData');
        if (storedFormData) {
            const application = JSON.parse(storedFormData);
            setFormData({
                documentNumber: application.documentNumber,
                fullname: application.fullname,
                dateout: application.dateout,
                position: application.position,
                telephone: application.telephone,
            });
        }
    }, []);

    return (
        <div>
            <div className='Form-Data mt-10 mb-10 flex justify-center'>
                <div>
                    <div className='Data-content flex flex-col justify-center'>
                        <div className='Data-title'>
                            <h1>รายะลเอียดข้อมูลที่กรอก</h1>
                        </div>
                        <div className='Data-form'>
                            <h1>หมายเลขเอกสาร {formData.documentNumber}</h1>
                            <h1>ชื่อ {formData.fullname}</h1>
                            <h1>วันที่ {formData.dateout}</h1>
                            <h1>ตําแหน่ง {formData.position}</h1>
                            <h1>เบอร์โทรศัพท์ {formData.telephone}</h1>
                        </div>
                        <div className='Data-title'>
                            <h1>รายละเอียดข้อมูลนักศึกษา</h1>
                        </div>
                        <div className='Data-student'>
                            <h1>รหัสนักศึกษา {selectedStudent.student.studentID}</h1>
                            <h1>ชื่อ {selectedStudent.student.firstName} {selectedStudent.student.lastName}</h1>
                            <h1>สังกัด {selectedStudent.student.organizationName}</h1>
                            <h1>ตําแหน่ง {selectedStudent.student.jobName}</h1>
                            <h1>วันที่สมัคร {formatThaiDate(selectedStudent.student.applicationDate)}</h1>
                        </div>
                        <div className='Data-title'>
                            <h1>รายละเอียดข้อมูลอาจารย์</h1>
                        </div>
                        <div className='Data-teacher'>
                            <h1>คณะ {selectedStudent.teacher.faculty}</h1>
                            <h1>สาขาวิชา {selectedStudent.teacher.major}</h1>
                            <h1>ชื่อ {selectedStudent.teacher.firstName} {selectedStudent.teacher.lastName}</h1>
                            <h1>เบอร์โทรศัพท์ {selectedStudent.teacher.phoneNumber}</h1>
                        </div>
                        <div className='Data-title'>
                            <h1>รายละเอียดข้อมูลอนุมัติ</h1>
                        </div>
                        <div className='Data-Dateofreferral'>
                            <h1>วันที่อนุมัติ {formData.dateout}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mocuppdf;
