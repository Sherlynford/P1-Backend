"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../profile-teacher/profile.css";
import Image from "next/image";
import Navbarteacher from "../../component/navbar-Teacher/page";
import AuthGuard from "@/app/component/checktoken/AuthGuard";
import Swal from "sweetalert2";

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

export default function Profile() {
  const [teacherData, setTeacherData] = useState<any>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    faculty: "",
    major: "",
    profileIMG: "",
  });
  const [editData, setEditData] = useState<any>({}); // Separate state for editing
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const decoded = parseJwt(token);
    console.log("Decoded Token:", decoded);

    if (decoded) {
      setId(decoded.id || null);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    console.log("Current ID:", id);
    if (!id) return;
    axios
      .get(`http://localhost:8080/api/persons/${id}`)
      .then((response) => {
        setTeacherData(response.data);
        setEditData(response.data); // Initialize editData with fetched data
        setIsEditing(false);
      })
      .catch((err) => {
        setError("Error fetching teacher data.");
        console.error("Error fetching teacher data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveProfile = useCallback(() => {
    Swal.fire({
      title: "ยืนยันการบันทึกข้อมูล",
      text: "คุณแน่ใจหรือไม่ว่าต้องการบันทึกข้อมูล?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, บันทึก",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        const profileData = {
          person: {
            id: id || "",
          },
          firstName: editData.firstName || "",
          lastName: editData.lastName || "",
          phoneNumber: editData.phoneNumber || "",
          faculty: editData.faculty || "",
          major: editData.major || "",
          profileIMG: editData.profileIMG || "",
        };

        if (teacherData.teacherProfile?.firstName) {
          // Update existing profile (PUT)
          const token = localStorage.getItem("token");
          const decoded = parseJwt(token as string);
          axios
            .put(
              `http://localhost:8080/api/teachers/${teacherData.teacherProfile?.id}`,
              profileData
            )
            .then((response) => {
              console.log("Profile updated successfully", response);
              setTeacherData(response.data);
              setIsEditing(false);
              location.reload();
            })
            .catch((error) => {
              console.error("Error updating profile", error);
            });
        } else {
          // Create new profile (POST)
          axios
            .post("http://localhost:8080/api/teachers/", profileData)
            .then((response) => {
              console.log("Profile saved successfully", response);
              setTeacherData(response.data);
              setIsEditing(false);
              location.reload();
            })
            .catch((error) => {
              console.error("Error saving profile", error);
            });
        }
      }
    });
  }, [editData, id, teacherData]);

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
    if (!isEditing) {
      // Populate editData when entering edit mode
      setEditData(teacherData);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <AuthGuard>
      <Navbarteacher />
      <div className="profile-teacher">
        <div className="flex items-center justify-center">
          <div className="block-profile">
            <div className="content-profile">
              <div className="image-teacher flex justify-center">
                <img
                  src={teacherData.teacherProfile?.profileIMG}
                  alt="Profile picture"
                />
              </div>

              <form className="flex flex-col">
                <label htmlFor="firstName" className="title-firstname">
                  ชื่อจริง
                </label>
                <input
                  className="firstname"
                  type="text"
                  name="firstName"
                  placeholder="กรุณากรอกชื่อจริง"
                  value={
                    isEditing
                      ? editData.firstName
                      : teacherData.teacherProfile?.firstName
                  }
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />

                <label htmlFor="lastName" className="title-lastname">
                  นามสกุล
                </label>
                <input
                  className="lastname"
                  type="text"
                  name="lastName"
                  placeholder="กรุณากรอกนามสกุล"
                  value={
                    isEditing
                      ? editData.lastName
                      : teacherData.teacherProfile?.lastName
                  }
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />

                <label htmlFor="phoneNumber" className="title-numberphone">
                  เบอร์โทรศัพท์
                </label>
                <input
                  className="number-phone"
                  type="text"
                  name="phoneNumber"
                  placeholder="กรุณากรอกเบอร์โทรศัพท์"
                  value={
                    isEditing
                      ? editData.phoneNumber
                      : teacherData.teacherProfile?.phoneNumber
                  }
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />

                <label htmlFor="faculty" className="title-faculty">
                  คณะ
                </label>
                <select
                  className="faculty"
                  name="faculty"
                  value={
                    isEditing
                      ? editData.faculty
                      : teacherData.teacherProfile?.faculty
                  }
                  onChange={handleInputChange}
                  disabled={!isEditing}
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
                  <option value="คณะวิศวกรรมศาสตร์">คณะวิศวกรรมศาสตร์</option>
                  <option value="คณะสถาปัตยกรรมศาสตร์และศิลปกรรมศาสตร์">
                    คณะสถาปัตยกรรมศาสตร์และศิลปกรรมศาสตร์
                  </option>
                  <option value="คณะสหเวชศาสตร์">คณะสหเวชศาสตร์</option>
                  <option value="คณะสาธารณสุขศาสตร์">คณะสาธารณสุขศาสตร์</option>
                  <option value="คณะศิลปศาสตร์">คณะศิลปศาสตร์</option>
                  <option value="วิทยาลัยการจัดการ">วิทยาลัยการจัดการ</option>
                  <option value="วิทยาลัยการศึกษา">วิทยาลัยการศึกษา</option>
                </select>

                <label htmlFor="major" className="title-major">
                  สาขา
                </label>
                <input
                  className="major"
                  type="text"
                  name="major"
                  placeholder="กรุณากรอกสาขา"
                  value={
                    isEditing
                      ? editData.major
                      : teacherData.teacherProfile?.major
                  }
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </form>
            </div>

            <div className="btn-edit flex justify-center">
              <button
                className="edit"
                onClick={isEditing ? saveProfile : toggleEditMode}
              >
                {isEditing ? "บันทึก" : "แก้ไข"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
