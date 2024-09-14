'use client'

import '../../style/createpost.css';
import Navbarstudent from '../../component/navbar-student/page';
import BlockCreatePost from '../../component/createpost/page';
import AuthGuard from '../../component/checktoken/AuthGuard';

export default function Createpost() {

    return (<AuthGuard>
        <>
            <Navbarstudent />
            <BlockCreatePost />
        </>
        </AuthGuard>
    );
}
