'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../../style/mainpage.css';
import organization from '../../image/icon-organization.png';
import calender from '../../image/iocn-calendar.png';
import location from '../../image/icon-location.png';
import { useEffect, useState } from 'react';

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
type Job = {
    id: number,
    topic: string,
    organizationName: string,
    dateTime: string,
    detail: string,
    img: string,
    location: string
}

const JobCard = ({ job }: { job: Job }) => {
  const [role, setRole] = useState<'student' | 'teacher' | 'login' | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = parseJwt(token);
    if (decoded) {
      setRole(decoded.role || null);
    }
  }, []);

  // Generate detail link based on user role
  const detailLink =
    role === 'student' ? `/pages/student-detail?id=${job.id}`
      : role === 'teacher' ? `/pages/teacher-detail?id=${job.id}`
        : `/pages/login-detail?id=${job.id}`;

  return (
    <div className="card-container flex-col">
      <div className="card-job flex justify-center">
        <div className="card flex">
          <div className="card-left">
            <div className="img-job">
              <img src={job.img} alt="Job image" />
            </div>
          </div>
          <div className="card-right flex">
            <div className="content-card flex flex-col justify-between">
              <div>
                <h1 className="title-card" id="topic">{job.topic}</h1>
                <div className="subtitle-card flex items-center">
                  <div className="flex ml-3">
                    <Image src={organization} alt="Organization icon" />
                    <p className="name-organization ml-2 mr-3" id="organizationName">{job.organizationName}</p>
                    <Image src={calender} alt="Calendar icon" />
                    <p className="date-time ml-2" id="dateTime">{job.dateTime}</p>
                  </div>
                </div>
                <div className="short-detail">
                  <p className="detail-short mt-1" id="detail">{job.detail}</p>
                </div>
              </div>
              <div className="lo-read mt-10">
                <div className="flex justify-between mb-3">
                  <div className="flex">
                    <Image src={location} alt="Location icon" />
                    <p className="name-location ml-2" id="location">{job.location}</p>
                  </div>
                  <button id='read' className="read-more mr-5">
                    <Link href={detailLink}>อ่านเพิ่มเติม</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
