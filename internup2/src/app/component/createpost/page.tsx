"use client";
import { useState } from "react";
import axios from "axios";
import "../../style/createpost.css";
import Swal from "sweetalert2";

const url = "http://localhost:8080/api/blogs/";
const imageUploadUrl = "http://localhost:8080/api/blogs/upload";

export default function Createpost() {
  // State to manage form fields
  const [formData, setFormData] = useState({
    img: "",
    username: "",
    topic: "",
    organizationName: "",
    detail: "",
    link: "",
    location: "",
  });

  // State to manage image preview
  const [imgPreview, setImgPreview] = useState("");

  // Handle change in form fields
  const handleChange = (event) => {
    const { id, value, type, files } = event.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prevState) => ({
        ...prevState,
        [id]: file,
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
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const { img, username, topic, organizationName, detail, link, location } =
      formData;

    // Show confirmation popup
    const result = await Swal.fire({
      title: "ยืนยันการสร้างโพสต์",
      text: "คุณแน่ใจว่าต้องการสร้างโพสต์นี้หรือไม่?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        // Create formData for image upload
        const imageFormData = new FormData();
        if (img) {
          imageFormData.append("files", img);
        }

        // Upload image and get URL
        const imageResponse = await fetch(imageUploadUrl, {
          method: "POST",
          body: imageFormData,
        });

        const imageResponseData = await imageResponse.json();
        if (
          imageResponse.ok &&
          imageResponseData.fileUrls &&
          imageResponseData.fileUrls.length > 0
        ) {
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
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          });

          const responseData = await response.json(); // Parse JSON if the response is JSON

          if (response.ok) {
            Swal.fire("Success", "Post created successfully!", "success");
            // Reset form fields
            setFormData({
              img: "",
              username: "",
              topic: "",
              organizationName: "",
              detail: "",
              link: "",
              location: "",
            });
            // Redirect or perform any other actions
            window.location.href = "/";
          } else {
            // Handle error response based on the response data format
            const errorMessage =
              responseData.message ||
              "Failed to create post. Please try again.";
            Swal.fire("Error", errorMessage, "error");
          }
        } else {
          Swal.fire(
            "Error",
            "Failed to upload image. Please try again.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire("Error", "Failed to create post. Please try again.", "error");
      }
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="Createpost">
      <div className="flex items-center justify-center">
        <div className="block-createpost">
          <div className="content-profile">
            <div className="createpost-title flex justify-center">
              <h1>สร้างโพสต์</h1>
            </div>
            <div className="image-student flex justify-center">
              <div className="change-img flex items-center justify-center">
                <label
                  htmlFor="img"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {imgPreview ? (
                      <img
                        src={imgPreview}
                        alt="Uploaded preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                    )}
                  </div>
                  <input
                    id="img"
                    type="file"
                    className="hidden"
                    aria-label="Upload file"
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className="enter-detail">
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <label htmlFor="username" className="title-nameuser">
                  ชื่อ
                </label>
                <input
                  id="username"
                  className="nameuser"
                  type="text"
                  placeholder="กรุณากรอก ชื่อผู้ใช้...."
                  aria-label="ชื่อผู้ใช้"
                  value={formData.username}
                  onChange={handleChange}
                />

                <label htmlFor="topic" className="Title">
                  หัวข้อ
                </label>
                <input
                  id="topic"
                  className="Title"
                  type="text"
                  placeholder="กรุณากรอก หัวข้อ...."
                  aria-label="หัวข้อ"
                  value={formData.topic}
                  onChange={handleChange}
                />

                <label
                  htmlFor="organizationName"
                  className="title-nameorganization"
                >
                  ชื่อหน่วยงาน
                </label>
                <input
                  id="organizationName"
                  className="nameorganization"
                  type="text"
                  placeholder="กรุณากรอก ชื่อหน่วยงาน...."
                  aria-label="ชื่อหน่วยงาน"
                  value={formData.organizationName}
                  onChange={handleChange}
                />

                <label htmlFor="detail" className="title-detail">
                  รายละเอียด
                </label>
                <textarea
                  id="detail"
                  className="detail"
                  placeholder="กรุณากรอก รายละเอียด...."
                  aria-label="รายละเอียด"
                  value={formData.detail}
                  onChange={handleChange}
                  rows={5}
                ></textarea>

                <label htmlFor="link" className="title-Link">
                  ลิงค์ที่เกียวข้อง
                </label>
                <input
                  id="link"
                  className="Link"
                  type="text"
                  placeholder="กรุณากรอก ลิงค์ที่เกียวข้อง...."
                  aria-label="ลิงค์ที่เกี่ยวข้อง"
                  value={formData.link}
                  onChange={handleChange}
                />

                <label htmlFor="location" className="title-location">
                  จังหวัด
                </label>
                <select
                  id="location"
                  className="location"
                  value={formData.location}
                  onChange={handleChange}
                >
                  <option value="">เลือกจังหวัด</option>
                  <option value="กระบี่">กระบี่</option>
                  <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                  <option value="กาญจนบุรี">กาญจนบุรี</option>
                  <option value="กาฬสินธุ์">กาฬสินธุ์</option>
                  <option value="กำแพงเพชร">กำแพงเพชร</option>
                  <option value="ขอนแก่น">ขอนแก่น</option>
                  <option value="จันทบุรี">จันทบุรี</option>
                  <option value="ฉะเชิงเทรา">ฉะเชิงเทรา</option>
                  <option value="ชลบุรี">ชลบุรี</option>
                  <option value="ชัยนาท">ชัยนาท</option>
                  <option value="ชัยภูมิ">ชัยภูมิ</option>
                  <option value="ชุมพร">ชุมพร</option>
                  <option value="เชียงราย">เชียงราย</option>
                  <option value="เชียงใหม่">เชียงใหม่</option>
                  <option value="ตรัง">ตรัง</option>
                  <option value="ตราด">ตราด</option>
                  <option value="ตาก">ตาก</option>
                  <option value="นครนายก">นครนายก</option>
                  <option value="นครปฐม">นครปฐม</option>
                  <option value="นครพนม">นครพนม</option>
                  <option value="นครราชสีมา">นครราชสีมา</option>
                  <option value="นครศรีธรรมราช">นครศรีธรรมราช</option>
                  <option value="นครสวรรค์">นครสวรรค์</option>
                  <option value="นนทบุรี">นนทบุรี</option>
                  <option value="นราธิวาส">นราธิวาส</option>
                  <option value="น่าน">น่าน</option>
                  <option value="บึงกาฬ">บึงกาฬ</option>
                  <option value="บุรีรัมย์">บุรีรัมย์</option>
                  <option value="ปทุมธานี">ปทุมธานี</option>
                  <option value="ประจวบคีรีขันธ์">ประจวบคีรีขันธ์</option>
                  <option value="ปราจีนบุรี">ปราจีนบุรี</option>
                  <option value="ปัตตานี">ปัตตานี</option>
                  <option value="พระนครศรีอยุธยา">พระนครศรีอยุธยา</option>
                  <option value="พะเยา">พะเยา</option>
                  <option value="พังงา">พังงา</option>
                  <option value="พัทลุง">พัทลุง</option>
                  <option value="พิจิตร">พิจิตร</option>
                  <option value="พิษณุโลก">พิษณุโลก</option>
                  <option value="เพชรบุรี">เพชรบุรี</option>
                  <option value="เพชรบูรณ์">เพชรบูรณ์</option>
                  <option value="แพร่">แพร่</option>
                  <option value="ภูเก็ต">ภูเก็ต</option>
                  <option value="มหาสารคาม">มหาสารคาม</option>
                  <option value="มุกดาหาร">มุกดาหาร</option>
                  <option value="แม่ฮ่องสอน">แม่ฮ่องสอน</option>
                  <option value="ยโสธร">ยโสธร</option>
                  <option value="ยะลา">ยะลา</option>
                  <option value="ร้อยเอ็ด">ร้อยเอ็ด</option>
                  <option value="ระนอง">ระนอง</option>
                  <option value="ระยอง">ระยอง</option>
                  <option value="ราชบุรี">ราชบุรี</option>
                  <option value="ลพบุรี">ลพบุรี</option>
                  <option value="ลำปาง">ลำปาง</option>
                  <option value="ลำพูน">ลำพูน</option>
                  <option value="เลย">เลย</option>
                  <option value="ศรีสะเกษ">ศรีสะเกษ</option>
                  <option value="สกลนคร">สกลนคร</option>
                  <option value="สงขลา">สงขลา</option>
                  <option value="สตูล">สตูล</option>
                  <option value="สมุทรปราการ">สมุทรปราการ</option>
                  <option value="สมุทรสงคราม">สมุทรสงคราม</option>
                  <option value="สมุทรสาคร">สมุทรสาคร</option>
                  <option value="สระแก้ว">สระแก้ว</option>
                  <option value="สระบุรี">สระบุรี</option>
                  <option value="สิงห์บุรี">สิงห์บุรี</option>
                  <option value="สุโขทัย">สุโขทัย</option>
                  <option value="สุพรรณบุรี">สุพรรณบุรี</option>
                  <option value="สุราษฎร์ธานี">สุราษฎร์ธานี</option>
                  <option value="สุรินทร์">สุรินทร์</option>
                  <option value="หนองคาย">หนองคาย</option>
                  <option value="หนองบัวลำภู">หนองบัวลำภู</option>
                  <option value="อ่างทอง">อ่างทอง</option>
                  <option value="อำนาจเจริญ">อำนาจเจริญ</option>
                  <option value="อุดรธานี">อุดรธานี</option>
                  <option value="อุตรดิตถ์">อุตรดิตถ์</option>
                  <option value="อุทัยธานี">อุทัยธานี</option>
                  <option value="อุบลราชธานี">อุบลราชธานี</option>
                </select>
                <div className="btn-confirm-cancel flex justify-between mt-4">
                  <button type="submit" className="confirm">
                    ตกลง
                  </button>
                  <button
                    type="button"
                    className="cancel"
                    onClick={handleCancel}
                  >
                    ยกเลิก
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
