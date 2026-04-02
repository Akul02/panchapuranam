import React, { CSSProperties } from 'react'

export default function DashboardCard({ className, style, children } : {className?: string, style? : CSSProperties, children : React.ReactNode}) {
  return (
    <div className={`${className} border-primary border-2 rounded-md flex flex-col`} style={style}>
        
            {children}
        
    </div>
  )
}
