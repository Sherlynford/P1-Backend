'use client';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import '../../style/form.css';
import Swal from 'sweetalert2';

const PdfDownload = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        documentNumber: '',
        dateout:'',
        fullname: '',
        position: '',
        telephone: ''
    });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await Swal.fire({
            title: 'ยืนยันการบันทึกข้อมูล?',
            text: "คุณแน่ใจว่าต้องการบันทึกข้อมูลนี้หรือไม่?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก'
        });
        if (result.isConfirmed) {
        localStorage.setItem('formData', JSON.stringify(formData)); // เก็บข้อมูลใน localStorage
        // นำทางไปยังหน้าถัดไป (ถ้าต้องการ)
        router.push(`/pages/FilePDF`);
        }
    };

    return (
        <div>
            <div ref={contentRef} id="content">
                <div className='flex justify-center'>
                    <div className='formpdf'>
                        <div className='Titleform flex justify-center mt-10'>
                            <h1>ฟอร์มส่งเอกสาร</h1>
                        </div>
                        <form className="mt-10 mb-10 max-w-md mx-auto" onSubmit={handleSubmit}>
                            <div className="relative z-0 w-full mb-5 group">
                                <input 
                                    type="text" 
                                    name="documentNumber" 
                                    id="floating_documentnumber" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer " 
                                    placeholder=" " 
                                    required 
                                    onChange={handleChange}
                                />
                                <label htmlFor="floating_documentnumber" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">หมายเลขเอกสาร(อว.)</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input 
                                    type="text" 
                                    name="fullname" 
                                    id="floating_fullname" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" " 
                                    required 
                                    onChange={handleChange}
                                />
                                <label htmlFor="floating_fullname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">ชื่อคณบดี</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                            <input 
                                type="date" 
                                name="dateout" 
                                id="floating_dateout" 
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" " 
                                required 
                                onChange={handleChange} // Custom date change handler
                            />
                            <label htmlFor="floating_dateout" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">วันที่ออกใบส่งตัว</label>
                        </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input 
                                    type="text" 
                                    name="position" 
                                    id="floating_position" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" " 
                                    required 
                                    onChange={handleChange}
                                />
                                <label htmlFor="floating_position" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">ตำแหน่ง</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input 
                                    type="tel" 
                                    name="telephone" 
                                    id="floating_telephone" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" " 
                                    required 
                                    onChange={handleChange}
                                />
                                <label htmlFor="floating_telephone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">เบอรฺ์โทรติดต่องานวิชาการ(ต่อ)</label>
                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(PdfDownload), { ssr: false });

