import Image from "next/image";
import NavberLoginstudent from "../../component/navbar-student/page";
import '../../style/mainpage.css';
import imgperson from '../../image/image-person.png';
import imgjob from '../../image/image-job1.png'
import organization from '../../image/icon-organization.png'
import calender from '../../image/iocn-calendar.png'
import location from '../../image/icon-location.png'
import Polygon from '../../image/Polygon.png'

export default function Home() {
  return (
    <><div>
      <NavberLoginstudent />
    </div>
      <div>
        <div className="bg-main">
          <div className="block-main flex">
            <div className="left-block">
              <div className="img-work">
                <Image src={imgperson} alt="this is person doing work" />
              </div>
            </div>
            <div className="right-block">
              <div className="block-inside">
                <div className="block-content">
                  <h1>ค้นหา ที่ฝึกงานสำหรับนักศึกษา ม.พะเยา</h1>
                  <p>INTERN <strong style={{ color: "#92268F" }}>UP</strong> เว็บหาที่ฝึกงาน หางานในเครือและหน่วยงานนอก สำหรับนิสิตนักศึกษา <strong style={{ color: "#92268F" }}>มหาวิทยาลัยพะเยา</strong> </p>
                  <input type="text" placeholder="เช่น นักพัฒนาเว็บไซต์, UX/UI Designer, บัญชี " />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="job-latest">
        <div className="job-announce">
          <h1>ประกาศรับสมัครรับสมัครงานล่าสุด</h1>
        </div>
        <div className="card-container flex-col">
          <div className="card-job flex justify-center">
            <div className="card flex">
              <div className="crad-left">
                <div className="img-job">
                  <Image src={imgjob} alt="this is  image  job" />
                </div>
              </div>
              <div className="crad-right">
                <div className="content-card">
                  <h1 className="title-card">รับสมัครนักศึกษาฝึกงานจำนวนมาก: Frontend, Backend, PM, ...</h1>
                  <div className="subtitle-card flex items-center ">
                    <div className="flex ml-3">
                      <Image src={organization} alt="this is icon orhanization" />
                      <p className="name-organization ml-2 mr-3">Sodium Software Co.</p>
                      <Image src={calender} alt="this is icon calendar" />
                      <p className="date-time ml-2">09/08/2567</p>
                      <p className="time-latest ml-2">02:08</p>
                    </div>
                  </div>
                  <div className="short-detail">
                    <p className="detail-short mt-1">เปิดรับสมัครนักศึกษาฝึกงานหลายตำแหน่ง
                      เน้นความเชี่ยวชาญใน Frontend, Backend และ PM
                      ต้องการคนที่สามารถทำงานเป็นทีมและเรียนรู้เร็ว....</p>
                  </div>
                  <div className="lo-read mt-3">
                    <div className="flex justify-between">
                      <div className="flex">
                        <Image src={location} alt="this is icon location" />
                        <p className="name-location ml-2">Bangkok</p>
                      </div>
                      <button className="read-more mr-5">อ่านเพิ่มเติม
                        {/* <Image className="absolute" src={Polygon} alt="this is icon Polygon"/> */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-container flex-col">
          <div className="card-job flex justify-center">
            <div className="card flex">
              <div className="crad-left">
                <div className="img-job">
                  <Image src={imgjob} alt="this is  image  job" />
                </div>
              </div>
              <div className="crad-right">
                <div className="content-card">
                  <h1 className="title-card">รับนักศึกษาฝึกงาน ตำแหน่ง Back-end , Tester</h1>
                  <div className="subtitle-card flex items-center ">
                    <div className="flex ml-3">
                      <Image src={organization} alt="this is icon orhanization" />
                      <p className="name-organization ml-2 mr-3">Tester Software Co.</p>
                      <Image src={calender} alt="this is icon calendar" />
                      <p className="date-time ml-2">09/08/2567</p>
                      <p className="time-latest ml-2">02:08</p>
                    </div>
                  </div>
                  <div className="short-detail">
                    <p className="detail-short mt-1">เปิดรับสมัครนักศึกษาฝึกงานที่มีทักษะด้านBackendและการทดสอบซอฟต์แวร์ต้องการผู้ที่มีความเข้า
                      ใจใน API และการทำ Unit Testing มีโอกาสเรียนรู้และพัฒนาทักษะกับทีมงานที่มีประสบการณ์</p>
                  </div>
                  <div className="lo-read mt-3">
                    <div className="flex justify-between">
                      <div className="flex">
                        <Image src={location} alt="this is icon location" />
                        <p className="name-location ml-2">Chiang mai</p>
                      </div>
                      <button className="read-more mr-5">อ่านเพิ่มเติม
                        {/* <Image className="absolute" src={Polygon} alt="this is icon Polygon"/> */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-container flex-col">
          <div className="card-job flex justify-center">
            <div className="card flex">
              <div className="crad-left">
                <div className="img-job">
                  <Image src={imgjob} alt="this is  image  job" />
                </div>
              </div>
              <div className="crad-right">
                <div className="content-card">
                  <h1 className="title-card">รับนักศึกษาฝึกงานตำแหน่ง Front-end , QA  , PM</h1>
                  <div className="subtitle-card flex items-center ">
                    <div className="flex ml-3">
                      <Image src={organization} alt="this is icon orhanization" />
                      <p className="name-organization ml-2 mr-3">Milk Software Co.</p>
                      <Image src={calender} alt="this is icon calendar" />
                      <p className="date-time ml-2">09/08/2567</p>
                      <p className="time-latest ml-2">02:08</p>
                    </div>
                  </div>
                  <div className="short-detail">
                    <p className="detail-short mt-1">เปิดรับนักศึกษาที่สนใจทำงานในตำแหน่ง Front-end, QA และ PM
                      ต้องการผู้ที่มีทักษะใน HTML/CSS/JS และมีประสบการณ์ในการตรวจสอบคุณภาพซอฟต์แวร์
                      โอกาสร่วมงานกับทีมที่มุ่งเน้นการพัฒนาและปรับปรุงกระบวนการทำงาน</p>
                  </div>
                  <div className="lo-read mt-3">
                    <div className="flex justify-between">
                      <div className="flex">
                        <Image src={location} alt="this is icon location" />
                        <p className="name-location ml-2">Bangkok</p>
                      </div>
                      <button className="read-more mr-5">อ่านเพิ่มเติม
                        {/* <Image className="absolute" src={Polygon} alt="this is icon Polygon"/> */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-container flex-col">
          <div className="card-job flex justify-center">
            <div className="card flex">
              <div className="crad-left">
                <div className="img-job">
                  <Image src={imgjob} alt="this is  image  job" />
                </div>
              </div>
              <div className="crad-right">
                <div className="content-card">
                  <h1 className="title-card">รับนักศึกษาฝึกงานตำแหน่ง Design , IT , Devops</h1>
                  <div className="subtitle-card flex items-center ">
                    <div className="flex ml-3">
                      <Image src={organization} alt="this is icon orhanization" />
                      <p className="name-organization ml-2 mr-3">Gao Tao Software Co.</p>
                      <Image src={calender} alt="this is icon calendar" />
                      <p className="date-time ml-2">09/08/2567</p>
                      <p className="time-latest ml-2">02:08</p>
                    </div>
                  </div>
                  <div className="short-detail">
                    <p className="detail-short mt-1">เปิดรับนักศึกษาที่มีความสนใจในตำแหน่ง Project Manager และ Full-Stack Developer
                      ต้องการคนที่สามารถบริหารจัดการโครงการและเขียนโค้ดทั้ง Front-end และ Back-end ได้
                      โอกาสเรียนรู้การทำงานในโปรเจกต์ขนาดใหญ่และสภาพแวดล้อมการทำงานจริง</p>
                  </div>
                  <div className="lo-read mt-3">
                    <div className="flex justify-between">
                      <div className="flex">
                        <Image src={location} alt="this is icon location" />
                        <p className="name-location ml-2">Khon Kaen</p>
                      </div>
                      <button className="read-more mr-5">อ่านเพิ่มเติม
                        {/* <Image className="absolute" src={Polygon} alt="this is icon Polygon"/> */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="show-more-job">
          <div className="flex justify-center">
            <button>ดูเพิ่มเติม</button>
          </div>
        </div>
      </div></>
  );
}
