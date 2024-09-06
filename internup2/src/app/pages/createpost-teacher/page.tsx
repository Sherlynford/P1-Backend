'use client'

import '../../style/createpost.css';
import NavbarTeacher from '../../component/navbar-Teacher/page'; // Use uppercase for component names
import BlockCreatePost from '../../component/createpost/page'; // Use uppercase for component names

export default function CreatePost() {
    return (
        <>
            <NavbarTeacher />
            <BlockCreatePost />
        </>
    );
}
