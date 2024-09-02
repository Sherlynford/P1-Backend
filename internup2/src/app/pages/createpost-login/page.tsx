'use client'

import '../../style/createpost.css';
import NavbarLogin from '../../component/navbar-login/page';

export default function Createpost() {

    return (
        <>
            <div>
                <NavbarLogin />
            </div>
            <div className='Createpost'>
                <div className='flex items-center justify-center'>
                    <div className='block-createpost'>
                        <div className='content-profile'>
                            <div className='createpost-title flex justify-center'>
                                <h1>สร้างโพสต์</h1>
                            </div>
                            <div className='image-student flex justify-center'>
                                <div className="change-img flex items-center justify-center">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" aria-label="Upload file" />
                                    </label>
                                </div>
                            </div>
                            <div className='enter-detail'>
                                <form className='flex flex-col'>
                                    <label htmlFor="nameuser" className='title-nameuser'>ชื่อ</label>
                                    <input id="nameuser" className='nameuser' type="text" placeholder='กรุณากรอก ชื่อผู้ใช้....' aria-label="ชื่อผู้ใช้" />
                                    
                                    <label htmlFor="Title" className='Title'>หัวข้อ</label>
                                    <input id="Title" className='Title' type="text" placeholder='กรุณากรอก หัวข้อ....' aria-label="หัวข้อ" />
                                    
                                    <label htmlFor="nameorganization" className='title-nameorganization'>ชื่อหน่วยงาน</label>
                                    <input id="nameorganization" className='nameorganization' type="text" placeholder='กรุณากรอก ชื่อหน่วยงาน....' aria-label="ชื่อหน่วยงาน" />
                                    
                                    <label htmlFor="detail" className='title-detail'>รายละเอียด</label>
                                    <textarea id="detail" className='detail' placeholder='กรุณากรอก รายละเอียด....' aria-label="รายละเอียด"></textarea>
                                    
                                    <label htmlFor="Link" className='title-Link'>ลิงค์ที่เกียวข้อง</label>
                                    <input id="Link" className='Link' type="text" placeholder='กรุณากรอก ลิงค์ที่เกียวข้อง....' aria-label="ลิงค์ที่เกี่ยวข้อง" />
                                    
                                    <label htmlFor="location" className='title-location'>สถานที่อยู่</label>
                                    <input id="location" className='location' type="text" placeholder="กรุณากรอก สถานที่อยู่..." aria-label="สถานที่อยู่" />
                                    
                                    <div className='btn-confirm-cancel flex justify-between mt-4'>
                                        <button type="submit" className='confirm'>ตกลง</button>
                                        <button type="button" className='cancel'>ยกเลิก</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
