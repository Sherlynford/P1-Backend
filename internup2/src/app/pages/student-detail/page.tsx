'use client';

import { useSearchParams } from 'next/navigation'; // สำหรับการดึง search params
import Navberstudent from "../../component/navbar-student/page";
import '../../style/detail.css';
import Blockdetail from '../../component/blockdetail/page';

export default function Detail() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // ดึง id จาก query params

    return (
        <>
            <Navberstudent />
            <Blockdetail id={id} /> {/* ส่ง id ไปยัง Blockdetail */}
        </>
    );
}
