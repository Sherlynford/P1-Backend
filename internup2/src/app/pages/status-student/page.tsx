'use client'

import '../../style/status.css'
import Navbarteacher from '../../component/navbar-Teacher/page';
import Image from 'next/image';
import Imgedit from '../../image/img-edit.png'

export default function Status() {

    return <><div>
        <Navbarteacher />

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
                                <th>รหัสประจำตัวนิสิต</th>
                                <th>ชื่อจริง</th>
                                <th>นามสกุล</th>
                                <th>ชื่อหน่วยงาน</th>
                                <th>ชื่อตำแหน่งงาน</th>
                                <th>วันที่สมัครฝึกงาน</th>
                                <th>สถานะฝึกงาน</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>65022410</td>
                                <td>Jasmine</td>
                                <td>Thaitea</td>
                                <td>Soduim Software</td>
                                <td>Tester</td>
                                <td>04/02/2024</td>
                                <td>ยอมรับ</td>
                            </tr>
                            <tr>
                                <td>65022411</td>
                                <td>Jane</td>
                                <td>Arryn</td>
                                <td>Khon kaen Software</td>
                                <td>Back-end</td>
                                <td>14/12/2023</td>
                                <td>ปฎิเสธ</td>
                            </tr>
                            <tr>
                                <td>65022412</td>
                                <td>Tony</td>
                                <td>stark</td>
                                <td>Chiang  mai Software</td>
                                <td>Back-end</td>
                                <td>02/10/2023</td>
                                <td>สมัคร</td>
                            </tr>
                            <tr>
                                <td>65022413</td>
                                <td>Steve</td>
                                <td>Roger</td>
                                <td>gao tao Software</td>
                                <td>Back-end</td>
                                <td>02/08/2023</td>
                                <td>ยกเลิก</td>
                            </tr>
                            <tr>
                                <td>65022414</td>
                                <td>Bruce</td>
                                <td>banner</td>
                                <td>Bangkok Software</td>
                                <td>Front-end</td>
                                <td>10/04/2023</td>
                                <td>ยอมรับ</td>
                            </tr>
                            <tr>
                                <td>65022415</td>
                                <td>scarlet</td>
                                <td>anna</td>
                                <td>Khon kaen Software</td>
                                <td>Back-end</td>
                                <td>14/12/2023</td>
                                <td>ปฎิเสธ</td>
                            </tr>
                            <tr>
                                <td>65022416</td>
                                <td>snow</td>
                                <td>white</td>
                                <td>Chiang  mai Software</td>
                                <td>Back-end</td>
                                <td>02/10/2023</td>
                                <td>สมัคร</td>
                            </tr>
                            <tr>
                                <td>65022417</td>
                                <td>token</td>
                                <td>black</td>
                                <td>gao tao Software</td>
                                <td>Back-end</td>
                                <td>02/08/2023</td>
                                <td>ยกเลิก</td>
                            </tr>
                            <tr>
                                <td>65022418</td>
                                <td>eric</td>
                                <td>cartman</td>
                                <td>Bangkok Software</td>
                                <td>Front-end</td>
                                <td>10/04/2023</td>
                                <td>เลือก</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div></>
}