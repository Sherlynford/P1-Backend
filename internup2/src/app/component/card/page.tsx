'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import '../../style/mainpage.css';
import organization from '../../image/icon-organization.png';
import calender from '../../image/iocn-calendar.png';
import location from '../../image/icon-location.png';
import Link from 'next/link'; // Import the Link component from Next.js

// Define the Job interface for consistency
interface Job {
  topic: string;
  organizationName: string;
  dateTime: string;
  detail: string;
  location: string;
  img: string;
  id: string; // Ensure you have an ID in the Job interface
}

// Define the props interface for the JobCard component
interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => (
  <div className="card-container flex-col">
    <div className="card-job flex justify-center">
      <div className="card flex">
        <div className="card-left">
          <div className="img-job">
            <img src={job.img} alt="Job image" />
          </div>
        </div>
        <div className="card-right">
          <div className="content-card">
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
            <div className="lo-read mt-10">
              <div className="flex justify-between mb-3">
                <div className="flex">
                  <Image src={location} alt="Location icon" />
                  <p className="name-location ml-2" id="location">{job.location}</p>
                </div>
                <button id='read' className="read-more mr-5">
                  <Link href='/component/blockdetail'>อ่านเพิ่มเติม</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default JobCard;
