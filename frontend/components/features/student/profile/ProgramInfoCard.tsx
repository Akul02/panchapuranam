"use client"

import { useState } from 'react'
import { StudentProfileDto, StudentProfileEnrolmentAssessmentDto, StudentProfileEnrolmentDto } from "../../../../types/student"

import { ArrowDropdown, ArrowDropup } from "../../../ui/Icons";
import AssessmentInfoCard from "./AssessmentInfoCard";

export default function ProgramInfoCard ({ enrolment }: { enrolment: StudentProfileEnrolmentDto }) {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="border-primary border rounded-md w-full flex flex-col">
            <div className="bg-accent px-4 py-2 cursor-pointer flex justify-between" onClick={() => setShowDetails(!showDetails)}>
                {enrolment.programName}
                <div>
                    {showDetails ? <ArrowDropup size={24} className="text-primary"/> : <ArrowDropdown size={24} className="text-primary"/>}
                </div>
                
            </div>
            <div className={`px-4 py-2 ${showDetails ? "" : "hidden"}`}>
                {enrolment.assessments.map((assessment : StudentProfileEnrolmentAssessmentDto) => (

                    <AssessmentInfoCard assessment={assessment} />

                ))}
            </div>
        </div>
    )
}
