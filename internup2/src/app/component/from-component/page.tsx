import { useRef } from 'react';
import dynamic from 'next/dynamic';

const PdfDownload = () => {
    const contentRef = useRef();

    const downloadPdf = async () => {
        const html2pdf = (await import('html2pdf.js')).default; // นำเข้าในฟังก์ชัน
        const element = contentRef.current;
        if (element) {
            html2pdf().from(element).save('sample.pdf');
        } else {
            console.error("Element not found");
        }
    };

    return (
        <div>
            <div ref={contentRef} id="content">
                {/* Your content here */}
            </div>
            <div className='buttonpdf flex justify-center'>
                <button className='pt-5' onClick={downloadPdf}>ดาวน์โหลด PDF</button>
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(PdfDownload), { ssr: false });
