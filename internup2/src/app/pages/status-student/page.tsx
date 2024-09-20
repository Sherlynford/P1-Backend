'use client'

import '../../style/status.css'
import Navbarteacher from '../../component/navbar-Teacher/page';
import AuthGuard from '../../component/checktoken/AuthGuard';
import { useEffect, useState } from 'react';
import axios from 'axios';

function parseJwt(token: string) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
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

export default function Status() {
    const [teacherMajor, setTeacherMajor] = useState(null);
    const [studentData, setStudentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [teacherProfileId, setTeacherProfileId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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
                                {filteredApplications.map((application, index) => (
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
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}
