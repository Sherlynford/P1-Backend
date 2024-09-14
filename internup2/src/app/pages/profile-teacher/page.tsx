'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../profile-teacher/profile.css';
import Image from 'next/image';
import Navbarteacher from '../../component/navbar-Teacher/page';
import Profileteacher2 from '../../image/img-teacher2.png'; // Placeholder image, update if necessary

function parseJwt(token: string) {
    try {
        const base64Url = token.split('.')[1]; // Extract the payload from JWT
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Handle Base64 encoding
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload); // Convert the result to a JSON object
    } catch (error) {
        console.error('Invalid JWT token');
        return null;
    }
}

export default function Profile() {
    const [teacherData, setTeacherData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found in localStorage.');
            setLoading(false);
            return;
        } else {
            const decoded = parseJwt(token);
            if (decoded && decoded.teacherProfileId) {
                setId(decoded.teacherProfileId);
            } else {
                setError('Invalid token structure.');
                setLoading(false);
            }
        }
    }, []);

    // Fetch teacher data when the ID is set
    useEffect(() => {
        if (!id) return; // Skip the fetch if `id` is not yet available
        // Fetch teacher data by ID
        axios.get(`http://localhost:8080/api/teachers/${id}`)
            .then(response => {
                setTeacherData(response.data);
            })
            .catch(err => {
                setError('Error fetching teacher data.');
                console.error('Error fetching teacher data:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]); // Only run when `id` changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div>
                <Navbarteacher />
            </div>
            <div className='profile-teacher'>
                <div className='flex items-center justify-center'>
                    <div className='block-profile'>
                        <div className='content-profile'>
                            <div className='image-teacher flex justify-center'>
                                <Image src={Profileteacher2} alt='Profile picture of teacher' />
                            </div>
                            <form className='flex flex-col'>
                                <label htmlFor="firstname" className='title-firstname'>ชื่อ</label>
                                <input className='firstname' type="text" value={teacherData?.firstName || ''} readOnly />

                                <label htmlFor="lastname" className='title-lastname'>นามสกุล</label>
                                <input className='lastname' type="text" value={teacherData?.lastName || ''} readOnly />

                                <label htmlFor="teacherid" className='title-teacherid'>รหัสประจำตัวอาจารย์</label>
                                <input className='teacherid' type="text" value={teacherData?.teacherID || ''} readOnly />

                                <label htmlFor="number-phone" className='title-numberphone'>เบอร์โทรศัพท์</label>
                                <input className='number-phone' type="text" value={teacherData?.phoneNumber || ''} readOnly />

                                <label htmlFor="faculty" className='title-faculty'>คณะ</label>
                                <input className='faculty' type="text" value={teacherData?.faculty || ''} readOnly />

                                <label htmlFor="major" className='title-major'>สาขา</label>
                                <input className='major' type="text" value={teacherData?.major || ''} readOnly />

                                <label htmlFor="email" className='title-email'>อีเมล</label>
                                <input className='email' type="text" value={teacherData?.email || ''} readOnly />
                            </form>
                        </div>
                        <div className='btn-edit flex justify-center'>
                            {teacherData ? (
                                <button className='edit'><a href="/pages/profileedit-teacher">แก้ไข</a></button>
                            ) : (
                                <button className='edit'>บันทึก</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}