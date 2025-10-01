"use client"

import { useEffect } from "react";
import useUser from "../../hooks/useUser";
import Contact from "../features/ContactInfo";
import Language from "../features/songs/Language";
import { UserRole } from "../../constants/global";
import Logout from "../features/auth/Logout";
import { useRouter } from "next/navigation";

export default function Navbar () {
    const [userRole] = useUser();
    const router = useRouter();


    return (
        <nav className="navbar_background"> 
            <img className="profile_pic" src="/logo_final.PNG" onClick={() => router.push("/")}/>
            <Language/>
            <a href="/events">Events</a>
            {userRole == UserRole.NO_USER ? <h1>Download Certificate</h1> : null}
            {userRole == UserRole.ADMIN ? <a href="/register/teacher">Enrol Teacher</a> : null}
            {userRole == UserRole.TEACHER ? <a href="/register/student">Enrol Student</a> : null}
            {userRole == UserRole.NO_USER ? <a href="/login">Login</a> : <Logout/>}
            <Contact/>
        </nav>
    );
}