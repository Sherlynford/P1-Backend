'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthGuard from '../../component/checktoken/AuthGuard';

export default function TestRouter() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /mainpage-student when the component mounts
    router.push('/mainpage-student');
  }, [router]);

  return <AuthGuard>
    <div>Redirecting...</div>;
  </AuthGuard>
}
