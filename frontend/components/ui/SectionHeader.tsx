import React from 'react'

export default function SectionHeader( {title} : {title : string}) {
  return (
    <div className="flex items-center gap-4">
        <hr className="bg-primary flex-1 h-[2px]"/>
        <div className="text-primary font-semibold">{title}</div>
        <hr className="bg-primary flex-1 h-[2px]"/>
    </div>
  )
}
