import React from "react";
import { StudentProfileEnrolmentAssessmentDto } from "../../../../types/student";
import StatusBadge from "../../../ui/StatusBadge";

export default function AssessmentInfoCard({
    assessment,
}: {
    assessment: StudentProfileEnrolmentAssessmentDto;
}) {

    const completedAt = assessment.completedAt ? new Date(assessment.completedAt) : null;

    return (
        <div className="flex items-center justify-between">
            <div className="pl-4">
                {assessment.assessmentDescription}
                <br/>
                {completedAt ? <div> Completed At {completedAt.toLocaleDateString()} </div> : null}
                </div>
            <div className="pr-8">
                <StatusBadge status={assessment.status} />
            </div>
        </div>
    );
}
