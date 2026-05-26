"use client"

import React, { useEffect, useState } from 'react'
import { StudentProfileDto } from "../../../types/student";

import StudentProfileContactDetails from "./StudentProfileContactDetails";
import StudentProfileEnrolmentDetails from "./StudentProfileEnrolmentDetails";
import StudentProfileCertificates from "./StudentProfileCertificates";
import { getStudentProfile } from "../../../api/student";

export default function StudentProfile({ studentId }: { studentId: number }) {
    
    const [student, setStudent] = useState<StudentProfileDto | null>(null)

    useEffect(() => {
        getStudentProfile(studentId.toString())
        .then(studentData => setStudent(studentData))
        .catch(err => console.log(err instanceof Error ? err.message : "Something went wrong"));
        
    },[])

    return (
        <div className="flex justify-center w-screen">
            <div className="bg-white border-2 border-primary rounded-md shadow-[0_4px_8px_0_rgba(0,0,0,0.2),_0_6px_20px_0_rgba(0,0,0,0.19)] w-[80%] mt-8 sm:mt-16 md:w-[70%] lg:w-[60%] lg:mt-32 2xl:w-[40%] 2xl:mt-40">

                <div className="h-1.5 bg-primary"/>

                <div className="p-6 flex flex-col space-y-4">

                    {/* profile header */}
                    <div className="flex">
                        <div className="w-20 h-20 rounded-full bg-primary border-2 border-secondary flex-shrink-0
                            flex items-center justify-center text-white text-2xl font-bold tracking-wide">
                            {student?.firstname.charAt(0).toLocaleUpperCase()}{student?.lastname.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-primary font-bold text-xl pl-6">
                            {student?.firstname} {student?.lastname}
                            <p className="text-sm mt-0.5">Student ID: #{student?.id}</p>    
                        </div>
                    </div>

                    <hr className="border-primary h-[2px]"/>

                    {/* contact details */}
                    {student? <StudentProfileContactDetails student={student}/> : null}

                    {/* enrolments */}
                    {student ? <StudentProfileEnrolmentDetails enrolments={student?.enrolments}/> : null}
                    
                    {/* Certificates */}
                    {student ? <StudentProfileCertificates certificates={student.certificates}/> : null}
                </div>

            </div>

        </div>
    )
}
