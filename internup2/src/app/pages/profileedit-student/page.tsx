"use client";

import "../profileedit-student/edit.css";
import Navbarstudent from "../../component/navbar-student/page";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import AuthGuard from "../../component/checktoken/AuthGuard";
import Swal from "sweetalert2";
import axios from "axios";

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1]; // Extract the payload from JWT
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Handle Base64 encoding
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload); // Convert the result to a JSON object
  } catch (error) {
    console.error("Invalid JWT token");
    return null;
  }
}
const formatDate = (date: Date | null) => {
  if (!date) return ""; // หรือ return null ขึ้นอยู่กับที่ API ต้องการ
  if (!(date instanceof Date)) throw new Error("Invalid date object");

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`; // ส่งในรูปแบบที่ต้องการ
};

//fix f

const imageUploadUrl = "http://localhost:8080/api/students/upload";
const cvurl = "http://localhost:8080/api/students/upload";
const transcripturl = "http://localhost:8080/api/students/upload";
const url = "http://localhost:8080/api/students/";

export default function ProfileEdit() {
  const [studentData, setStudentData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const [studentProfileId, setStudentProfileId] = useState(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    faculty: "",
    major: "",
    studentID: "",
    phoneNumber: "",
    internStartDate: "",
    internEndDate: "",
    cv: "",
    transcript: "",
    profileIMG: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    const decoded = parseJwt(token);
    if (decoded) {
      setId(decoded.id || null);
      // Set studentProfileId
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (studentData) {
      setFormData({
        firstName: studentData.firstName || "",
        lastName: studentData.lastName || "",
        faculty: studentData.faculty || "",
        major: studentData.major || "",
        studentID: studentData.studentID || "",
        phoneNumber: studentData.phoneNumber || "",
        cv: studentData.cv || "", // เก็บ URL ของ CV
        transcript: studentData.transcript || "", // เก็บ URL ของ Transcript
        profileIMG: studentData.profileIMG || "", // เก็บ URL ของ Profile Image
      });
      setImgPreview(studentData.profileIMG);
      setCvPreview(studentData.cv);
      setTranscriptPreview(studentData.transcript);
      setStartDate(
        studentData.internStartDate
          ? new Date(studentData.internStartDate)
          : null
      );
      setEndDate(
        studentData.internEndDate ? new Date(studentData.internEndDate) : null
      );
    }
  }, [studentData]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (id) {
      axios
        .get(`http://localhost:8080/api/persons/${id}`,{
          headers: {
              'Authorization': `Bearer ${token}`, // Add token to request headers
          },
        })
        .then((response) => {
          const studentProfile = response.data.studentProfile; // ดึง studentProfile
          setStudentData(studentProfile);
          if (studentProfile && studentProfile.id) {
            setStudentProfileId(studentProfile.id); // Set it asynchronously
          }
          setFormData({
            firstName: studentProfile.firstName || "",
            lastName: studentProfile.lastName || "",
            faculty: studentProfile.faculty || "",
            major: studentProfile.major || "",
            studentID: studentProfile.studentID || "",
            phoneNumber: studentProfile.phoneNumber || "",
            internStartDate: studentProfile.internStartDate || "",
            internEndDate: studentProfile.internEndDate || "",
            cv: "",
            transcript: "",
            profileIMG: "",
          });
        })
        .catch((err) => {
          console.error("Error fetching student data:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const [imgPreview, setImgPreview] = useState("");
  const [cvPreview, setCvPreview] = useState("");
  const [transcriptPreview, setTranscriptPreview] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = event.target as HTMLInputElement;
    if (target.type === "file") {
      const files = target.files;
      const file = files[0];
      let fieldName: string;
  
      if (target.id === "cvFile") {
        fieldName = "cv";
        setCvPreview(file ? file.name : ""); // Set preview to file name
      } else if (target.id === "transcriptFile") {
        fieldName = "transcript";
        setTranscriptPreview(file ? file.name : ""); // Set preview to file name
      }
  
      if (fieldName) {
        setFormData((prevState: any) => ({
          ...prevState,
          [fieldName]: file,
        }));
      }
    } else {
      setFormData((prevState: any) => ({
        ...prevState,
        [target.id]: target.value,
      }));
    }
  };
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { firstName, lastName, faculty, major, studentID, phoneNumber } =
      formData;

    const result = await Swal.fire({
      title: "ยืนยันการบันทึกข้อมูล?",
      text: "คุณแน่ใจว่าต้องการบันทึกข้อมูลนี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      setLoading(true);
      const uploadPromises: Promise<any>[] = [];
      let errorMessages: string[] = [];

      try {
        const token = localStorage.getItem("token");

        // File upload handling
        const handleFileUpload = async (file: File, url: string) => {
          const formData = new FormData();
          formData.append("files", file);
          const response = await fetch(url, { method: "POST",headers: {'Authorization': `Bearer ${token}`}, body: formData });
          const data = await response.json();
          if (data.fileUrls && data.fileUrls.length > 0) {
            return data.fileUrls[0];
          } else {
            throw new Error("Failed to upload file");
          }
        };

        // Upload files and keep existing URLs if not uploaded
        const profileImgUrl =
          formData.profileIMG instanceof File
            ? await handleFileUpload(formData.profileIMG, imageUploadUrl).catch(
                (err) => {
                  errorMessages.push(err.message);
                  return studentData.profileIMG; // Use existing URL
                }
              )
            : studentData.profileIMG;

        const cvUrl =
          formData.cv instanceof File
            ? await handleFileUpload(formData.cv, cvurl).catch((err) => {
                errorMessages.push(err.message);
                return studentData.cv; // Use existing URL
              })
            : studentData.cv;

        const transcriptUrl =
          formData.transcript instanceof File
            ? await handleFileUpload(formData.transcript, transcripturl).catch(
                (err) => {
                  errorMessages.push(err.message);
                  return studentData.transcript; // Use existing URL
                }
              )
            : studentData.transcript;

        const putData = {
          person: { id: id || "" },
          firstName,
          lastName,
          phoneNumber,
          faculty,
          major,
          profileIMG: profileImgUrl,
          cv: cvUrl,
          transcript: transcriptUrl,
          internStartDate: startDate ? formatDate(startDate) : null,
          internEndDate: endDate ? formatDate(endDate) : null,
          studentID,
        };

        // Send updated data
        const response = await fetch(`${url}${studentProfileId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(putData),
        });

        if (response.ok) {
          Swal.fire("สำเร็จ", "บันทึกข้อมูลสำเร็จ!", "success");
          resetForm();
          window.location.href = "/pages/profile-student";
        } else {
          const responseData = await response.json();
          const errorMessage =
            responseData.message || "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองอีกครั้ง";
          Swal.fire("ข้อผิดพลาด", errorMessage, "error");
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire(
          "ข้อผิดพลาด",
          "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองอีกครั้ง",
          "error"
        );
      } finally {
        setLoading(false);
        if (errorMessages.length > 0) {
          Swal.fire("ข้อผิดพลาด", errorMessages.join(", "), "error");
        }
      }
    }
  };

  const resetForm = () => {
    setFormData({
      profileIMG: "",
      firstName: "",
      lastName: "",
      faculty: "",
      major: "",
      studentID: "",
      phoneNumber: "",
      internStartDate: "",
      internEndDate: "",
      cv: "",
      transcript: "",
    });
    setStartDate(null);
    setEndDate(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthGuard>
      <>
        <div>
          <Navbarstudent />
        </div>
        <section className="profileedit-student">
          <div className="flex items-center justify-center">
            <div className="block-profileedit">
              <div className="content-profileedit">
                <form
                  className="edit-profile flex flex-col"
                  onSubmit={handleSubmit}
                >
                  <div className="image-student flex justify-center">
                    <div className="change-img flex items-center justify-center">
                      <label
                        htmlFor="imgFile"
                        className="change-img flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {imgPreview ? (
                            <img
                              src={imgPreview}
                              alt="Uploaded preview"
                              className="w-full h-full object-cover object-center border-none backgroung-white rounded-lg"
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
                          id="imgFile"
                          type="file"
                          className="hidden"
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                  </div>

                  <label htmlFor="firstName" className="title-firstname">
                    ชื่อ
                  </label>
                  <input
                    id="firstName"
                    className="firstname"
                    type="text"
                    placeholder="กรุณากรอกชื่อพร้อมคำนำหน้า"
                    value={formData.firstName}
                    onChange={handleChange}
                  />

                  <label htmlFor="lastName" className="title-lastName">
                    นามสกุล
                  </label>
                  <input
                    id="lastName"
                    className="lastname"
                    type="text"
                    placeholder="กรุณากรอกนามสกุล"
                    value={formData.lastName}
                    onChange={handleChange}
                  />

                  <label htmlFor="studentID" className="title-studentid">
                    รหัสประจำตัวนิสิต
                  </label>
                  <input
                    id="studentID"
                    className="studentid"
                    type="text"
                    placeholder="กรุณากรอกรหัสประจำตัวนิสิต"
                    value={formData.studentID}
                    onChange={handleChange}
                  />

                  <label htmlFor="phoneNumber" className="title-numberphone">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    id="phoneNumber"
                    className="number-phone"
                    type="text"
                    placeholder="กรุณากรอกเบอร์โทรศัพท์"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />

                  <label htmlFor="faculty" className="title-faculty">
                    คณะ
                  </label>
                  <select
                    id="faculty"
                    className="faculty"
                    value={formData.faculty}
                    onChange={handleChange}
                  >
                    <option value="">เลือกคณะ</option>
                    <option value="คณะเกษตรศาสตร์และทรัพยากรธรรมชาติ">
                      คณะเกษตรศาสตร์และทรัพยากรธรรมชาติ
                    </option>
                    <option value="คณะเทคโนโลยีสารสนเทศและการสื่อสาร">
                      คณะเทคโนโลยีสารสนเทศและการสื่อสาร
                    </option>
                    <option value="คณะทันตแพทยศาสตร์">คณะทันตแพทยศาสตร์</option>
                    <option value="คณะนิติศาสตร์">คณะนิติศาสตร์</option>
                    <option value="คณะบริหารธุรกิจและนิเทศศาสตร์">
                      คณะบริหารธุรกิจและนิเทศศาสตร์
                    </option>
                    <option value="คณะพยาบาลศาสตร์">คณะพยาบาลศาสตร์</option>
                    <option value="คณะพลังงานและสิ่งแวดล้อม">
                      คณะพลังงานและสิ่งแวดล้อม
                    </option>
                    <option value="คณะแพทยศาสตร์">คณะแพทยศาสตร์</option>
                    <option value="คณะเภสัชศาสตร์">คณะเภสัชศาสตร์</option>
                    <option value="คณะรัฐศาสตร์และสังคมศาสตร์">
                      คณะรัฐศาสตร์และสังคมศาสตร์
                    </option>
                    <option value="คณะวิทยาศาสตร์">คณะวิทยาศาสตร์</option>
                    <option value="คณะวิทยาศาสตร์การแพทย์">
                      คณะวิทยาศาสตร์การแพทย์
                    </option>
                    <option value="คณะวิทยาศาสตร์การแพทย์">
                      คณะวิศวกรรมศาสตร์
                    </option>
                    <option value="คณะสถาปัตยกรรมศาสตร์และศิลปกรรมศาสตร์">
                      คณะสถาปัตยกรรมศาสตร์และศิลปกรรมศาสตร์
                    </option>
                    <option value="คณะสหเวชศาสตร์">คณะสหเวชศาสตร์</option>
                    <option value="คณะสาธารณสุขศาสตร์">
                      คณะสาธารณสุขศาสตร์
                    </option>
                    <option value="คณะศิลปศาสตร์">คณะศิลปศาสตร์</option>
                    <option value="วิทยาลัยการจัดการ">วิทยาลัยการจัดการ</option>
                    <option value="วิทยาลัยการศึกษา">วิทยาลัยการศึกษา</option>
                  </select>
                  <label htmlFor="major" className="title-major">
                    สาขา
                  </label>
                  <select
                    id="major"
                    className="major"
                    value={formData.major}
                    onChange={handleChange}
                  >
                    <option value="">กรุณาเลือกสาขา</option>
                    <option value="เกษตรศาสตร์">เกษตรศาสตร์</option>
                    <option value="เทคโนโลยีนวัตกรรมการประมง">
                      เทคโนโลยีนวัตกรรมการประมง
                    </option>
                    <option value="ความปลอดภัยทางอาหาร">
                      ความปลอดภัยทางอาหาร
                    </option>
                    <option value="วิทยาศาสตร์และเทคโนโลยีการอาหาร">
                      วิทยาศาสตร์และเทคโนโลยีการอาหาร
                    </option>
                    <option value="สัตวศาสตร์">สัตวศาสตร์</option>
                    <option value="เทคโนโลยีการเกษตร">เทคโนโลยีการเกษตร</option>
                    <option value="ทันตแพทยศาสตรบัณฑิต">
                      ทันตแพทยศาสตรบัณฑิต
                    </option>
                    <option value="คอมพิวเตอร์กราฟิกและมัลติมีเดีย">
                      คอมพิวเตอร์กราฟิกและมัลติมีเดีย
                    </option>
                    <option value="ธุรกิจดิจิทัล">ธุรกิจดิจิทัล</option>
                    <option value="เทคโนโลยีสารสนเทศ">เทคโนโลยีสารสนเทศ</option>
                    <option value="ภูมิสารสนเทศศาสตร์">
                      ภูมิสารสนเทศศาสตร์
                    </option>
                    <option value="วิทยาการข้อมูลและการประยุกต์">
                      วิทยาการข้อมูลและการประยุกต์
                    </option>
                    <option value="วิทยาการคอมพิวเตอร์">
                      วิทยาการคอมพิวเตอร์
                    </option>
                    <option value="วิศวกรรมคอมพิวเตอร์">
                      วิศวกรรมคอมพิวเตอร์
                    </option>
                    <option value="วิศวกรรมซอฟต์แวร์">วิศวกรรมซอฟต์แวร์</option>
                    <option value="นิติศาสตรบัณฑิต">นิติศาสตรบัณฑิต</option>
                    <option value="เศรษฐศาสตรบัณฑิต">เศรษฐศาสตรบัณฑิต</option>
                    <option value="การจัดการการสื่อสาร">
                      การจัดการการสื่อสาร
                    </option>
                    <option value="การสื่อสารสื่อใหม่">
                      การสื่อสารสื่อใหม่
                    </option>
                    <option value="การเงินและการลงทุน">
                      การเงินและการลงทุน
                    </option>
                    <option value="การจัดการธุรกิจ">การจัดการธุรกิจ</option>
                    <option value="การตลาดดิจิทัล">การตลาดดิจิทัล</option>
                    <option value="บัญชีบัณฑิต">บัญชีบัณฑิต</option>
                    <option value="การท่องเที่ยวและการโรงแรม">
                      การท่องเที่ยวและการโรงแรม
                    </option>
                    <option value="พยาบาลศาสตรบัณฑิต">พยาบาลศาสตรบัณฑิต</option>
                    <option value="วิศวกรรมสิ่งแวดล้อม">
                      วิศวกรรมสิ่งแวดล้อม
                    </option>
                    <option value="การจัดการพลังงานและสิ่งแวดล้อม">
                      การจัดการพลังงานและสิ่งแวดล้อม
                    </option>
                    <option value="แพทยศาสตรบัณฑิต">แพทยศาสตรบัณฑิต</option>
                    <option value="ปฏิบัติการฉุกเฉินการแพทย์">
                      ปฏิบัติการฉุกเฉินการแพทย์
                    </option>
                    <option value="บริบาลทางเภสัชกรรม">
                      บริบาลทางเภสัชกรรม
                    </option>
                    <option value="วิทยาศาสตร์เครื่องสำอาง">
                      วิทยาศาสตร์เครื่องสำอาง
                    </option>
                    <option value="การจัดการนวัตกรรมสาธารณะ">
                      การจัดการนวัตกรรมสาธารณะ
                    </option>
                    <option value="รัฐศาสตรบัณฑิต">รัฐศาสตรบัณฑิต</option>
                    <option value="พัฒนาสังคม">พัฒนาสังคม</option>
                    <option value="เคมี">เคมี</option>
                    <option value="คณิตศาสตร์">คณิตศาสตร์</option>
                    <option value="ชีววิทยา">ชีววิทยา</option>
                    <option value="ฟิสิกส์">ฟิสิกส์</option>
                    <option value="วิทยาศาสตร์การออกกำลังกายและการกีฬา">
                      วิทยาศาสตร์การออกกำลังกายและการกีฬา
                    </option>
                    <option value="สถิติประยุกต์และการจัดการข้อมูล">
                      สถิติประยุกต์และการจัดการข้อมูล
                    </option>
                    <option value="วิศวกรรมเครื่องกล">วิศวกรรมเครื่องกล</option>
                    <option value="วิศวกรรมโยธา">วิศวกรรมโยธา</option>
                    <option value="วิศวกรรมไฟฟ้า">วิศวกรรมไฟฟ้า</option>
                    <option value="วิศวกรรมอุตสาหการ">วิศวกรรมอุตสาหการ</option>
                    <option value="ดนตรีและนาฏศิลป์">ดนตรีและนาฏศิลป์</option>
                    <option value="ศิลปะและการออกแบบ">ศิลปะและการออกแบบ</option>
                    <option value="สถาปัตยกรรม">สถาปัตยกรรม</option>
                    <option value="สถาปัตยกรรมภายใน">สถาปัตยกรรมภายใน</option>
                    <option value="กายภาพบำบัดบัณฑิต">กายภาพบำบัดบัณฑิต</option>
                    <option value="เทคนิคการแพทย์">เทคนิคการแพทย์</option>
                    <option value="การแพทย์แผนจีนบัณฑิต">
                      การแพทย์แผนจีนบัณฑิต
                    </option>
                    <option value="การแพทย์แผนไทยประยุกต์บัณฑิต">
                      การแพทย์แผนไทยประยุกต์บัณฑิต
                    </option>
                    <option value="การส่งเสริมสุขภาพ">การส่งเสริมสุขภาพ</option>
                    <option value="อนามัยสิ่งแวดล้อม">อนามัยสิ่งแวดล้อม</option>
                    <option value="อาชีวอนามัยและความปลอดภัย">
                      อาชีวอนามัยและความปลอดภัย
                    </option>
                    <option value="อนามัยชุมชน">อนามัยชุมชน</option>
                    <option value="โภชนาการและการกำหนดอาหาร">
                      โภชนาการและการกำหนดอาหาร
                    </option>
                    <option value="จุลชีววิทยา">จุลชีววิทยา</option>
                    <option value="ชีวเคมี">ชีวเคมี</option>
                    <option value="ภาษาไทย">ภาษาไทย</option>
                    <option value="ภาษาจีน">ภาษาจีน</option>
                    <option value="ภาษาญี่ปุ่น">ภาษาญี่ปุ่น</option>
                    <option value="ภาษาฝรั่งเศส">ภาษาฝรั่งเศส</option>
                    <option value="ภาษาอังกฤษ">ภาษาอังกฤษ</option>
                    <option value="การศึกษา">การศึกษา</option>
                  </select>

                  <label htmlFor="cv" className="title-cv">
  CV
</label>
<div className="cv cv-uploading">
  <div className="upload-img flex items-center justify-center">
    <label
      htmlFor="cvFile"
      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        {cvPreview ? (
          <span className="text-gray-700">{cvPreview}</span> // Show file name
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
        id="cvFile"
        type="file"
        className="hidden"
        onChange={handleChange}
      />
    </label>
  </div>
</div>

<label htmlFor="transcript" className="title-transcript">
  Transcript
</label>
<div className="transcript transcript-uploading">
  <div className="upload-img flex items-center justify-center">
    <label
      htmlFor="transcriptFile"
      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        {transcriptPreview ? (
          <span className="text-gray-700">{transcriptPreview}</span> // Show file name
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
        id="transcriptFile"
        type="file"
        className="hidden"
        onChange={handleChange}
      />
    </label>
  </div>
</div>


                  <label htmlFor="start-intern" className="title-start-intern">
                    วันที่เริ่มฝึกงาน
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="start-intern"
                    placeholderText="กดเลือกวันที่เริ่มฝึกงาน"
                  />

                  <label htmlFor="end-intern" className="title-end-intern">
                    วันที่สิ้นสุดการฝึกงาน
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="end-intern"
                    placeholderText="กดเลือกวันที่สิ้นสุดการฝึกงาน"
                  />
                  <div className="btn-confirm-cancel flex justify-between">
                    <button className="confirm">ตกลง</button>
                    <button
                      className="cancel"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/pages/profile-student";
                      }}
                    >
                      ยกเลิก
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    </AuthGuard>
  );
}
