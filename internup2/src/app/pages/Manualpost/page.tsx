'use client'

import { useEffect, useState } from 'react';
import '../Manualpost/manualpost.css';
import Navbarstudent from '../../component/navbar-student/page';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import AuthGuard from '../../component/checktoken/AuthGuard';
import Swal from 'sweetalert2';
import axios from 'axios';

function parseJwt(token) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Invalid JWT token");
        return null;
    }
}

const url = 'http://localhost:8080/api/ManualJobApplications/';

export default function Manualpost() {
    const [studentData, setStudentData] = useState(null);
    const [studentProfileId, setStudentProfileId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [id, setId] = useState(null);
    const [formData, setFormData] = useState({
        organizationName: '',
        organizationAddress: '',
        organizationEmail: '',
        organizationPhone: '',
        jobName: '',
        applicationStatus: '',
        applicationDate: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found in localStorage.');
            setLoading(false);
            return;
        }
        const decoded = parseJwt(token);
        if (decoded) {
            setId(decoded.id || null);
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!id) return;
        axios.get(`http://localhost:8080/api/persons/${id}`)
            .then(response => setStudentProfileId(response.data.studentProfile.id))
            .catch(err => {
                setError(err.message);
                console.error("Error fetching student data:", err);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prevState => ({
            ...prevState,
            applicationDate: date,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        const token = localStorage.getItem('token');
    
        // ตรวจสอบว่าฟิลด์ที่จำเป็นถูกกรอกครบหรือไม่
        const { organizationName, organizationAddress, organizationEmail, organizationPhone, jobName, applicationStatus, applicationDate } = formData;
        if (!organizationName || !organizationAddress || !organizationEmail || !organizationPhone || !jobName || !applicationStatus || !applicationDate) {
            Swal.fire('ข้อผิดพลาด', 'กรุณากรอกข้อมูลให้ครบทุกฟิลด์', 'error');
            setLoading(false);
            return;
        }
    
        try {
            const response = await axios.post(url, {
                ...formData,
                applicationDate: applicationDate.toISOString().split('T')[0],
                studentProfile: {
                    id: studentProfileId // หรือ ID ของ StudentProfile ที่ถูกต้อง
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            // แสดง SweetAlert เมื่อสำเร็จ
            Swal.fire({
                title: 'สำเร็จ!',
                text: 'การสมัครงานของคุณถูกบันทึกเรียบร้อยแล้ว',
                icon: 'success',
                confirmButtonText: 'ตกลง'
            }).then(() => {
                // เปลี่ยนเส้นทางไปยังหน้า mainpage-student
                window.location.href = '/pages/mainpage-student';
            });
    
        } catch (error) {
            if (error.response) {
                console.error('Error Response:', error.response.data);
                Swal.fire('ข้อผิดพลาด', error.response.data.message || 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองอีกครั้ง', 'error');
            } else {
                console.error('Error:', error);
                Swal.fire('ข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองอีกครั้ง', 'error');
            }
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <AuthGuard>
            <>
                <div>
                    <Navbarstudent />
                </div>
                <div className='Manualpost'>
                    <div className='flex items-center justify-center'>
                        <div className='block-manualpost'>
                            <div className='content-profile'>
                                <div className='manualpost-title flex justify-center'>
                                    <h1>การสมัครงาน</h1>
                                </div>
                                <div className='enter-manual'>
                                    <form className='flex flex-col' onSubmit={handleSubmit}>
                                        <label htmlFor="organizationName" className='title-nameuser'>ชื่อหน่วยงาน</label>
                                        <input id="organizationName" className='nameorganization' type="text" placeholder='กรุณากรอก ชื่อหน่วยงาน....' value={formData.organizationName} onChange={handleChange} />

                                        <label htmlFor="organizationAddress" className='title-Link'>ที่อยู่หน่วยงาน</label>
                                        <input id="organizationAddress" className='location' type="text" placeholder='กรุณากรอก ที่อยู่หน่วยงาน....' value={formData.organizationAddress} onChange={handleChange} />

                                        <label htmlFor="organizationEmail" className='title-emailorganization'>อีเมลหน่วยงาน</label>
                                        <input id="organizationEmail" className='emailorganization' type="text" placeholder='กรุณากรอก อีเมลหน่วยงาน....' value={formData.organizationEmail} onChange={handleChange} />

                                        <label htmlFor="organizationPhone" className='title-phone'>เบอร์หน่วยงาน</label>
                                        <input id="organizationPhone" className='phone' type="text" placeholder='กรุณากรอก เบอร์หน่วยงาน....' value={formData.organizationPhone} onChange={handleChange} />

                                        <label htmlFor="jobName" className='postition-job'>ชื่อตำแหน่งงาน</label>
                                        <input id="jobName" className='postition-job' type="text" placeholder='กรุณากรอก ชื่อตำแหน่งงาน....' value={formData.jobName} onChange={handleChange} />

                                        <label htmlFor="applicationStatus" className='title-status-apply'>สถานะการสมัคร</label>
                                        <select
                                            id="applicationStatus"
                                            className="status-apply"
                                            value={formData.applicationStatus}
                                            onChange={handleChange}
                                        >
                                            <option value="">เลือกสถานะ</option>
                                            <option value="ยอมรับ">ยอมรับ</option>
                                            <option value="ปฏิเสธ">ปฏิเสธ</option>
                                            <option value="ยกเลิก">ยกเลิก</option>
                                        </select>

                                        <label htmlFor="applicationDate">วันที่ยืนสมัครฝึกงาน</label>
                                        <DatePicker
                                            selected={formData.applicationDate}
                                            onChange={handleDateChange}
                                            className="start-intern"
                                            placeholderText="กดที่ปุ่มเพื่อเลือกวันที่"
                                        />

                                        <div className='btn-confirm-cancel flex justify-between mt-4'>
                                            <button type="submit" className='confirm'>ตกลง</button>
                                            <button type="button" className='cancel' onClick={(e) => { e.preventDefault(); window.location.href = '/pages/mainpage-student'; }}>ยกเลิก</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </AuthGuard>
    );
}
