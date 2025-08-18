"use client"

import { useEffect } from "react";
import useUser from "../hooks/useUser";
import Contact from "./ContactInfo";
import Language from "./Language";
import { UserRole } from "../constants/global";
import Logout from "./Logout";

export default function Navbar () {
    const [userRole] = useUser();



    return (
        <nav className="navbar_background"> 
            <img className="profile_pic" src="/logo_final.PNG"/>
            <Language/>
            <a href="/events">Events</a>
            {userRole == UserRole.NO_USER ? <h1>Download Certificate</h1> : null}
            {userRole == UserRole.ADMIN ? <button>Enrol Teachers</button> : null}
            {userRole == UserRole.NO_USER ? <a href="/login">Login</a> : <Logout/>}
            
            
            <Contact/>
        </nav>
    );
}