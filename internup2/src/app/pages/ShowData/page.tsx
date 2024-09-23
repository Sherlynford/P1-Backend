'use client'; // ใช้สำหรับให้รู้ว่าเป็น client component
import React from 'react';
import '../../component/mocuppdf/pdf.css';
import Navbarteacher from '../../component/navbar-Teacher/page';
import DataAll from '../../component/dataall/page'; // นำเข้าคอมโพเนนต์ DataAll

const ShowData = () => {
    return (
        <div>
            <Navbarteacher />
            <DataAll /> 
        </div>
    );
};

export default ShowData;
