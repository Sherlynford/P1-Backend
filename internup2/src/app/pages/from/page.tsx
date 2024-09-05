'use client'

import '../../style/status.css'
import Navbarteacher from '../../component/navbar-Teacher/page';
import Image from 'next/image';
import PDFMaker from '@/app/component/from-component/page';

export default function From() {

    return <><div>
        <Navbarteacher />

    </div> <div>
      <h1>Welcome to the PDF Maker App</h1>
      <PDFMaker />
    </div></>   
        
}