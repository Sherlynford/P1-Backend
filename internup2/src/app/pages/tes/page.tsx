'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../profile-student/profile.css';
import Navbarstudent from '../../component/navbar-student/page';
import AuthGuard from '@/app/component/checktoken/AuthGuard';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';

const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const imageUploadUrl = 'http://localhost:8080/api/blogs/upload';
const cvurl = 'http://localhost:8080/api/blogs/upload';
const transcripturl = 'http://localhost:8080/api/blogs/upload';
const url = 'http://localhost:8080/api/students/';

export default function Profile() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
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

    const [imgPreview, setImgPreview] = useState<string>('');
    const [cvPreview, setCvPreview] = useState<string>('');
    const [transcriptPreview, setTranscriptPreview] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

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
        event.preventDefault(); // Prevent the default form submission behavior
    
        const { firstName, lastName, faculty, major, studentID, phoneNumber, profileIMG, cv, transcript } = formData;
        const internStartDate = startDate ? formatDate(startDate.toISOString()) : '';
        const internEndDate = endDate ? formatDate(endDate.toISOString()) : '';
    
        // Show confirmation popup
        const result = await Swal.fire({
            title: 'ต้องการบันทึกข้อมูล',
            text: 'คุณแน่ใจว่าต้องการบันทึกข้อมูล ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก',
            reverseButtons: true,
        });
    
        if (result.isConfirmed) {
            setLoading(true);
    
            try {
                // Create formData for image uploads
                const uploadFiles = async (file: File | null, url: string): Promise<string> => {
                    if (!file) return '';
                
                    const formData = new FormData();
                    formData.append('file', file);
                
                    const response = await fetch(url, {
                        method: 'POST',
                        body: formData,
                    });
                
                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error('File upload error:', response.status, errorText);
                        throw new Error('Failed to upload file.');
                    }
                
                    const responseData = await response.json();
                    return responseData.fileUrls[0]; // ปรับตามโครงสร้างของการตอบกลับ
                };
                
    
                // Upload files and get URLs
                const uploadedProfileIMG = await uploadFiles(profileIMG, imageUploadUrl);
                const uploadedCV = await uploadFiles(cv, cvurl);
                const uploadedTranscript = await uploadFiles(transcript, transcripturl);
    
                // Prepare final JSON data
                const postData = {
                    firstName,
                    lastName,
                    faculty,
                    major,
                    studentID,
                    phoneNumber,
                    internStartDate,
                    internEndDate,
                    cv: uploadedCV,
                    transcript: uploadedTranscript,
                    profileIMG: uploadedProfileIMG,
                };
    
                // Log final post data
                console.log('Post Data:', postData);
    
                // Send JSON data
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postData),
                });
    
                const responseData = await response.json(); // Parse JSON if the response is JSON
                console.log('API response:', responseData);
    
                if (response.ok) {
                    Swal.fire('Success', 'Post created successfully!', 'success');
                    // Reset form fields
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
                    // Redirect or perform any other actions
                    window.location.href = '/pages/profile-student';
                } else {
                    // Handle error response based on the response data format
                    const errorMessage = responseData.message || 'Failed to create post. Please try again.';
                    Swal.fire('Error', errorMessage, 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                Swal.fire('Error', 'Failed to create post. Please try again.', 'error');
            } finally {
                setLoading(false);
            }
        }
    };
    

    return (
        <AuthGuard>
            <>
                <Navbarstudent />
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
                                    <input id="lastName" className='lastname' type="text" placeholder='กรุณากรอกนามสกุล' value={formData.lastName}  onChange={handleChange} />

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
            </>
        </AuthGuard>
    );
}
