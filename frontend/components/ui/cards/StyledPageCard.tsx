import { ReactNode } from 'react'

export default function StyledPageCard({children, className} : {children: ReactNode, className: string}) {
  return (
    <div className={`bg-white border-2 border-primary rounded-lg shadow-[0_4px_8px_0_rgba(0,0,0,0.2),_0_6px_20px_0_rgba(0,0,0,0.19)] ${className}`}>
        <div className="h-1.5 w-full bg-primary rounded-t-lg"/>
        {children}
    </div>
  )
}