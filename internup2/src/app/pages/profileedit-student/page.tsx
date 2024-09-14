'use client'

import '../profileedit-student/edit.css';
import Navbarstudent from '../../component/navbar-student/page';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import AuthGuard from '../../component/checktoken/AuthGuard';

export default function ProfileEdit() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return <AuthGuard><><div>
        <Navbarstudent />

    </div><div className='proflieedit-student'>
            <div className='flex items-center justify-center'>
                <div className='block-profileedit'>
                    <div className='content-profile'>
                        <div className='image-student flex justify-center'>
                            <div className="change-img flex items-center justify-center">
                                <label htmlFor="dropzone-file" className="change-img flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>

                        </div>
                        <div className='edit-profile flex flex-col'>
                            <label htmlFor="firstname" className='title-firstname'>ชื่อ</label>
                            <input className='firstname' type="text" placeholder='กรุณกรอก ชื่อผู้ใช้....' />
                            <label htmlFor="lastname" className='title-lastname'>นามสกุล</label>
                            <input className='lastname' type="text" placeholder='กรุณากรอก นามสกุล....' />
                            <label htmlFor="studentid" className='title-studentid'>รหัสประจำตัวนิสิต</label>
                            <input className='studentid' type="text" placeholder='กรุณากรอก รหัสประจำตัวนิสิต....' />
                            <label htmlFor="faculty" className='title-faculty'>คณะ</label>
                            <select id="faculty" className="faculty">
                                <option value="">เลือกคณะ</option>
                                <option value="">คณะเกษตรศาสตร์และทรัพยากรธรรมชาติ</option>
                                <option value="">คณะเทคโนโลยีสารสนเทศและการสื่อสาร</option>
                                <option value="">คณะทันตแพทยศาสตร์</option>
                                <option value="">คณะนิติศาสตร์</option>
                                <option value="">คณะบริหารธุรกิจและนิเทศศาสตร์</option>
                                <option value="">คณะพยาบาลศาสตร์</option>
                                <option value="">คณะพลังงานและสิ่งแวดล้อม</option>
                                <option value="">คณะแพทยศาสตร์</option>
                                <option value="">คณะเภสัชศาสตร์</option>
                                <option value="">คณะรัฐศาสตร์และสังคมศาสตร์</option>
                                <option value="">คณะวิทยาศาสตร์</option>
                                <option value="">คณะวิทยาศาสตร์การแพทย์</option>
                                <option value="">คณะวิศวกรรมศาสตร์</option>
                                <option value="">คณะสถาปัตยกรรมศาสตร์และศิลปกรรมศาสตร์</option>
                                <option value="">คณะสหเวชศาสตร์</option>
                                <option value="">คณะสาธารณสุขศาสตร์</option>
                                <option value="">คณะศิลปศาสตร์</option>
                                <option value="">วิทยาลัยการจัดการ</option>
                                <option value="">วิทยาลัยการศึกษา</option>
                            </select>
                            <label htmlFor="major" className='title-major'>สาขา</label>
                            <input className='major' type="text" placeholder='กรุณากรอก สาขา....' />
                            <label htmlFor="email" className='title-email'>อีเมล</label>
                            <input className='email' type="text" placeholder="กรุณากรอก อีเมล..." />
                            <label htmlFor="cv" className='title-cv'>CV</label>
                            <div className='cv'>
                                <div className="upload-img flex items-center justify-center">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div>
                            </div>
                            <label htmlFor="transcript" className='title-transcript'>Transcript</label>
                            <div className='transcript'>
                                <div className="upload-img flex items-center justify-center">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div>
                            </div>
                            <label htmlFor="start-intern" className='title-email'>วันที่เริ่มฝึกงาน</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate((prevState) => date)}
                                className="start-intern"
                                placeholderText="Select start date"
                            />
                             <label htmlFor="end-intern" className='title-email'>วันที่เลิกฝึกงาน</label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setStartDate((prevState) => date)}
                                className="end-intern"
                                placeholderText="Select end date"
                            />
                        </div>
                    </div>
                    <div className='btn-confirm-cancel flex justify-between'>
                        <button className='confirm'>ตกลง</button>
                        <button className='cancel'>ยกเลิก</button>
                    </div>
                </div>
            </div>
        </div></>
        </AuthGuard>
}