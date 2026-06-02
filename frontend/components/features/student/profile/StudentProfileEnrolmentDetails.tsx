"use client"

import { useState } from 'react'
import { FaRegSquarePlus } from "react-icons/fa6";
import { useRouter } from "next/navigation"
import { StudentProfileEnrolmentDto } from "../../../../types/student";
import SectionHeader from "../../../ui/SectionHeader";
import StudentProgramEnrolment from "./StudentProgramEnrolment";
import ProgramInfoCard from "./ProgramInfoCard";

export default function StudentProfileEnrolmentDetails({ enrolments, availablePrograms }: { enrolments: StudentProfileEnrolmentDto[], availablePrograms: string[] }) {

    const [showEnrolModal, setShowEnrolModal] = useState(false);

    const router = useRouter();

    const refreshProfileAfterUpdate = () => {
        setShowEnrolModal(false);
        router.refresh();
    }

    return (
        <div className="flex flex-col space-y-2">
            <SectionHeader title="Enrolments">
                <div onClick={() => setShowEnrolModal(true)}>
                    <FaRegSquarePlus size={20} className="text-primary"/>
                </div>
            </SectionHeader>
            {enrolments.map((enrolment) => (
                <div key={enrolment.id}>
                    <ProgramInfoCard enrolment={enrolment} />
                </div>
            ))}
            {/* instead of router refresh call getstudentprofile again and must link it back to the original state maybe a hook? */}
            <StudentProgramEnrolment showEnrolModal={showEnrolModal} setShowEnrolModal={setShowEnrolModal} availablePrograms={availablePrograms} onSuccess={refreshProfileAfterUpdate}/>
        </div>
    )
}
