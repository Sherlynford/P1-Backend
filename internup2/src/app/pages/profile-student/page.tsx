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
import Swal from 'sweetalert2';

function parseJwt(token: string): { studentProfileId?: string } | null {
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

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // แปลงเป็น 'yyyy-MM-dd'
};

const imageUploadUrl = 'http://localhost:8080/api/blogs/upload';
const cvurl = 'http://localhost:8080/api/blogs/upload';
const transcripturl = 'http://localhost:8080/api/blogs/upload';
const url = 'http://localhost:8080/api/students/';

export default function Profile() {
    const [studentData, setStudentData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showHiddenSection, setShowHiddenSection] = useState<boolean>(false);
    const [showAlternativeSection, setShowAlternativeSection] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        faculty: '',
        major: '',
        studentID: '',
        phoneNumber: '',
        internStartDate: '',
        internEndDate: '',
        cv: '',
        transcript: '',
        profileIMG: '',
    });

    const [imgPreview, setImgPreview] = useState('');
    const [cvPreview, setCvPreview] = useState('');
    const [transcriptPreview, setTranscriptPreview] = useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value, type, files } = event.target;
        if (type === 'file') {
            const file = files ? files[0] : null;
            setFormData(prevState => ({
                ...prevState,
                [id]: file || ''
            }));

            // Generate and set file preview
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const result = reader.result as string;
                    if (id === 'imgFile') {
                        setImgPreview(result);
                    } else if (id === 'cvFile') {
                        setCvPreview(result);
                    } else if (id === 'transcriptFile') {
                        setTranscriptPreview(result);
                    }
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        setLoading(true);
    
        try {
            const token = localStorage.getItem('token');
            
            // Upload files and get URLs
            const profileIMGUrl = formData.profileIMG ? await uploadFile(formData.profileIMG, imageUploadUrl) : '';
            const cvUrl = formData.cv ? await uploadFile(formData.cv, cvurl) : '';
            const transcriptUrl = formData.transcript ? await uploadFile(formData.transcript, transcripturl) : '';
    
            // Prepare data to be posted
            const postData = {
                person: {
                    id: id || "", // Use id if available
                },
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phoneNumber,
                faculty: formData.faculty,
                major: formData.major,
                profileIMG: profileIMGUrl,
                cv: cvUrl,
                transcript: transcriptUrl,
                internStartDate: startDate ? formatDate(startDate.toISOString()) : '',
                internEndDate: endDate ? formatDate(endDate.toISOString()) : '',
                studentID: formData.studentID,
            };
    
            // Post data to server
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Add token to request headers
                },
                body: JSON.stringify(postData),
            });
    
            if (response.ok) {
                Swal.fire('สำเร็จ', 'บันทึกข้อมูลสำเร็จ!', 'success');
                setFormData({
                    profileIMG: '',
                    firstName: '',
                    lastName: '',
                    faculty: '',
                    major: '',
                    studentID: '',
                    phoneNumber: '',
                    internStartDate: '',
                    internEndDate: '',
                    cv: '',
                    transcript: '',
                });
                setStartDate(null);
                setEndDate(null);
                setImgPreview('');
                setCvPreview('');
                setTranscriptPreview('');
                window.location.href = '/pages/profile-student';
            } else {
                const responseData = await response.json();
                const errorMessage = responseData.message || 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองอีกครั้ง';
                Swal.fire('ข้อผิดพลาด', errorMessage, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('ข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองอีกครั้ง', 'error');
        } finally {
            setLoading(false);
        }
    };

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
            .then(response => {
                console.log(response.data);
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
                                    <form className='flex flex-col' onSubmit={handleSubmit}>
                                        <div className='image-student flex justify-center'>
                                            <div className="change-img flex items-center justify-center">
                                                <label htmlFor="imgFile" className="change-img flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        {imgPreview ? (
                                                            <img src={imgPreview} alt="Uploaded preview" className="w-full h-full object-cover object-center border-none backgroung-white rounded-lg" />
                                                        ) : (
                                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <input id="imgFile" type="file" className="hidden" onChange={handleChange} />
                                                </label>
                                            </div>
                                        </div>

                                        <label htmlFor="firstName" className='title-firstname'>ชื่อ</label>
                                        <input id="firstName" className='firstname' type="text" placeholder='กรุณากรอกชื่อ' value={formData.firstName} onChange={handleChange} />

                                        <label htmlFor="lastName" className='title-lastName'>นามสกุล</label>
                                        <input id="lastName" className='lastname' type="text" placeholder='กรุณากรอกนามสกุล' value={formData.lastName} onChange={handleChange} />

                                        <label htmlFor="studentID" className='title-studentid'>รหัสประจำตัวนิสิต</label>
                                        <input id="studentID" className='studentid' type="text" placeholder='กรุณากรอกรหัสประจำตัวนิสิต' value={formData.studentID} onChange={handleChange} />

                                        <label htmlFor="phoneNumber" className='title-numberphone'>เบอร์โทรศัพท์</label>
                                        <input id="phoneNumber" className='number-phone' type="text" placeholder='กรุณากรอกเบอร์โทรศัพท์' value={formData.phoneNumber} onChange={handleChange} />

                                        <label htmlFor="faculty" className='title-faculty'>คณะ</label>
                                        <select id="faculty" className="faculty" value={formData.faculty} onChange={handleChange}>
                                            <option value="">เลือกคณะ</option>
                                            <option value="faculty1">คณะเกษตรศาสตร์และทรัพยากรธรรมชาติ</option>
                                            <option value="faculty2">คณะเทคโนโลยีสารสนเทศและการสื่อสาร</option>
                                            <option value="faculty3">คณะทันตแพทยศาสตร์</option>
                                            <option value="faculty4">คณะนิติศาสตร์</option>
                                            <option value="faculty5">คณะบริหารธุรกิจและนิเทศศาสตร์</option>
                                            <option value="faculty6">คณะพยาบาลศาสตร์</option>
                                            <option value="faculty7">คณะพลังงานและสิ่งแวดล้อม</option>
                                            <option value="faculty8">คณะแพทยศาสตร์</option>
                                            <option value="faculty9">คณะเภสัชศาสตร์</option>
                                            <option value="faculty10">คณะรัฐศาสตร์และสังคมศาสตร์</option>
                                            <option value="faculty11">คณะวิทยาศาสตร์</option>
                                            <option value="faculty12">คณะวิทยาศาสตร์การแพทย์</option>
                                            <option value="faculty13">คณะวิศวกรรมศาสตร์</option>
                                            <option value="faculty14">คณะสถาปัตยกรรมศาสตร์และศิลปกรรมศาสตร์</option>
                                            <option value="faculty15">คณะสหเวชศาสตร์</option>
                                            <option value="faculty16">คณะสาธารณสุขศาสตร์</option>
                                            <option value="faculty17">คณะศิลปศาสตร์</option>
                                            <option value="faculty18">วิทยาลัยการจัดการ</option>
                                            <option value="faculty19">วิทยาลัยการศึกษา</option>
                                        </select>

                                        <label htmlFor="major" className='title-major'>สาขา</label>
                                        <input id="major" className='major' type="text" placeholder='กรุณากรอกสาขา' value={formData.major} onChange={handleChange} />

                                        <label htmlFor="cv" className='title-cv'>CV</label>
                                        <div className='cv cv-uploading'>
                                            <div className="upload-img flex items-center justify-center">
                                                <label htmlFor="cvFile" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        {cvPreview ? (
                                                            <img src={cvPreview} alt="Uploaded preview" className="w-full h-full object-cover object-center border-none backgroung-white rounded-lg" />
                                                        ) : (
                                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <input id="cvFile" type="file" className="hidden" onChange={handleChange} />
                                                </label>
                                            </div>
                                        </div>

                                        <label htmlFor="transcript" className='title-transcript'>Transcript</label>
                                        <div className='transcript transcript-uploading'>
                                            <div className="upload-img flex items-center justify-center">
                                                <label htmlFor="transcriptFile" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        {transcriptPreview ? (
                                                            <img src={transcriptPreview} alt="Uploaded preview" className="w-full h-full object-cover object-center border-none backgroung-white rounded-lg" />
                                                        ) : (
                                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <input id="transcriptFile" type="file" className="hidden" onChange={handleChange} />
                                                </label>
                                            </div>
                                        </div>

                                        <label htmlFor="start-intern" className='title-start-intern'>วันที่เริ่มฝึกงาน</label>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            className="start-intern"
                                            placeholderText="กดเลือกวันที่เริ่มฝึกงาน"
                                        />

                                        <label htmlFor="end-intern" className='title-end-intern'>วันที่เลิกฝึกงาน</label>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            className="end-intern"
                                            placeholderText="กดเลือกวันที่เลิกฝึกงาน"
                                        />

                                        <div className='btn-edit flex justify-center'>
                                            <button type='submit' className='edit'>บันทึก</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : null}
            </>
        </AuthGuard>
    );
}
