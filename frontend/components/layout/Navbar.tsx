"use client"

import { LiaUserLockSolid } from "react-icons/lia";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";



import useUser from "../../hooks/useUser";
import Contact from "../sections/ContactInfo";
import { UserRole } from "../../constants/global";
import Logout from "../features/auth/Logout";
import NavButton from "../ui/NavButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar ({showDashButton = false}: {showDashButton?:boolean}) {
    const [userRole] = useUser();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openMenu = () => {
        setIsMenuOpen(true);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    const router = useRouter();

    return (
        // bg-primary text-secondary w-full h-20 grid grid-cols-5
        <div className={`w-full h-16 bg-primary flex flex-col ${isMenuOpen ? "h-fit" : ""} lg:h-20 lg:grid lg:grid-cols-5`}>
                
                <div className={`ml-4 mt-4 ${isMenuOpen ? "hidden" : ""} lg:hidden`} onClick={openMenu}>
                    <RxHamburgerMenu size={30} color="#CC9966"/>
                </div>
                <div className={`mt-4 ml-4 mb-6 ${isMenuOpen ? "" : "hidden"} lg:hidden`} onClick={closeMenu}>
                    <IoClose size={40} color="#CC9966" />
                </div>

                <img className="h-16 lg:h-44 absolute left-1/2 -translate-x-1/2 cursor-pointer" src="/svglogotransparent.svg" onClick={() => router.push("/")} />
                
                {/* {userRole == UserRole.TEACHER ?
                    <a href="/register/student" className={`${isMenuOpen ? "" : "hidden"} mx-10 mb-2 text-sm lg:block lg:col-start-1 lg:place-self-center lg:text-base lg:m-0`}>
                        <NavButton>Enrol Student</NavButton>
                    </a> : null}
                
                {userRole == UserRole.TEACHER ?
                    <a href="/register/bulk" className={`${isMenuOpen ? "" : "hidden"} mx-10 mb-2 text-sm lg:block lg:col-start-2 lg:justify-self-start lg:self-center lg:text-base lg:m-0`}>
                        <NavButton>Bulk Enrol Student</NavButton>
                    </a> : null} */}

                {userRole == UserRole.TEACHER && showDashButton ?
                    <a href="/dashboard" className={`${isMenuOpen ? "" : "hidden"} mx-10 mb-2 text-sm lg:block lg:col-start-2 lg:justify-self-start lg:self-center lg:text-base lg:m-0`}>
                        <NavButton>Dashboard</NavButton>
                    </a> : null}
                
                {userRole == UserRole.ADMIN ?
                    <a href="/register/teacher" className={`${isMenuOpen ? "" : "hidden"} mx-10 mb-2 text-sm lg:block lg:col-start-1 lg:place-self-center lg:text-base lg:m-0`}> 
                        <NavButton>Enrol Teacher</NavButton>
                    </a> : null}

                <div className={`${isMenuOpen ? "" : "hidden"} mx-10 mb-2 text-sm lg:block lg:col-start-4 lg:justify-self-end lg:self-center lg:text-base lg:m-0`}>
                    <Contact/>
                </div>

                <div className={`${isMenuOpen ? "" : "hidden"} mx-10 mb-2 text-sm lg:block lg:col-start-5 lg:place-self-center lg:text-base lg:m-0`}>
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
                    : <Logout/>
                    }
                </div>
            </div>
    );
}