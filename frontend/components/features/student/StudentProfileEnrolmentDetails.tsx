"use client"

import { useState } from 'react'
import SectionHeader from "../../ui/SectionHeader"
import { StudentProfileEnrolmentDto } from "../../../types/student"
import ProfileEnrolmentCard from "../../ui/ProfileEnrolmentCard"
import { FaRegSquarePlus } from "react-icons/fa6";
import Modal from "../../ui/Modal"
import StudentProgramEnrolment from "./StudentProgramEnrolment"
import { useRouter } from "next/navigation"

export default function StudentProfileEnrolmentDetails({ enrolments }: { enrolments: StudentProfileEnrolmentDto[] }) {

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
                    <FaRegSquarePlus size={20} color="#6E3326"/>
                </div>
            </SectionHeader>
            {enrolments.map((enrolment) => (
                <div key={enrolment.id}>
                    <ProfileEnrolmentCard enrolment={enrolment} />
                </div>
            ))}
            <div className={`${showEnrolModal ? "block" : "hidden"}`}>
                <Modal onClose={() => setShowEnrolModal(false)} title="Enrol into Program">
                    {/* instead of router refresh call getstudentprofile again and must link it back to the original state maybe a hook? */}
                    <StudentProgramEnrolment currentEnrolments={enrolments} onSuccess={() => {refreshProfileAfterUpdate}}/>
                </Modal>
            </div>
        </div>
    )
}
