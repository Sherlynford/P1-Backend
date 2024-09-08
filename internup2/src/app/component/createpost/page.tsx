'use client';
import { useState } from 'react';
import axios from 'axios';
import '../../style/createpost.css';
import Swal from 'sweetalert2';
 
const url = 'http://localhost:8080/api/blogs/';
const imageUploadUrl ='http://localhost:8080/api/blogs/upload'

export default function Createpost() {
    // State to manage form fields
    const [formData, setFormData] = useState({
        img: '',
        username: '',
        topic: '',
        organizationName: '',
        detail: '',
        link: '',
        location: ''
    });

    // Handle change in form fields
    const [imgPreview, setImgPreview] = useState(''); // State to manage image preview

    // Handle change in form fields
    const handleChange = (event) => {
        const { id, value, type, files } = event.target;
        if (type === 'file') {
            const file = files[0];
            setFormData(prevState => ({
                ...prevState,
                [id]: file
            }));

            // Generate and set image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result !== null) {
                  setImgPreview(reader.result.toString());
                }
              };
            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
    };


    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
    
        const { img, username, topic, organizationName, detail, link, location } = formData;
    
        try {
            // Create formData for image upload
            const imageFormData = new FormData();
            if (img) {
                imageFormData.append('files', img);
            }
    
            // Upload image and get URL
            const imageResponse = await fetch(imageUploadUrl, {
                method: 'POST',
                body: imageFormData,
            });
    
            const imageResponseData = await imageResponse.json();
            if (imageResponse.ok && imageResponseData.fileUrls && imageResponseData.fileUrls.length > 0) {
                const uploadedImgURL = imageResponseData.fileUrls[0];
    
                // Prepare final JSON data
                const postData = {
                    username,
                    topic,
                    organizationName,
                    detail,
                    link,
                    location,
                    img: uploadedImgURL, // Use the URL from the image upload response
                };
    
                // Send JSON data
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postData),
                });
    
                const responseData = await response.json(); // Parse JSON if the response is JSON
    
                if (response.ok) {
                    Swal.fire('Success', 'Post created successfully!', 'success');
                    // Reset form fields
                    setFormData({
                        img: '',
                        username: '',
                        topic: '',
                        organizationName: '',
                        detail: '',
                        link: '',
                        location: ''
                    });
                    // Redirect or perform any other actions
                    window.location.href = '/';
                } else {
                    // Handle error response based on the response data format
                    const errorMessage = responseData.message || 'Failed to create post. Please try again.';
                    Swal.fire('Error', errorMessage, 'error');
                }
            } else {
                Swal.fire('Error', 'Failed to upload image. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error', 'Failed to create post. Please try again.', 'error');
        }
    };
    
     

    return (
        <div className='Createpost'>
            <div className='flex items-center justify-center'>
                <div className='block-createpost'>
                    <div className='content-profile'>
                        <div className='createpost-title flex justify-center'>
                            <h1>สร้างโพสต์</h1>
                        </div>
                        <div className='image-student flex justify-center'>
                            <div className="change-img flex items-center justify-center">
                                <label htmlFor="img" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {imgPreview ? (
                                            <img src={imgPreview} alt="Uploaded preview" className="w-full h-full object-cover rounded-lg" />
                                        ) : (
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                        )}
                                    </div>
                                    <input id="img" type="file" className="hidden" aria-label="Upload file" onChange={handleChange} />
                                </label>
                            </div>
                        </div>
                        <div className='enter-detail'>
                            <form className='flex flex-col' onSubmit={handleSubmit}>
                                <label htmlFor="username" className='title-nameuser'>ชื่อ</label>
                                <input id="username" className='nameuser' type="text" placeholder='กรุณากรอก ชื่อผู้ใช้....' aria-label="ชื่อผู้ใช้" value={formData.username} onChange={handleChange} />

                                <label htmlFor="topic" className='Title'>หัวข้อ</label>
                                <input id="topic" className='Title' type="text" placeholder='กรุณากรอก หัวข้อ....' aria-label="หัวข้อ" value={formData.topic} onChange={handleChange} />

                                <label htmlFor="organizationName" className='title-nameorganization'>ชื่อหน่วยงาน</label>
                                <input id="organizationName" className='nameorganization' type="text" placeholder='กรุณากรอก ชื่อหน่วยงาน....' aria-label="ชื่อหน่วยงาน" value={formData.organizationName} onChange={handleChange} />

                                <label htmlFor="detail" className='title-detail'>รายละเอียด</label>
                                <textarea id="detail" className='detail' placeholder='กรุณากรอก รายละเอียด....' aria-label="รายละเอียด" value={formData.detail} onChange={handleChange}></textarea>

                                <label htmlFor="link" className='title-Link'>ลิงค์ที่เกียวข้อง</label>
                                <input id="link" className='Link' type="text" placeholder='กรุณากรอก ลิงค์ที่เกียวข้อง....' aria-label="ลิงค์ที่เกี่ยวข้อง" value={formData.link} onChange={handleChange} />

                                <label htmlFor="location" className='title-location'>สถานที่อยู่</label>
                                <input id="location" className='location' type="text" placeholder="กรุณากรอก สถานที่อยู่..." aria-label="สถานที่อยู่" value={formData.location} onChange={handleChange} />

                                <div className='btn-confirm-cancel flex justify-between mt-4'>
                                    <button type="submit" className='confirm' onClick={handleSubmit}>ตกลง</button>
                                    <button type="button" className='cancel'>ยกเลิก</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
