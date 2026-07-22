"use client"

import { useState } from 'react'
import { StudentProfileDto, StudentProfileEnrolmentDto } from "../../../../types/student"

import { ArrowDropdown, ArrowDropup, ArrowRightIcon, CertificateFillIcon } from "../../../ui/Icons";
import AssessmentInfoCard from "./AssessmentInfoCard";
import StatusBadge from "../../../ui/StatusBadge";
import { Status } from "../../../../constants/global";
import ProgressBar from "../../../ui/ProgressBar";
import SubmitButton from "../../../ui/buttons/SubmitButton";
import { formatDate } from "../../../../helpers/DateFormatter";

export default function ProgramInfoCard ({ enrolment }: { enrolment: StudentProfileEnrolmentDto }) {

    const enrolmentDate =  formatDate(new Date(enrolment.enrolmentDate));
    const completionDate = enrolment.completionDate ? formatDate(new Date(enrolment.completionDate)) : null;

    return (
        <div className="border-primary border rounded-md px-4 py-2 flex flex-col gap-2 items-start">
            <div className="self-stretch flex items-center justify-between">
                <h1 className="font-heading font-semibold text-primary">{enrolment.programName}</h1>
                {enrolment.certificateUrl ?
                    <a href={enrolment.certificateUrl}>
                        <CertificateFillIcon className="text-primary mr-1" size={22}/> 
                    </a>
                : null}
            </div>
            
            <StatusBadge status={Status.IN_PROGRESS}/>

            <ProgressBar className="w-full" completed={enrolment.completedAssessments} total={enrolment.totalAssessments}/>
            
            <hr className="bg-primary self-stretch h-[1px]"/>

            <div className="self-stretch mt-1 flex items-center justify-between">
                <div className="flex-start flex flex-col text-sm text-gray-600">
                    <span>Enrolled {enrolmentDate}</span>
                    {completionDate ? <span>Completed At: {completionDate}</span> : null}
                </div>
                <SubmitButton>
                    <div className="flex items-center gap-3">
                        Update Learning <ArrowRightIcon/>
                    </div>
                </SubmitButton>
            </div>

        </div>
    )
}
