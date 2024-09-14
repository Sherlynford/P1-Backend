'use client'

import '../../style/status.css'
import Navbarstudent from '../../component/navbar-student/page';
import Image from 'next/image';
import Imgedit from '../../image/img-edit.png'
import AuthGuard from '../../component/checktoken/AuthGuard';

export default function ProfileEdit() {

    return <AuthGuard><><div>
        <Navbarstudent />

    </div><div className='Status-student'>
            <div className='search-intern flex justify-end'>
                <label htmlFor="search" className='hidden'></label>
                <input type="search" name="search" id="search" placeholder='ค้นหาชื่อหน่วยงาน, ชื่อตำแหน่ง,สถานะ' />
            </div>
            <div className='block-status flex justify-center'>
                <div className='status-intern'>
                    <table className='table-status'>
                        <thead>
                            <tr>
                                <th>ชื่อหน่วยงาน</th>
                                <th>ชื่อตำแหน่งงาน</th>
                                <th>อีเมลหน่วยงาน</th>
                                <th>เบอร์โทรหน่วยงาน</th>
                                <th>วันที่สมัครฝึกงาน</th>
                                <th>สถานะฝึกงาน</th>
                                <th>แก้ไข</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Soduim Software</td>
                                <td>Tester</td>
                                <td>Soduim@gmail.com</td>
                                <td>+12344565</td>
                                <td>04/02/2024</td>
                                <td>ตกลง</td>
                                <td><button className='edit'><Image src={Imgedit} alt='image button edit'/></button></td>
                            </tr>
                            <tr>
                                <td>Khon kaen Software</td>
                                <td>Back-end</td>
                                <td>Khonkaen@gmail.com</td>
                                <td>+23454565</td>
                                <td>14/12/2023</td>
                                <td>ปฏิเสธ</td>
                                <td><button className='edit'><Image src={Imgedit} alt='image button edit'/></button></td>
                            </tr>
                            <tr>
                                <td>Chiang mai Software</td>
                                <td>Back-end</td>
                                <td>chiangmai@gmail.com</td>
                                <td>+65344565</td>
                                <td>02/10/2023</td>
                                <td>ยกเลิก</td>
                                <td><button className='edit'><Image src={Imgedit} alt='image button edit'/></button></td>
                            </tr>
                            <tr>
                                <td>gao tao Software</td>
                                <td>Back-end</td>
                                <td>gaotao@gmail.com</td>
                                <td>+323254699</td>
                                <td>02/08/2023</td>
                                <td>ยกเลิก</td>
                                <td><button className='edit'><Image src={Imgedit} alt='image button edit'/></button></td>
                            </tr>
                            <tr>
                                <td>Bangkok Software</td>
                                <td>Front-end</td>
                                <td>bangkok@gmail.com</td>
                                <td>+2342425790</td>
                                <td>10/04/2023</td>
                                <td>ปฏิเสธ</td>
                                <td><button className='edit'><Image src={Imgedit} alt='image button edit'/></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div></>
        </AuthGuard>
}