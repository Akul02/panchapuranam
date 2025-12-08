"use client"

import { LiaUserLockSolid } from "react-icons/lia";

import useUser from "../../hooks/useUser";
import Contact from "../sections/ContactInfo";
import { UserRole } from "../../constants/global";
import Logout from "../features/auth/Logout";

export default function Navbar () {
    const [userRole] = useUser();

    return (
        // <nav className="flex flex-row justify-evenly"> 
        //     <img className="hidden" src="/logo_final.PNG" onClick={() => router.push("/")}/>
        //     <Language/>
        //     {userRole == UserRole.NO_USER ? <a href="/download">Download Certificate</a> : null}
        //     {userRole == UserRole.ADMIN ? <a href="/register/teacher">Enrol Teacher</a> : null}
        //     {userRole == UserRole.TEACHER ? <a href="/register/student">Enrol Student</a> : null}
        //     {userRole == UserRole.TEACHER ? <a href="/register/bulk">Bulk Enrol Student</a> : null}
        //     {userRole == UserRole.NO_USER ? <a href="/login">Login</a> : <Logout/>}
        //     <Contact/>
        // </nav>

        <div className="bg-[#6E3326] w-full h-20 mt-12 bg-[radial-gradient(ellipse_25%_75%_at_top,_rgba(255,223,186,0.7)_0%,_rgba(255,165,0,0.3)_30%,_rgba(184,134,11,0.1)_70%,_rgba(110,51,38,0)_100%)]">
            <div className="flex gap-10 justify-end pt-4 pr-16 text-[#CC9966]">
                <Contact/>
                <div className="flex gap-x-1 border-2 p-2 rounded-xl border-[#CC9966] cursor-pointer hover:bg-[#CC9966] hover:text-[#6E3326] group">
                    {userRole == UserRole.NO_USER ? <a href="/login">Login</a> : <Logout/>}
                    <LiaUserLockSolid size={22}/>
                    <div className="absolute top-28 right-6 p-2 rounded-xl bg-[#CC9966] text-[#6E3326] text-sm hidden group-hover:block">
                        <p>Only for Teachers</p>
                    </div>
                </div>
            </div>
        </div>
    );
}