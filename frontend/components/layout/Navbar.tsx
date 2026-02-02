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

        <div className="bg-[#6E3326] text-[#CC9966] w-full h-20 grid grid-cols-5 bg-[radial-gradient(ellipse_25%_75%_at_top,_rgba(255,223,186,0.7)_0%,_rgba(255,165,0,0.3)_30%,_rgba(184,134,11,0.1)_70%,_rgba(110,51,38,0)_100%)]">

                {userRole == UserRole.TEACHER ?
                    <a href="/register/student" className="col-start-1 place-self-center">
                        <div className="border-2 p-2 rounded-xl border-[#CC9966] cursor-pointer hover:bg-[#CC9966] hover:text-[#6E3326]">
                            Enrol Student
                        </div>
                    </a> : null}
                
                {userRole == UserRole.TEACHER ?
                    <a href="/register/bulk" className="col-start-2 justify-self-start self-center">
                        <div className="border-2 p-2 rounded-xl border-[#CC9966] cursor-pointer hover:bg-[#CC9966] hover:text-[#6E3326]">
                            Bulk Enrol Student
                        </div>
                    </a> : null}

                {userRole == UserRole.ADMIN ?
                    <a href="/register/teacher" className="col-start-1 place-self-center"> 
                        <div className="border-2 p-2 rounded-xl border-[#CC9966] cursor-pointer hover:bg-[#CC9966] hover:text-[#6E3326]">
                            Enrol Teacher 
                        </div> 
                    </a> : null}

                <div className="col-start-4 justify-self-end self-center">
                    <Contact/>
                </div>

                {/* Login/Logout Button */}
                {/* <div className="col-start-5 place-self-center flex gap-x-1 border-2 p-2 rounded-xl border-[#CC9966] cursor-pointer hover:bg-[#CC9966] hover:text-[#6E3326] group">
                    {userRole == UserRole.NO_USER ?
                        <a href="/login">
                            <div className="flex gap-x-1">
                                Login
                                <LiaUserLockSolid size={22}/>
                                <div className="absolute top-16 right-6 p-2 rounded-xl bg-[#CC9966] text-[#6E3326] text-sm hidden group-hover:block">
                                    <p>Only for Teachers</p>
                                </div>
                            </div>
                        </a> : <Logout/>}        
                </div> */}

                <div className="col-start-5 place-self-center">
                    {userRole == UserRole.NO_USER ?
                        <a href="/login">
                            <div className="flex gap-x-1 border-2 p-2 rounded-xl border-[#CC9966] cursor-pointer hover:bg-[#CC9966] hover:text-[#6E3326] group">
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