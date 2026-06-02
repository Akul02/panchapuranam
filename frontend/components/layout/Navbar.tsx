"use client"


import useUser from "../../hooks/useUser";
import Contact from "../sections/ContactInfo";
import { UserRole } from "../../constants/global";
import Logout from "../features/auth/Logout";
import NavButton from "../ui/buttons/NavButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CloseIcon, MenuIcon, UserLockIcon } from "../ui/Icons";

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
        <div className={`w-full h-16 bg-primary flex flex-col ${isMenuOpen ? "h-fit" : ""} lg:h-20 lg:grid lg:grid-cols-5`}>
                
                <div className={`ml-4 mt-4 ${isMenuOpen ? "hidden" : ""} lg:hidden`} onClick={openMenu}>
                    <MenuIcon size={30} className="text-accent"/>
                </div>
                <div className={`mt-4 ml-4 mb-6 ${isMenuOpen ? "" : "hidden"} lg:hidden`} onClick={closeMenu}>
                    <CloseIcon size={30} className="text-accent" />
                </div>

                <img className="h-16 lg:h-44 absolute left-1/2 -translate-x-1/2 cursor-pointer" src="/svglogotransparent.svg" onClick={() => router.push("/")} />

                {userRole == UserRole.TEACHER && showDashButton ?
                    <Link href="/dashboard" className={`${isMenuOpen ? "" : "hidden"} mx-10 mb-2 text-sm lg:block lg:col-start-2 lg:justify-self-start lg:self-center lg:text-base lg:m-0`}>
                        <NavButton>Dashboard</NavButton>
                    </Link> : null}
                
                {userRole == UserRole.ADMIN ?
                    <Link href="/register/teacher" className={`${isMenuOpen ? "" : "hidden"} mx-10 mb-2 text-sm lg:block lg:col-start-1 lg:place-self-center lg:text-base lg:m-0`}> 
                        <NavButton>Enrol Teacher</NavButton>
                    </Link> : null}

                <div className={`${isMenuOpen ? "" : "hidden"} mx-10 mb-2 text-sm lg:block lg:col-start-4 lg:justify-self-end lg:self-center lg:text-base lg:m-0`}>
                    <Contact/>
                </div>

                <div className={`${isMenuOpen ? "" : "hidden"} mx-10 mb-2 text-sm lg:block lg:col-start-5 lg:place-self-center lg:text-base lg:m-0`}>
                    {userRole == UserRole.NO_USER ?
                        <Link href="/login">
                            {/* named group used to achieve hover effect on entire button as parent element is just the button content */}
                            <NavButton className="group/button">
                                <div className="flex gap-x-1">
                                    Login
                                    <UserLockIcon size={22}/>
                                    <p className="text-sm hidden group-hover/button:block">Only for Teachers</p>
                                </div>
                            </NavButton>
                        </Link>
                    : <Logout/>
                    }
                </div>
            </div>
    );
}