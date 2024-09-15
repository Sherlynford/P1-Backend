'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../profile-student/profile.css';
import Image from 'next/image';
import Navbarstudent from '../../component/navbar-student/page';
import Profilestudent1 from '../../image/img-student2.png'; // Placeholder image
import IMGCV from '../../image/img-cv.png'; // Placeholder image
import Transcript from '../../image/transcript.jpg'; // Placeholder image
import AuthGuard from '@/app/component/checktoken/AuthGuard';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

function parseJwt(token: string): { studentProfileID?: string } | null {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Invalid JWT token', error);
        return null;
    }
}

const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function Profile() {
    const [studentData, setStudentData] = useState<StudentData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showHiddenSection, setShowHiddenSection] = useState<boolean>(false);
    const [showAlternativeSection, setShowAlternativeSection] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found in localStorage.');
            setLoading(false);
            setShowAlternativeSection(true);
            return;
        }
        const decoded = parseJwt(token);
        console.log(decoded);
        if (decoded?.studentProfileId) {
            setId(decoded.studentProfileId);
        } else {
            setLoading(false);
            setShowHiddenSection(false);
            setShowAlternativeSection(true);
        }
    }, []);

    useEffect(() => {
        if (!id) return;

        axios.get(`http://localhost:8080/api/students/${id}`)
            .then(response =>  {
                setStudentData(response.data);
                setShowHiddenSection(true);
                setShowAlternativeSection(false);
            })
            .catch(err => {
                setError('Error fetching student data.');
                console.error('Error fetching student data:', err);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <AuthGuard>
            <>
                <Navbarstudent />
                {showHiddenSection ? (
                    <section className='profile-student section-hidden'>
                        <div className='flex items-center justify-center'>
                            <div className='block-profile'>
                                <div className='content-profile'>
                                    <div className='image-student flex justify-center'>
                                        <Image
                                            src={Profilestudent1}
                                            alt='Profile picture of student'
                                            width={150}
                                            height={150}
                                            layout='fixed'
                                        />
                                    </div>
                                    <form className='flex flex-col'>
                                        <label htmlFor="firstname" className='title-firstname'>ชื่อ</label>
                                        <input className='firstname' type="text" value={studentData?.firstName || ''} readOnly />

                                        <label htmlFor="lastname" className='title-lastname'>นามสกุล</label>
                                        <input className='lastname' type="text" value={studentData?.lastName || ''} readOnly />

                                        <label htmlFor="studentid" className='title-studentid'>รหัสประจำตัวนิสิต</label>
                                        <input className='studentid' type="text" value={studentData?.studentID || ''} readOnly />

                                        <label htmlFor="number-phone" className='title-numberphone'>เบอร์โทรศัพท์</label>
                                        <input className='number-phone' type="text" value={studentData?.phoneNumber || ''} readOnly />

                                        <label htmlFor="faculty" className='title-faculty'>คณะ</label>
                                        <input className='faculty' type="text" value={studentData?.faculty || ''} readOnly />

                                        <label htmlFor="major" className='title-major'>สาขา</label>
                                        <input className='major' type="text" value={studentData?.major || ''} readOnly />

                                        <label htmlFor="email" className='title-email'>อีเมล</label>
                                        <input className='email' type="text" value={studentData?.email || ''} readOnly />

                                        <label htmlFor="cv" className='title-cv'>CV</label>
                                        <div className='cv'>
                                            <Image
                                                src={IMGCV}
                                                alt='CV document'
                                                width={150}
                                                height={150}
                                                layout='fixed'
                                            />
                                        </div>

                                        <label htmlFor="transcript" className='title-transcript'>Transcript</label>
                                        <div className='transcript'>
                                            <Image
                                                src={Transcript}
                                                alt='Transcript document'
                                                width={150}
                                                height={150}
                                                layout='fixed'
                                            />
                                        </div>

                                        <label htmlFor="start-intern" className='title-start-intern'>วันที่เริ่มฝึกงาน</label>
                                        <input className='start-intern' type="text" value={formatDate(studentData?.internStartDate || '')} readOnly />

                                        <label htmlFor="end-intern" className='title-end-intern'>วันที่เลิกฝึกงาน</label>
                                        <input className='end-intern' type="text" value={formatDate(studentData?.internEndDate || '')} readOnly />
                                    </form>
                                </div>
                                <div className='btn-edit flex justify-center'>
                                    <button className='edit'>
                                        <a href="/pages/profileedit-student">แก้ไข</a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : showAlternativeSection ? (
                    <section className='profile-student section-hidden'>
                        <div className='flex items-center justify-center'>
                            <div className='block-profile'>
                                <div className='content-profile'>
                                    <div className='image-student flex justify-center'>
                                        <div className="change-img flex items-center justify-center">
                                        <label htmlFor="dropzone-file" className="change-img flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" />
                                            </label>
                                        </div>
                                    </div>
                                <form className='flex flex-col'>
                                        <label htmlFor="firstname" className='title-firstname'>ชื่อ</label>
                                    <input className='firstname' type="text" />

                                        <label htmlFor="lastname" className='title-lastname'>นามสกุล</label>
                                    <input className='lastname' type="text" />

                                    <label htmlFor="studentid" className='title-studentid'>รหัสประจำตัวนิสิต</label>
                                    <input className='studentid' type="text" />

                                    <label htmlFor="number-phone" className='title-numberphone'>เบอร์โทรศัพท์</label>
                                    <input className='number-phone' type="text" />

                                        <label htmlFor="faculty" className='title-faculty'>คณะ</label>
                                    <select id="faculty" className="faculty">
                                            <option value="">เลือกคณะ</option>
                                        <option value="">คณะเกษตรศาสตร์และทรัพยากรธรรมชาติ</option>
                                        <option value="">คณะเทคโนโลยีสารสนเทศและการสื่อสาร</option>
                                        <option value="">คณะทันตแพทยศาสตร์</option>
                                        <option value="">คณะนิติศาสตร์</option>
                                        <option value="">คณะบริหารธุรกิจและนิเทศศาสตร์</option>
                                        <option value="">คณะพยาบาลศาสตร์</option>
                                        <option value="">คณะพลังงานและสิ่งแวดล้อม</option>
                                        <option value="">คณะแพทยศาสตร์</option>
                                        <option value="">คณะเภสัชศาสตร์</option>
                                        <option value="">คณะรัฐศาสตร์และสังคมศาสตร์</option>
                                        <option value="">คณะวิทยาศาสตร์</option>
                                        <option value="">คณะวิทยาศาสตร์การแพทย์</option>
                                        <option value="">คณะวิศวกรรมศาสตร์</option>
                                        <option value="">คณะสถาปัตยกรรมศาสตร์และศิลปกรรมศาสตร์</option>
                                        <option value="">คณะสหเวชศาสตร์</option>
                                        <option value="">คณะสาธารณสุขศาสตร์</option>
                                        <option value="">คณะศิลปศาสตร์</option>
                                        <option value="">วิทยาลัยการจัดการ</option>
                                        <option value="">วิทยาลัยการศึกษา</option>
                                        </select>

                                        <label htmlFor="major" className='title-major'>สาขา</label>
                                    <input className='major' type="text" />

                                        <label htmlFor="email" className='title-email'>อีเมล</label>
                                    <input className='email' type="text" />

                                        <label htmlFor="cv" className='title-cv'>CV</label>
                                        <div className='cv cv-uploading'>
                                            <div className="upload-img flex items-center justify-center">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                                                    </div>
                                                <input id="dropzone-file" type="file" className="hidden" />
                                                </label>
                                            </div>
                                        </div>

                                        <label htmlFor="transcript" className='title-transcript'>Transcript</label>
                                        <div className='transcript transcript-uploading'>
                                            <div className="upload-img flex items-center justify-center">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                                                    </div>
                                                <input id="dropzone-file" type="file" className="hidden" />
                                                </label>
                                            </div>
                                        </div>

                                        <label htmlFor="start-intern" className='title-start-intern'>วันที่เริ่มฝึกงาน</label>
                                        <DatePicker
                                            selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                            className="start-intern"
                                        placeholderText="Select start date"
                                        />

                                        <label htmlFor="end-intern" className='title-end-intern'>วันที่เลิกฝึกงาน</label>
                                        <DatePicker
                                            selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                            className="end-intern"
                                        placeholderText="Select end date"
                                        />
                                    </form>
                                </div>
                            <div className='btn-edit flex justify-center'>
                                <button className='edit'><a href="/pages/profileedit-student">บันทึก</a></button>
                            </div>
                            </div>
                        </div>
                    </section>
                ): null}
            </>
        </AuthGuard>
    );
}
