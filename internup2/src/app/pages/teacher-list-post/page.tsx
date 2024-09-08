'use client'
import Navbarteacher from "../../component/navbar-Teacher/page";
import '../../style/mainpage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../../component/card/page'; // Adjust the path if necessary

interface Job {
    topic: string;
    organizationName: string;
    dateTime: string;
    detail: string;
    location: string;
    img: string;
}

export default function Home() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(5); // Number of items per page

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

    useEffect(() => {
        setCurrentPage(1); // Reset to the first page whenever the filtered jobs change
    }, [filteredJobs]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Calculate the indices for the current page
    const indexOfLastJob = currentPage * itemsPerPage;
    const indexOfFirstJob = indexOfLastJob - itemsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

    return (
        <>
            <div>
                <Navbarteacher />
            </div>
            <div className="job-latest">
                <div className="job-announce flex justify-between">
                    <h1>ประกาศรับสมัครรับสมัครงานทั้งหมด <span>{filteredJobs.length}</span> post </h1>
                    <label htmlFor="search" className="hidden"></label>
                    <input type="search" name="searchjob" id="search" placeholder="ค้นหาชื่อบริษัท, สถานที่ทำงาน" 
                    value={searchQuery}
                    onChange={handleSearchChange}/>
                </div>
                <div>
                    {error && <p className="error-message">{error}</p>}
                    {currentJobs.length === 0 && !error ? (
                        <p>No jobs found</p>
                    ) : (
                        currentJobs.map((job, index) => (
                            <JobCard key={index} job={job} />
                        ))
                    )}
                </div>
                <div className="pagination-job flex justify-center">
                    <nav aria-label="Page navigation">
                        <ul className="flex items-center -space-x-px h-10 text-base">
                            <li>
                                <a 
                                    href="#"
                                    className={`flex items-center justify-center ${currentPage === 1 ? 'disabled' : ''}`}
                                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
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
                                        onClick={() => handlePageChange(i + 1)}
                                    >
                                        {i + 1}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a 
                                    href="#"
                                    className={`flex items-center justify-center ${currentPage === totalPages ? 'disabled' : ''}`}
                                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
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
        </>
    );
}
