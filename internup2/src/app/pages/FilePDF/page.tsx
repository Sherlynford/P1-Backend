'use client';
import React, { useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import '../../component/mocuppdf/pdf.css';
import Navbarteacher from '../../component/navbar-Teacher/page';
import PDF from '../../component/mocuppdf/page';

const PDFGenerator = () => {
    const pdfRef = useRef<HTMLDivElement>(null);

  const generatePDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 0,
      filename: 'document.pdf',
      html2canvas: { scale: 15 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div>
      <Navbarteacher />
      <div ref={pdfRef} className="pdf-content">
        <PDF />
      </div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default PDFGenerator;
