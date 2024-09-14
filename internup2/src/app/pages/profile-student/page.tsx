'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../profile-student/profile.css';
import Image from 'next/image';
import Navbarstudent from '../../component/navbar-student/page';
import Profilestudent1 from '../../image/img-student2.png'; // Placeholder image, update if necessary
import IMGCV from '../../image/img-cv.png'; // Placeholder image, update if necessary
import Transcript from '../../image/transcript.jpg'; // Placeholder image, update if necessary

export default function Profile() {
    const [studentData, setStudentData] = useState<any | null>(null); // Changed to null initially
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/students/')
            .then(response => {
                // Assume the response is an array and take the first item
                setStudentData(response.data[0]);
            })
            .catch(error => {
                setError('Error fetching student data.');
                console.error('Error fetching student data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Helper function to format dates
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return <div className="loading">Loading...</div>; // Placeholder for loading state
    }

    if (error) {
        return <div className="error">{error}</div>; // Placeholder for error state
    }

    if (!studentData) {
        return <div>No student data available.</div>; // Fallback if no data is available
    }

    return (
        <>
            <Navbarstudent />
            <section className='profile-student'>
                <div className='flex items-center justify-center'>
                    <div className='block-profile'>
                        <div className='content-profile'>
                            <div className='image-student flex justify-center'>
                                <Image src={Profilestudent1} alt='Profile picture of student' />
                            </div>
                            <form className='flex flex-col'>
                                <label htmlFor="firstname" className='title-firstname'>ชื่อ</label>
                                <input className='firstname' type="text" value={studentData.firstName || ''} readOnly />

                                <label htmlFor="lastname" className='title-lastname'>นามสกุล</label>
                                <input className='lastname' type="text" value={studentData.lastName || ''} readOnly />

                                <label htmlFor="studentid" className='title-studentid'>รหัสประจำตัวนิสิต</label>
                                <input className='studentid' type="text" value={studentData.studentID || ''} readOnly />

                                <label htmlFor="number-phone" className='title-numberphone'>เบอร์โทรศัพท์</label>
                                <input className='number-phone' type="text" value={studentData.phoneNumber || ''} readOnly />

                                <label htmlFor="faculty" className='title-faculty'>คณะ</label>
                                <input className='faculty' type="text" value={studentData.faculty || ''} readOnly />

                                <label htmlFor="major" className='title-major'>สาขา</label>
                                <input className='major' type="text" value={studentData.major || ''} readOnly />

                                <label htmlFor="email" className='title-email'>อีเมล</label>
                                <input className='email' type="text" value={studentData.email || ''} readOnly />

                                <label htmlFor="cv" className='title-cv'>CV</label>
                                <div className='cv'>
                                    <Image src={IMGCV} alt='CV document' />
                                </div>

                                <label htmlFor="transcript" className='title-transcript'>Transcript</label>
                                <div className='transcript'>
                                    <Image src={Transcript} alt='Transcript document' />
                                </div>

                                <label htmlFor="start-intern" className='title-start-intern'>วันที่เริ่มฝึกงาน</label>
                                <input className='start-intern' type="text" value={formatDate(studentData.internStartDate) || ''} readOnly />

                                <label htmlFor="end-intern" className='title-end-intern'>วันที่เลิกฝึกงาน</label>
                                <input className='end-intern' type="text" value={formatDate(studentData.internEndDate) || ''} readOnly />
                            </form>
                        </div>
                        <div className='btn-edit flex justify-center'>
                            <button className='edit'><a href="/pages/profileedit-student">แก้ไข</a></button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
