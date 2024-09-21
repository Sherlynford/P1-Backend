'use client'

import '../../style/status.css';
import Navbarteacher from '../../component/navbar-Teacher/page';
import Image from 'next/image';
import Imgedit from '../../image/createFrom.png';
import AuthGuard from '../../component/checktoken/AuthGuard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

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
        console.error("Invalid JWT token", error);
        return null;
    }
}

const url1 = 'http://localhost:8080/api/teachers/';
const url2 = 'http://localhost:8080/api/students/major/';

export default function ProfileEdit() {
    const [teacherMajor, setTeacherMajor] = useState(null);
    const [teacherData, setTeacherData] = useState([]);
    const [jobId, setJobId] = useState(null);
    const [studentData, setStudentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [teacherProfileId, setTeacherProfileId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Adjust this number as needed

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = parseJwt(token);
        if (decoded) {
            setTeacherProfileId(decoded.teacherProfileId || null);
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!teacherProfileId) return;

        axios.get(`${url1}${teacherProfileId}`)
            .then(response => {
                setTeacherMajor(response.data.major);
                setTeacherData(response.data);
            })
            .catch(err => {
                setError(err.message);
                console.error("Error fetching teacher profile:", err);
            })
            .finally(() => setLoading(false));
    }, [teacherProfileId]);

    useEffect(() => {
        if (!teacherMajor) return;

        axios.get(`${url2}${teacherMajor}`)
            .then(response => {
                setStudentData(response.data);
                const jobApplication = response.data
                    .flatMap(student => student.manualJobApplications || [])
                    .find(application => application.applicationStatus === "ยอมรับ" || application.applicationStatus === "ยืนยัน");

                setJobId(jobApplication ? jobApplication.id : null);
            })
            .catch(err => {
                setError(err.message);
                console.error("Error fetching students:", err);
            })
            .finally(() => setLoading(false));
    }, [teacherMajor]);

    const filteredApplications = studentData
        .filter(student => student.manualJobApplications && student.manualJobApplications.length > 0)
        .flatMap(student =>
            student.manualJobApplications
                .filter(application => application.applicationStatus === "ยอมรับ" || application.applicationStatus === "ยืนยัน")
                .map(application => ({
                    studentID: student.studentID,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    organizationName: application.organizationName,
                    jobName: application.jobName,
                    applicationDate: application.applicationDate,
                }))
        )
        .filter(application => {
            const searchLower = searchTerm.toLowerCase();
            return (
                application.studentID.toLowerCase().includes(searchLower) ||
                application.firstName.toLowerCase().includes(searchLower) ||
                application.lastName.toLowerCase().includes(searchLower) ||
                application.organizationName.toLowerCase().includes(searchLower) ||
                application.jobName.toLowerCase().includes(searchLower) ||
                application.applicationDate.toLowerCase().includes(searchLower)
            );
        });

    // Calculate pagination
    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentApplications = filteredApplications.slice(startIndex, startIndex + itemsPerPage);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <AuthGuard>
            <>
                <div>
                    <Navbarteacher />
                </div>
                <div className='Status-student'>
                    <div className='search-intern flex justify-end'>
                        <label htmlFor="search" className='hidden'></label>
                        <input
                            type="search"
                            name="search"
                            id="search"
                            placeholder="ค้นหาชื่อหน่วยงาน, ชื่อตำแหน่ง, รหัสนิสิต, ชื่อจริง, นามสกุล"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className='block-status flex justify-center'>
                        <div className='status-intern'>
                            <table className='table-status'>
                                <thead>
                                    <tr>
                                        <th>รหัสประจำตัวนิสิต</th>
                                        <th>ชื่อจริง</th>
                                        <th>นามสกุล</th>
                                        <th>ชื่อหน่วยงาน</th>
                                        <th>ชื่อตำแหน่งงาน</th>
                                        <th>วันที่สมัครฝึกงาน</th>
                                        <th>ออกหนังสือส่งตัว</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentApplications.map((application, index) => (
                                        <tr key={index}>
                                            <td>{application.studentID}</td>
                                            <td>{application.firstName}</td>
                                            <td>{application.lastName}</td>
                                            <td>{application.organizationName}</td>
                                            <td>{application.jobName}</td>
                                            <td>{application.applicationDate}</td>
                                            <td>
                                                <button className='edit'>
                                                    <Image
                                                        src={Imgedit}
                                                        alt='image button edit'
                                                        width={50}
                                                        height={50}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            Swal.fire({
                                                                title: 'ยืนยันการออกใบส่ง?',
                                                                text: "คุณต้องการจะออกใบส่งตัวใช่หรือไม่?",
                                                                icon: 'warning',
                                                                showCancelButton: true,
                                                                confirmButtonColor: '#3085d6',
                                                                cancelButtonColor: '#d33',
                                                                confirmButtonText: 'ยืนยัน',
                                                                cancelButtonText: 'ยกเลิก'
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    const LocalDateNow = new Date().toLocaleDateString('en-GB');

                                                                    localStorage.setItem('selectedStudent', JSON.stringify({
                                                                        student: application,
                                                                        teacher: teacherData,
                                                                        dateSelected: LocalDateNow
                                                                    }));

                                                                    axios.put(`http://localhost:8080/api/ManualJobApplications/${jobId}/confirm`)
                                                                        .then(response => {
                                                                            console.log("Successfully confirmed student:", response.data);
                                                                            window.location.href = '/pages/form';
                                                                        })
                                                                        .catch(err => {
                                                                            console.error("Error confirming student:", err);
                                                                            Swal.fire('เกิดข้อผิดพลาด', 'การยืนยันนักศึกษาไม่สำเร็จ กรุณาลองอีกครั้ง', 'error');
                                                                        });
                                                                }
                                                            });
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
                                        <li>
                                            <a
                                                href="#"
                                                className={`flex items-center justify-center ${currentPage === 1 ? 'disabled' : ''}`}
                                                onClick={(e) => { e.preventDefault(); currentPage > 1 && handlePageChange(currentPage - 1); }}
                                            >
                                                <span className="sr-only">Previous</span>
                                                <svg className="w-5 h-5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                                </svg>
                                            </a>
                                        </li>
                                        {[...Array(totalPages)].map((_, i) => (
                                            <li key={i}>
                                                <a
                                                    href="#"
                                                    aria-current={currentPage === i + 1 ? "page" : undefined}
                                                    className={`page-job ${currentPage === i + 1 ? 'active' : ''}`}
                                                    onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}
                                                >
                                                    {i + 1}
                                                </a>
                                            </li>
                                        ))}
                                        <li>
                                            <a
                                                href="#"
                                                className={`flex items-center justify-center ${currentPage === totalPages ? 'disabled' : ''}`}
                                                onClick={(e) => { e.preventDefault(); currentPage < totalPages && handlePageChange(currentPage + 1); }}
                                            >
                                                <span className="sr-only">Next</span>
                                                <svg className="w-5 h-5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                                </svg>
                                            </a>
                                        </li>
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
