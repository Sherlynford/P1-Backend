import { GetServerSideProps } from 'next';
import axios from 'axios';
import Detail from '../../component/blockdetail/'; // Update the path to where your Detail component is located

interface Job {
  topic: string;
  organizationName: string;
  dateTime: string;
  detail: string;
  location: string;
  img: string;
  id: string;
  link: string;
}

interface JobPageProps {
  job: Job;
}

const JobPage = ({ job }: JobPageProps) => {
  return <Detail job={job} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query; // Fetch the job ID from the query parameters

  try {
    const response = await axios.get(`http://localhost:8080/api/jobs/${id}`); // Adjust the URL as needed
    return {
      props: {
        job: response.data
      }
    };
  } catch (error) {
    console.error('Error fetching job data:', error);
    return {
      props: {
        job: null // or handle the error as needed
      }
    };
  }
};

export default JobPage;
