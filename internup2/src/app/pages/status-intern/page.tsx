'use client'

import { useEffect, useState } from 'react';
import '../../style/status.css';
import Navbarstudent from '../../component/navbar-student/page';
import Image from 'next/image';
import Imgedit from '../../image/img-edit.png';
import AuthGuard from '../../component/checktoken/AuthGuard';
import axios from 'axios';

const url2 = 'http://localhost:8080/api/students/';

export default function ProfileEdit() {
    const [jobApplications, setJobApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [studentProfileId, setStudentProfileId] = useState(null);
    const [id, setId] = useState(null);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State สำหรับเก็บคำค้นหา
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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
        if (id) {
            axios.get(`http://localhost:8080/api/persons/${id}`)
                .then(response => {
                    const studentProfile = response.data.studentProfile;
                    if (studentProfile && studentProfile.id) {
                        setStudentProfileId(studentProfile.id);
                    }
                })
                .catch(error => {
                    console.error("Error fetching student profile:", error);
                });
        }
    }, [id]);
    useEffect(() => {
        if (!studentProfileId) return; // Ensure studentProfileId is available before making the request

        // Fetch job applications based on studentProfileId
        axios.get(`${url2}${studentProfileId}`)
            .then(response => {
                setJobApplications(response.data.manualJobApplications || []); // Ensure it's an array
            })
            .catch(err => {
                setError(err.message);
                console.error("Error fetching job applications:", err);
            })
            .finally(() => setLoading(false));

    }, [studentProfileId]); // Add studentProfileId to the dependency array

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
    // ฟังก์ชันกรองข้อมูลการสมัครงาน
    const filteredApplications = (jobApplications || []).filter(application => {
        const searchLower = searchTerm.toLowerCase();
        return (
            application.organizationName.toLowerCase().includes(searchLower) ||
            application.jobName.toLowerCase().includes(searchLower) ||
            application.applicationStatus.toLowerCase().includes(searchLower) ||
            application.applicationDate.toLowerCase().includes(searchLower)
        );
    }).sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate))

    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
    const currentItems = filteredApplications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const formatThaiDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Bangkok', locale: 'th-TH' };
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('th-TH', { month: 'long' });
        const year = date.getFullYear() + 543; // แปลงเป็นปีไทย
        return `${day} ${month} ${year}`;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>กรุณาใส่ข้อมูลโปรไฟล์ก่อน</div>;
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
                                    {currentItems.map(application => (
                                        <tr key={application.id}>
                                            <td>{application.organizationName}</td>
                                            <td>{application.jobName}</td>
                                            <td>{application.organizationEmail}</td>
                                            <td>{application.organizationPhone}</td>
                                            <td>{formatThaiDate(application.applicationDate)}</td>
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
                            <div className="pagination-job flex justify-center">
                                <nav aria-label="Page navigation">
                                    <ul className="flex items-center -space-x-px h-10 text-base">
                                        {currentPage > 1 && (
                                            <li>
                                                <a
                                                    href="#"
                                                    className="flex items-center justify-center"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage(currentPage - 1);
                                                    }}
                                                >
                                                    <span className="sr-only">Previous</span>
                                                    <svg
                                                        className="w-5 h-5 rtl:rotate-180"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 6 10"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 1 1 5l4 4"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                        )}

                                        {[...Array(totalPages)].map((_, i) => (
                                            <li key={i} style={{ marginRight: '10px' }}>
                                                <a
                                                    href="#"
                                                    aria-current={currentPage === i + 1 ? "page" : undefined}
                                                    className={`page-job ${currentPage === i + 1 ? 'active' : ''}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage(i + 1);
                                                    }}
                                                >
                                                    {i + 1}
                                                </a>
                                            </li>
                                        ))}

                                        {currentPage < totalPages && (
                                            <li>
                                                <a
                                                    href="#"
                                                    className="flex items-center justify-center"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage(currentPage + 1);
                                                    }}
                                                >
                                                    <span className="sr-only">Next</span>
                                                    <svg
                                                        className="w-5 h-5 rtl:rotate-180"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 6 10"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="m1 9 4-4-4-4"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </AuthGuard>
    );
}
