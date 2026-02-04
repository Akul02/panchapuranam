"use client"

import { LiaUserLockSolid } from "react-icons/lia";

import useUser from "../../hooks/useUser";
import Contact from "../sections/ContactInfo";
import { UserRole } from "../../constants/global";
import Logout from "../features/auth/Logout";

export default function Navbar () {
    const [userRole] = useUser();

    return (
        //     <img className="hidden" src="/logo_final.PNG" onClick={() => router.push("/")}/>
                            // COLOUR CHANGED HERE TO MATCH THE LOGO BACKGROUND, CONSIDER CHANGING THE ENTIRE THEME OF THE SITE TO THIS COLOUR?
        <div className="bg-[#6E3326] text-[#CC9966] w-full h-20 grid grid-cols-5">

                <img className="h-44 absolute left-1/2 -translate-x-1/2" src="/svglogotransparent.svg"/>

                {userRole == UserRole.TEACHER ?
                    <a href="/register/student" className="col-start-1 place-self-center">
                        <div className="font-semibold border-2 p-2 rounded-xl border-[#CC9966] cursor-pointer hover:bg-[#CC9966] hover:text-[#6E3326]">
                            Enrol Student
                        </div>
                    </a> : null}
                
                {userRole == UserRole.TEACHER ?
                    <a href="/register/bulk" className="col-start-2 justify-self-start self-center">
                        <div className="font-semibold border-2 p-2 rounded-xl border-[#CC9966] cursor-pointer hover:bg-[#CC9966] hover:text-[#6E3326]">
                            Bulk Enrol Student
                        </div>
                    </a> : null}

                {userRole == UserRole.ADMIN ?
                    <a href="/register/teacher" className="col-start-1 place-self-center"> 
                        <div className="font-semibold border-2 p-2 rounded-xl border-[#CC9966] cursor-pointer hover:bg-[#CC9966] hover:text-[#6E3326]">
                            Enrol Teacher 
                        </div> 
                    </a> : null}

                <div className="col-start-4 justify-self-end self-center">
                    <Contact/>
                </div>

                <div className="col-start-5 place-self-center">
                    {userRole == UserRole.NO_USER ?
                        <a href="/login">
                            <div className="flex gap-x-1 font-semibold border-2 p-2 rounded-xl border-[#CC9966] cursor-pointer hover:bg-[#CC9966] hover:text-[#6E3326] group">
                                Login
                                <LiaUserLockSolid size={22}/>
                                <div className="rounded-xl bg-[#CC9966] text-[#6E3326] text-sm hidden group-hover:block">
                                    <p>Only for Teachers</p>
                                </div>
                            </div>
                        </a>
                    : <Logout/> }
                </div>
                

            </div>
    );
}