'use client'

import { useEffect, useState } from 'react';
import '../../style/status.css';
import Navbarstudent from '../../component/navbar-student/page';
import Image from 'next/image';
import Imgedit from '../../image/img-edit.png';
import AuthGuard from '../../component/checktoken/AuthGuard';
import axios from 'axios';

const url = 'http://localhost:8080/api/ManualJobApplications/';

export default function ProfileEdit() {
    const [jobApplications, setJobApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [id, setId] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State สำหรับเก็บคำค้นหา

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = parseJwt(token);
        if (decoded) {
            setId(decoded.id || null);
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!id) return;

        // ดึงข้อมูลการสมัครงาน
        axios.get(`${url}?studentId=${id}`)
            .then(response => setJobApplications(response.data))
            .catch(err => {
                setError(err.message);
                console.error("Error fetching job applications:", err);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const parseJwt = (token) => {
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
    };

    // ฟังก์ชันกรองข้อมูลการสมัครงาน
    const filteredApplications = jobApplications.filter(application => {
        const searchLower = searchTerm.toLowerCase();
        return (
            application.organizationName.toLowerCase().includes(searchLower) ||
            application.jobName.toLowerCase().includes(searchLower) ||
            application.applicationStatus.toLowerCase().includes(searchLower)
        );
    });

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
                <div className='Status-student'>
                    <div className='search-intern flex justify-end'>
                        <label htmlFor="search" className='hidden'></label>
                        <input 
                            type="search" 
                            name="search" 
                            id="search" 
                            placeholder='ค้นหาชื่อหน่วยงาน, ชื่อตำแหน่ง, สถานะ'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // อัปเดต state เมื่อมีการพิมพ์
                        />
                    </div>
                    <div className='block-status flex justify-center'>
                        <div className='status-intern'>
                            <table className='table-status'>
                                <thead>
                                    <tr>
                                        <th>ชื่อหน่วยงาน</th>
                                        <th>ชื่อตำแหน่งงาน</th>
                                        <th>อีเมลหน่วยงาน</th>
                                        <th>เบอร์โทรหน่วยงาน</th>
                                        <th>วันที่สมัครฝึกงาน</th>
                                        <th>สถานะฝึกงาน</th>
                                        <th>แก้ไข</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredApplications.map(application => (
                                        <tr key={application.id}>
                                            <td>{application.organizationName}</td>
                                            <td>{application.jobName}</td>
                                            <td>{application.organizationEmail}</td>
                                            <td>{application.organizationPhone}</td>
                                            <td>{new Date(application.applicationDate).toLocaleDateString()}</td>
                                            <td>{application.applicationStatus}</td>
                                         <td>
    <button className='edit'>
        <Image 
            src={Imgedit} 
            alt='image button edit' 
            onClick={(e) => {
                e.preventDefault();
                // Store the selected application in localStorage
                localStorage.setItem('selectedApplication', JSON.stringify(application));
                // Redirect to the edit page
                window.location.href = '/pages/ManualpostEdit';
            }}
        />
    </button>
</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        </AuthGuard>
    );
}
