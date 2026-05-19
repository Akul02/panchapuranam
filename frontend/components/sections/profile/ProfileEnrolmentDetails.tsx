import React from 'react'
import SectionHeader from "../../ui/SectionHeader"
import { StudentProfileEnrolmentDto } from "../../../types/student"
import ProfileEnrolmentCard from "../../ui/ProfileEnrolmentCard"

export default function ProfileEnrolmentDetails( {enrolments} : {enrolments : StudentProfileEnrolmentDto[]}) {
  return (
    <div className="flex flex-col space-y-2">
        <SectionHeader title="Enrolments"/>
        {enrolments.map((enrolment) => (
            <div key={enrolment.id}>
                <ProfileEnrolmentCard enrolment={enrolment}/>
            </div>
        ))}
        <div>test</div>
    </div>
  )
}
