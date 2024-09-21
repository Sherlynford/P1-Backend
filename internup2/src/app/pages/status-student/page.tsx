'use client';

import '../../style/status.css';
import Navbarteacher from '../../component/navbar-Teacher/page';
import AuthGuard from '../../component/checktoken/AuthGuard';
import { useEffect, useState } from 'react';
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

const url1 = 'http://localhost:8080/api/teachers/';
const url2 = 'http://localhost:8080/api/students/major/';
const urlPerson = 'http://localhost:8080/api/persons/';

export default function Status() {
    const [teacherMajor, setTeacherMajor] = useState(null);
    const [studentData, setStudentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [teacherProfileId, setTeacherProfileId] = useState(null);
    const [id, setId] = useState(null); // Holds the 'id' from token
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = parseJwt(token);
        if (decoded) {
            setId(decoded.id || null); // Set the person id from token
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!id) return;

        axios.get(`${urlPerson}${id}`)
            .then(response => {
                const teacherProfile = response.data.teacherProfile;
                if (teacherProfile && teacherProfile.id) {
                    setTeacherProfileId(teacherProfile.id);
                }
            })
            .catch(err => {
                setError(err.message);
                console.error("Error fetching person profile:", err);
            });
    }, [id]);

    useEffect(() => {
        if (!teacherProfileId) return;

        axios.get(`${url1}${teacherProfileId}`)
            .then(response => {
                setTeacherMajor(response.data.major);
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
            student.manualJobApplications.map(application => ({
                studentID: student.studentID,
                firstName: student.firstName,
                lastName: student.lastName,
                organizationName: application.organizationName,
                jobName: application.jobName,
                applicationDate: application.applicationDate,
                applicationStatus: application.applicationStatus
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
                application.applicationStatus.toLowerCase().includes(searchLower) ||
                application.applicationDate.toLowerCase().includes(searchLower)
            );
        });

    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
    const currentItems = filteredApplications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <AuthGuard>
            <div>
                <Navbarteacher />
            </div>
            <div className="Status-student">
                <div className="search-intern flex justify-end">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="ค้นหาชื่อหน่วยงาน, ชื่อตำแหน่ง, สถานะ,รหัสนิสิต,ชื่อจริง,นามสกุล"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="block-status flex justify-center">
                    <div className="status-intern">
                        <table className="table-status">
                            <thead>
                                <tr>
                                    <th>รหัสประจำตัวนิสิต</th>
                                    <th>ชื่อจริง</th>
                                    <th>นามสกุล</th>
                                    <th>ชื่อหน่วยงาน</th>
                                    <th>ชื่อตำแหน่งงาน</th>
                                    <th>วันที่สมัครฝึกงาน</th>
                                    <th>สถานะฝึกงาน</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((application, index) => (
                                    <tr key={index}>
                                        <td>{application.studentID}</td>
                                        <td>{application.firstName}</td>
                                        <td>{application.lastName}</td>
                                        <td>{application.organizationName}</td>
                                        <td>{application.jobName}</td>
                                        <td>{application.applicationDate}</td>
                                        <td>{application.applicationStatus}</td>
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
                                            onClick={(e) => { e.preventDefault(); currentPage > 1 && setCurrentPage(currentPage - 1); }}
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
                                                onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}
                                            >
                                                {i + 1}
                                            </a>
                                        </li>
                                    ))}
                                    <li>
                                        <a
                                            href="#"
                                            className={`flex items-center justify-center ${currentPage === totalPages ? 'disabled' : ''}`}
                                            onClick={(e) => { e.preventDefault(); currentPage < totalPages && setCurrentPage(currentPage + 1); }}
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
        </AuthGuard>
    );
}
