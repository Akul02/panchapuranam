import React from 'react'
import { StudentProfileEnrolmentDto } from "../../types/student"

export default function ProfileEnrolmentCard( {enrolment} : {enrolment : StudentProfileEnrolmentDto}) {
  return (
    <div className="border-primary border rounded-md w-full flex flex-col">
        <div className="bg-[#ede7d9] px-4 py-2">
            {enrolment.programName}
        </div>
        <div className="px-4 py-2">
            test
        </div>
    </div>
  )
}
