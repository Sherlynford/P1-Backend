'use client'; // Indicates this is a client component
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import '../../component/mocuppdf/pdf.css';
import Navbarteacher from '../../component/navbar-Teacher/page';
import PDF from '../../component/mocuppdf/page';
import html2pdf from 'html2pdf.js'; // นำเข้า html2pdf โดยตรง


const PDFGenerator = () => {
    const pdfRef = useRef<HTMLDivElement>(null);

    const generatePDF = async () => {
        if (!pdfRef.current) return;
        const element = pdfRef.current;
    
        const options = {
            margin: 0,
            filename: 'ใบส่งตัว.pdf',
            html2canvas: { scale: 10 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };
    
        // สร้าง instance ใหม่ของ html2pdf
        const pdf = html2pdf().from(element).set(options);
    
        try {
            await pdf.save();
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };
    

    return (
        <div>
            <Navbarteacher />
            <div ref={pdfRef} className="pdf-content">
                <PDF />
            </div>
            <div className='download flex justify-center'>
                <button onClick={generatePDF}>ดาวโหลด์ PDF</button>
                <button onClick={() => window.location.href = '/pages/ShowData'}>ข้อมูลทั้งหมด</button>
            </div>
        </div>
    );
};

export default PDFGenerator;
