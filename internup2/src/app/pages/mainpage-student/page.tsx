'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../../component/card/page'; // Adjust the path if necessary
import Image from "next/image";
import Navberstudent from '../../component/navbar-student/page'; // Use Navberstudent for students
import '../../style/mainpage.css';
import imgperson from '../../image/image-person.png';
import AuthGuard from '../../component/checktoken/AuthGuard'; // Import the AuthGuard component


export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [role, setRole] = useState<'student' | 'teacher' | 'login'>('student'); // Set default role to 'student'

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/blogs/") // Adjust this URL to your API endpoint
      .then((res) => {
        const sortedJobs = res.data.sort((a: Job, b: Job) => {
          return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
        });
        setJobs(sortedJobs);
        setFilteredJobs(sortedJobs); // Initialize filteredJobs with all jobs
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch jobs. Please try again later.");
      });
  }, []);

  useEffect(() => {
    // Filter jobs based on the search query
    const filtered = jobs.filter(job =>
      job.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchQuery, jobs]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log("Search Query Updated:", e.target.value); // Log updated search query
  };

  return (
    <AuthGuard> {/* Wrap your content inside AuthGuard */}
      <Navberstudent /> {/* Use Navberstudent for students */}
      <div>
        <div className="bg-main">
          <div className="block-main flex">
            <div className="left-block">
              <div className="img-work">
                <Image src={imgperson} alt="Person doing work" />
              </div>
            </div>
            <div className="right-block">
              <div className="block-inside">
                <div className="block-content">
                  <h1>ค้นหา ที่ฝึกงานสำหรับนักศึกษา ม.พะเยา</h1>
                  <input
                    id="search1"
                    type="search"
                    placeholder="เช่น งาน สถานที่ฝึกงาน หน่วยงาน รายละเอียดงาน ..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <p>INTERN <strong style={{ color: "#92268F" }}>UP</strong> เว็บหาที่ฝึกงาน หางานในเครือและหน่วยงานนอก สำหรับนิสิตนักศึกษา <strong style={{ color: "#92268F" }}>มหาวิทยาลัยพะเยา</strong> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="job-latest">
        <div className="job-announce">
          <h1>ประกาศรับสมัครงานล่าสุด</h1>
        </div>
        <div>
          {error && <p className="error-message">{error}</p>}
          {filteredJobs.length === 0 && !error ? (
            <p className="no-jobs-message flex justify-center">ไม่มีงาน หน่วยงาน สถานที่ฝึกงาน หรือ รายละเอียดงาน ที่คุณค้นหา</p> // Display message if no jobs match the search query
          ) : (
            filteredJobs.map((job, index) => (
              <JobCard key={index} job={job} role={role} />
            ))
          )}
        </div>
        <div className="show-more-job">
          <div className="flex justify-center">
            <button><a href="/pages/student-list-post">ดูเพิ่มเติม</a></button> {/* Adjust link for students */}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
