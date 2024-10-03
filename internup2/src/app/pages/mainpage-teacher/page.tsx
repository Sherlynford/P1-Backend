'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../../component/card/page'; // Adjust the path if necessary
import Image from 'next/image';
import Navberteacher from '../../component/navbar-Teacher/page';
import '../../style/mainpage.css';
import imgperson from '../../image/image-person.png';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const router = useRouter();

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (token && userRole) {
      const redirectMap = {
        student: '/pages/mainpage-student',
        teacher: '/pages/mainpage-teacher',
      };
      router.push(redirectMap[userRole] || '/');
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/blogs/')
      .then((res) => {
        const sortedJobs = res.data.sort((a, b) =>
          new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
        );
        setJobs(sortedJobs);
        setFilteredJobs(sortedJobs);
      })
      .catch((err) => {
        console.error(err);
        setError('ไม่สามารถดึงงานได้ กรุณาลองอีกครั้ง');
      });
  }, []);

  useEffect(() => {
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
  };

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navberteacher />
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
                <div className='flex justify-center'>
                <input
                  id="search1"
                  type="search"
                  placeholder="เช่น งาน สถานที่ฝึกงาน หน่วยงาน รายละเอียดงาน ..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                </div>
                <p>
                  <a href="/">
                    INTERN <strong style={{ color: "#92268F" }}>UP</strong> เว็บหาที่ฝึกงาน หางานในเครือและหน่วยงานนอก สำหรับนิสิตนักศึกษา <strong style={{ color: "#92268F" }}>มหาวิทยาลัยพะเยา</strong>
                  </a>
                </p>
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
          {error && <p className="error-message flex justify-center">{error}</p>}
          {currentJobs.length === 0 && !error ? (
            <p className='flex justify-center'>ไม่พบข้อมูล</p>
          ) : (
            currentJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))
          )}
        </div>
        <div className="pagination-job flex justify-center">
        <nav aria-label="Page navigation">
          <ul className="flex items-center -space-x-px h-10 text-base">
            {currentPage > 1 && (
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center"
                  onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                >
                  <span className="sr-only">Previous</span>
                  <svg className="w-5 h-5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                  </svg>
                </a>
              </li>
            )}
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
            {currentPage < totalPages && (
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center"
                  onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                >
                  <span className="sr-only">Next</span>
                  <svg className="w-5 h-5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                </a>
              </li>
            )}
          </ul>
        </nav>
        </div>
      </div>
    </>
  );
}
