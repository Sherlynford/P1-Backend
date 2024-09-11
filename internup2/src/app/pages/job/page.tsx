'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function TestRouter() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /mainpage-student when the component mounts
    router.push('/mainpage-student');
  }, [router]);

  return <div>Redirecting...</div>;
}
