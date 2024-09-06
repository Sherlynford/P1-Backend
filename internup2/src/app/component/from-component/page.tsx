// components/PdfDownload.tsx
import { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const PdfDownload = () => {
    const contentRef = useRef<HTMLDivElement>(null);

    const downloadPDF = () => {
        const element = contentRef.current;

        if (!element) {
            console.error("Content element not found!");
            return;
        }

        const options = {
            filename: 'GFG.pdf',
            margin: 0,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true, // Enable CORS to handle fonts
                letterRendering: true, // Improve font rendering
            },
            jsPDF: {
                unit: 'in',
                format: 'letter',
                orientation: 'portrait'
            }
        };

        html2pdf().set(options).from(element).save().catch((error: any) => {
            console.error("Error generating PDF: ", error);
        });
    };

    return (
        <div>
            <div ref={contentRef} id="content">
                <h1 style={{ color: 'tomato', fontFamily: 'Noto Sans Thai' }}>
                    GeeksForGeeks
                </h1>

                <h2 style={{ fontFamily: 'Noto Sans Thai' }}>Founded by Sandeep Jain</h2>

                <p style={{ fontFamily: 'Noto Sans Thai' }}>A Computer Science portal for geeks.</p>

                <p style={{ fontFamily: 'Noto Sans Thai' }}>
                    It contains well written, well thought
                    and well explained computer science
                    and programming articles.
                </p>
            </div>

            <button className='pt-5' onClick={downloadPDF}>Download PDF</button>
        </div>
    );
};

export default PdfDownload;
