"use client"

import { useEffect } from "react";
import useUser from "../hooks/useUser";
import Contact from "./ContactInfo";
import Language from "./Language";
import { UserRole } from "../constants/global";

export default function Navbar () {
    const [userRole] = useUser();

    return (
        <nav className="navbar_background"> 
            <img className="profile_pic" src="/logo_final.PNG"/>
            <Language/>
            <a href="/events">Events</a>
            <h1>Download Certificate</h1>
            {userRole == UserRole.NO_USER ? <a href="/login">Login</a> : <button>logout</button>}
            
            <Contact/>
        </nav>
    );
}