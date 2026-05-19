import React from 'react'
import SectionHeader from "../../ui/SectionHeader"
import { MdEmail } from "react-icons/md"
import { GiGraduateCap } from "react-icons/gi"
import { PiCertificateFill } from "react-icons/pi"

import { StudentProfileDto } from "../../../types/student"

export default function ProfileContactDetails( {student} : {student : StudentProfileDto}) {
  return (
    <div>
        <SectionHeader title="Contact Details"></SectionHeader>
        <div className="grid grid-cols-[30px_90px_1fr] grid-rows-3 gap-2 overflow-x-auto mt-1">

            {/* col one */}
            <div className="col-start-1 row-start-1 self-center"><MdEmail color="#6E3326" size={22}/></div>
            <div className="col-start-1 row-start-2 self-center"><GiGraduateCap color="#6E3326" size={22}/></div>
            <div className="col-start-1 row-start-3 self-center"><PiCertificateFill color="#6E3326" size={22}/></div>

            {/* col two */}
            <div className="col-start-2 row-start-1 self-center">Email</div>
            <div className="col-start-2 row-start-2 self-center">Enrolments</div>
            <div className="col-start-2 row-start-3 self-center">Certificates</div>

            {/* col three */}
            <div className="col-start-3 row-start-1 self-center">{student?.email}</div>
            <div className="col-start-3 row-start-2 self-center">{student?.enrolments.length} courses</div>
            <div className="col-start-3 row-start-3 self-center">{student?.certificates.length} achieved</div>
        </div>
    </div>
  )
}
