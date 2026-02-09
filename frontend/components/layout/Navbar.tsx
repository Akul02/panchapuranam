"use client"

import { LiaUserLockSolid } from "react-icons/lia";
import { RxHamburgerMenu } from "react-icons/rx";


import useUser from "../../hooks/useUser";
import Contact from "../sections/ContactInfo";
import { UserRole } from "../../constants/global";
import Logout from "../features/auth/Logout";
import NavButton from "../ui/NavButton";
import { useState } from "react";

export default function Navbar () {
    const [userRole] = useUser();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openMenu = () => {
        setIsMenuOpen(true);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    return (
        // bg-primary text-secondary w-full h-20 grid grid-cols-5
        <div className={`w-full h-16 bg-primary grid grid-cols-3 ${isMenuOpen ? "opacity-80" : ""}`}>
                {/* h-44 absolute left-1/2 -translate-x-1/2 */}
                <div className="col-start-1 self-center ml-4" onClick={openMenu}>
                    <RxHamburgerMenu size={30} color="#CC9966"/>
                </div>
                <img className="h-16 col-start-3 justify-self-end" src="/svglogotransparent.svg"/>
                
                <div className={`h-screen w-[75vw] opacity-80 bg-primary ${isMenuOpen ? "" : "hidden"}`}>

                </div>


                


                {/* {userRole == UserRole.TEACHER ?
                    <a href="/register/student" className="col-start-1 place-self-center">
                        <NavButton>Enrol Student</NavButton>
                    </a> : null}
                
                {userRole == UserRole.TEACHER ?
                    <a href="/register/bulk" className="col-start-2 justify-self-start self-center">
                        <NavButton>Bulk Enrol Student</NavButton>
                    </a> : null}

                {userRole == UserRole.ADMIN ?
                    <a href="/register/teacher" className="col-start-1 place-self-center"> 
                        <NavButton>Enrol Teacher</NavButton>
                    </a> : null} */}

                <div className="hidden">
                    <NavButton>
                        <Contact/>
                    </NavButton>
                </div>

                <div className="hidden">
                    {userRole == UserRole.NO_USER ?
                        <a href="/login">
                            {/* named group used to achieve hover effect on entire button as parent element is just the button content */}
                            <NavButton className="group/button">
                                <div className="flex gap-x-1">
                                    Login
                                    <LiaUserLockSolid size={22}/>
                                    <p className="text-sm hidden group-hover/button:block">Only for Teachers</p>
                                </div>
                            </NavButton>
                        </a>
                    : 
                    <NavButton>
                        <Logout/>
                    </NavButton> 
                    }
                </div>
            </div>
    );
}