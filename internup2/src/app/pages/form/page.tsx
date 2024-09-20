'use client'

import '../../style/status.css'
import Navbarteacher from '../../component/navbar-Teacher/page';
import Image from 'next/image';
import PDFMaker from '@/app/component/from-component/page';
import AuthGuard from '../../component/checktoken/AuthGuard';

export default function From() {

    return <AuthGuard>
      <div>
        <Navbarteacher />
        <PDFMaker />
      </div>   
    </AuthGuard>
}