import { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import '../../style/form.css';
const PdfDownload = () => {
    const contentRef = useRef<HTMLDivElement>(null);

    const downloadPDF = () => {
        const element = contentRef.current;

        if (!element) {
            console.error("ไม่พบเนื้อหาที่จะดาวน์โหลด!");
            return;
        }

        const options = {
            filename: 'เอกสารของฉัน.pdf',
            margin: 0,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
            },
            jsPDF: {
                unit: 'in',
                format: 'letter',
                orientation: 'portrait'
            }
        };

        html2pdf().set(options).from(element).save().catch((error: any) => {
            console.error("เกิดข้อผิดพลาดในการสร้าง PDF: ", error);
        });
    };

    return (
        <div>
            <div ref={contentRef} id="content">
                <div className='Form-pdf'>
                    <div className='flex justify-center'>
                        <h1>เนื้อหา PDF ของฉัน</h1>
                        <p>นี่คือเอกสาร PDF ตัวอย่างที่สร้างจากเนื้อหา HTML.</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <button className='pt-5' onClick={downloadPDF}>ดาวน์โหลด PDF</button>
            </div>
        </div>
    );
};

export default PdfDownload;
