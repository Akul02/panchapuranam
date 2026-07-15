import React from "react";
import { StudentProfileEnrolmentAssessmentDto } from "../../../../types/student";
import StatusBadge from "./StatusBadge";

export default function AssessmentInfoCard({
    assessment,
}: {
    assessment: StudentProfileEnrolmentAssessmentDto;
}) {

    const createdAt = assessment.completedAt ? new Date(assessment.completedAt) : null;

    return (
        <div key={assessment.id} className="flex items-center justify-between">
            <div className="pl-4">
                {assessment.assessmentDescription}
                <br/>
                {createdAt?.toLocaleDateString()}
                </div>
            <div className="pr-8">
                <StatusBadge status={assessment.status} />
            </div>
        </div>
    );
}
