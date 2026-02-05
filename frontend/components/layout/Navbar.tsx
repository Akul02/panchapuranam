"use client"

import { LiaUserLockSolid } from "react-icons/lia";

import useUser from "../../hooks/useUser";
import Contact from "../sections/ContactInfo";
import { UserRole } from "../../constants/global";
import Logout from "../features/auth/Logout";
import NavButton from "../ui/NavButton";

export default function Navbar () {
    const [userRole] = useUser();

    return (
        <div className="bg-primary text-secondary w-full h-20 grid grid-cols-5">

                <img className="h-44 absolute left-1/2 -translate-x-1/2" src="/svglogotransparent.svg"/>

                {userRole == UserRole.TEACHER ?
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
                    </a> : null}

                <div className="col-start-4 justify-self-end self-center">
                    <NavButton>
                        <Contact/>
                    </NavButton>
                </div>

                <div className="col-start-5 place-self-center">
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