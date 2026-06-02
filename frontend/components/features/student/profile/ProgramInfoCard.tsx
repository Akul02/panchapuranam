"use client"

import { useState } from 'react'
import { StudentProfileEnrolmentDto } from "../../../../types/student"
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

export default function ProgramInfoCard ({ enrolment }: { enrolment: StudentProfileEnrolmentDto }) {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="border-primary border rounded-md w-full flex flex-col">
            <div className="bg-[#ede7d9] px-4 py-2 cursor-pointer flex justify-between" onClick={() => setShowDetails(!showDetails)}>
                {enrolment.programName}
                <div>
                    {showDetails ? <MdOutlineKeyboardArrowUp size={24} color="#6E3326"/> : <MdOutlineKeyboardArrowDown size={24} color="#6E3326"/>}
                </div>
                
            </div>
            <div className={`px-4 py-2 ${showDetails ? "" : "hidden"}`}>
                details
            </div>
        </div>
    )
}
