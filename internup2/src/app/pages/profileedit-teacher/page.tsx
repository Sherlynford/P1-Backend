'use client'

import '../profileedit-teacher/edit.css';
import Navbarteacher from '../../component/navbar-Teacher/page';
import { useEffect,useState } from 'react';
import AuthGuard from '../../component/checktoken/AuthGuard';
import Swal from 'sweetalert2';
import axios from 'axios';

function parseJwt(token: string) {
    try {
        const base64Url = token.split(".")[1]; // Extract the payload from JWT
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Handle Base64 encoding
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );

        return JSON.parse(jsonPayload); // Convert the result to a JSON object
    } catch (error) {
        console.error("Invalid JWT token");
        return null;
    }
}

const imageUploadUrl = 'http://localhost:8080/api/teachers/upload';
const url = 'http://localhost:8080/api/teachers/';

export default function ProfileEdit() {
    const [teacherData, setTeacherData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState(null);
    const [teacherProfileId, setTeacherProfileId] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        faculty: "",
        major: "",
        profileIMG: "",
      });

      useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }
        const decoded = parseJwt(token);
        if (decoded) {
            setId(decoded.id || null);
        }
        setLoading(false);
    }, [])

    useEffect(() => {
        if (teacherData) {
            setFormData({
                firstName: teacherData.firstName || '',
                lastName: teacherData.lastName || '',
                faculty: teacherData.faculty || '',
                major: teacherData.major || '',
                phoneNumber: teacherData.phoneNumber || '',
                profileIMG: teacherData.profileIMG || '', 
            });
            setImgPreview(teacherData.profileIMG);

        }
    }, [teacherData]);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/api/persons/${id}`)
                .then(response => {
                    const teacherProfile = response.data.teacherProfile; 
                    setTeacherData(teacherProfile);
                    if (teacherProfile && teacherProfile.id) {
                        setTeacherProfileId(teacherProfile.id);
                    }
                    setFormData({
                        firstName: teacherProfile.firstName || '',
                        lastName: teacherProfile.lastName || '',
                        faculty: teacherProfile.faculty || '',
                        major: teacherProfile.major || '',
                        phoneNumber: teacherProfile.phoneNumber || '',
                        profileIMG: '',
                    });
                })
                .catch(err => {
                    console.error("Error fetching teacher data:", err);
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    const [imgPreview, setImgPreview] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = event.target as HTMLInputElement;
        if (target.type === 'file') {
            const files = target.files;
            const file = files[0];
            let fieldName: string;

            if (target.id === 'imgFile') {
                fieldName = 'profileIMG';
                setImgPreview(URL.createObjectURL(file));
            } 
            if (fieldName) {
                setFormData((prevState: any) => ({
                    ...prevState,
                    [fieldName]: file
                }));
            }
        } else {
            setFormData((prevState: any) => ({
                ...prevState,
                [target.id]: target.value
            }));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const { firstName, lastName, faculty, major, phoneNumber } = formData;
    
        const result = await Swal.fire({
            title: 'ยืนยันการบันทึกข้อมูล?',
            text: "คุณแน่ใจว่าต้องการบันทึกข้อมูลนี้หรือไม่?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก'
        });
        
        if (result.isConfirmed) {
            setLoading(true);
            const uploadPromises: Promise<any>[] = [];
            let errorMessages: string[] = [];
    
            try {
                const token = localStorage.getItem('token');
                
                // File upload handling
                const handleFileUpload = async (file: File, url: string) => {
                    const formData = new FormData();
                    formData.append('files', file);
                    const response = await fetch(url, { method: 'POST', body: formData });
                    const data = await response.json();
                    if (data.fileUrls && data.fileUrls.length > 0) {
                        return data.fileUrls[0];
                    } else {
                        throw new Error('Failed to upload file');
                    }
                };
    
                // Upload files and keep existing URLs if not uploaded
                const profileImgUrl = formData.profileIMG instanceof File
                    ? await handleFileUpload(formData.profileIMG, imageUploadUrl).catch(err => {
                        errorMessages.push(err.message);
                        return teacherData.profileIMG; // Use existing URL
                    })
                    : teacherData.profileIMG;
    
    
                const putData = {
                    person: { id: id || "" },
                    firstName,
                    lastName,
                    phoneNumber,
                    faculty,
                    major,
                    profileIMG: profileImgUrl,

                };
    
                // Send updated data
                const response = await fetch(`${url}${teacherProfileId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(putData),
                });
    
                if (response.ok) {
                    Swal.fire('สำเร็จ', 'บันทึกข้อมูลสำเร็จ!', 'success');
                    resetForm();
                    window.location.href = '/pages/profile-teacher';
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
                if (errorMessages.length > 0) {
                    Swal.fire('ข้อผิดพลาด', errorMessages.join(', '), 'error');
                }
            }
        }
    };

    const resetForm = () => {
        setFormData({
            profileIMG: '',
            firstName: '',
            lastName: '',
            faculty: '',
            major: '',
            phoneNumber: '',
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return <AuthGuard><><div>
        <Navbarteacher />

    </div>
    <section className='profileedit-teacher'>
            <div className='flex items-center justify-center'>
                <div className='block-profileedit'>
                    <div className='content-profileedit'>
                        <form className='edit-profile flex flex-col' onSubmit={handleSubmit}>
                            <div className='image-teacher flex justify-center'>
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
                            <input id="firstName" className='firstname' type="text" placeholder='กรุณากรอกชื่อพร้อมคำนำหน้า' value={formData.firstName} onChange={handleChange} />

                            <label htmlFor="lastName" className='title-lastName'>นามสกุล</label>
                            <input id="lastName" className='lastname' type="text" placeholder='กรุณากรอกนามสกุล' value={formData.lastName} onChange={handleChange} />

                            <label htmlFor="phoneNumber" className='title-numberphone'>เบอร์โทรศัพท์</label>
                            <input id="phoneNumber" className='number-phone' type="text" placeholder='กรุณากรอกเบอร์โทรศัพท์' value={formData.phoneNumber} onChange={handleChange} />

                            <label htmlFor="faculty" className='title-faculty'>คณะ</label>
                            <select id="faculty" className="faculty" value={formData.faculty} onChange={handleChange}>
                                <option value="">เลือกคณะ</option>
                                <option value="คณะเกษตรศาสตร์และทรัพยากรธรรมชาติ">คณะเกษตรศาสตร์และทรัพยากรธรรมชาติ</option>
                                <option value="คณะเทคโนโลยีสารสนเทศและการสื่อสาร">คณะเทคโนโลยีสารสนเทศและการสื่อสาร</option>
                                <option value="คณะทันตแพทยศาสตร์">คณะทันตแพทยศาสตร์</option>
                                <option value="คณะนิติศาสตร์">คณะนิติศาสตร์</option>
                                <option value="คณะบริหารธุรกิจและนิเทศศาสตร์">คณะบริหารธุรกิจและนิเทศศาสตร์</option>
                                <option value="คณะพยาบาลศาสตร์">คณะพยาบาลศาสตร์</option>
                                <option value="คณะพลังงานและสิ่งแวดล้อม">คณะพลังงานและสิ่งแวดล้อม</option>
                                <option value="คณะแพทยศาสตร์">คณะแพทยศาสตร์</option>
                                <option value="คณะเภสัชศาสตร์">คณะเภสัชศาสตร์</option>
                                <option value="คณะรัฐศาสตร์และสังคมศาสตร์">คณะรัฐศาสตร์และสังคมศาสตร์</option>
                                <option value="คณะวิทยาศาสตร์">คณะวิทยาศาสตร์</option>
                                <option value="คณะวิทยาศาสตร์การแพทย์">คณะวิทยาศาสตร์การแพทย์</option>
                                <option value="คณะวิทยาศาสตร์การแพทย์">คณะวิศวกรรมศาสตร์</option>
                                <option value="คณะสถาปัตยกรรมศาสตร์และศิลปกรรมศาสตร์">คณะสถาปัตยกรรมศาสตร์และศิลปกรรมศาสตร์</option>
                                <option value="คณะสหเวชศาสตร์">คณะสหเวชศาสตร์</option>
                                <option value="คณะสาธารณสุขศาสตร์">คณะสาธารณสุขศาสตร์</option>
                                <option value="คณะศิลปศาสตร์">คณะศิลปศาสตร์</option>
                                <option value="วิทยาลัยการจัดการ">วิทยาลัยการจัดการ</option>
                                <option value="วิทยาลัยการศึกษา">วิทยาลัยการศึกษา</option>
                            </select>

                            <label htmlFor="major" className='title-major'>สาขา</label>
                            <input id="major" className='major' type="text" placeholder='กรุณากรอกสาขา ชื่อเต็ม ไม่ย่อ และ ไม่มีการเว้นวรรค' value={formData.major} onChange={handleChange} />

                            <div className='btn-confirm-cancel flex justify-between'>
                                <button className='confirm'>ตกลง</button>
                                <button className='cancel' onClick={(e) => { e.preventDefault(); window.location.href = '/pages/profile-teacher'; }}>ยกเลิก</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </>
        </AuthGuard>
}