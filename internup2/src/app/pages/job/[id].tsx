// pages/job/[id].tsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import '../../style/detail.css';
import Imgcalendar from '../../image/iocn-calendar.png';

// Define the Job interface for consistency
interface Job {
    topic: string;
    organizationName: string;
    dateTime: string;
    detail: string;
    location: string;
    img: string;
    link?: string;
    username?: string;
}

const JobDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [jobDetail, setJobDetail] = useState<Job | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            axios.get<Job>(`http://localhost:8080/api/blogs/${id}`)
                .then(res => {
                    setJobDetail(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Failed to fetch data');
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!jobDetail) return <div>No data found</div>;

    const formattedDate = new Date(jobDetail.dateTime).toLocaleDateString();

    return (
        <div>
            <div className="detail">
                <div className="flex justify-center w-full">
                    <div className="block-detail">
                        <div className="flex justify-center items-center w-full">
                            <div className="image-jobdetail">
                                <Image src={jobDetail.img} alt="Job" width={600} height={400} layout="responsive" />
                                <div className="name-organization w-full text-center">
                                    <h1 id="organizationName">{jobDetail.organizationName}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="deside-job">
                            <div className="Title-job">
                                <h2 id="topic">{jobDetail.topic}</h2>
                            </div>
                            <div className="content-detail">
                                <p id="detail">{jobDetail.detail}</p>
                            </div>
                            {jobDetail.link && (
                                <div className="link-about">
                                    <strong>Link: </strong>
                                    <a href={jobDetail.link} target="_blank" rel="noopener noreferrer">
                                        <strong id="link">{jobDetail.link}</strong>
                                    </a>
                                </div>
                            )}
                            <div className="Location">
                                <strong>Location:</strong> <span id="location">{jobDetail.location}</span>
                            </div>
                            <div className="name-date flex">
                                {jobDetail.username && (
                                    <div className="name-post">
                                        <p id="username">{jobDetail.username}</p>
                                    </div>
                                )}
                                <div className="date-post flex ml-10">
                                    <Image src={Imgcalendar} alt="Date Calendar" width={20} height={20} />
                                    <div id="dateTime" className="dateTime">{formattedDate}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
