import React from 'react'
import { AssessmentStatus } from "../../../../constants/global"
import { CompletedIcon, InProgressIcon } from "../../../ui/Icons"

const statusConfig = {
  [AssessmentStatus.COMPLETED]: {
    label: "Completed",
    icon: CompletedIcon,
    className: "bg-green-100 text-green-700",
  },
  [AssessmentStatus.IN_PROGRESS]: {
    label: "In progress",
    icon: InProgressIcon,
    className: "bg-amber-100 text-amber-700",
  },
}

export default function StatusBadge({ status }: { status: AssessmentStatus }) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span
        className={`inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${config.className}`}
    >
      <Icon size={13} />
      {config.label}
    </span>
  )
}