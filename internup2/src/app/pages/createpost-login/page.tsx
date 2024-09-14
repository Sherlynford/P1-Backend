'use client'

import '../../style/createpost.css';
import NavbarLogin from '../../component/navbar-login/page';
import BlockCreatePost from '../../component/createpost/page';
import AuthGuard from '../../component/checktoken/AuthGuard';

export default function Createpost() {

    return (<AuthGuard>
        <>
            <NavbarLogin />
            <BlockCreatePost />
        </>
        </AuthGuard>
    );
}
