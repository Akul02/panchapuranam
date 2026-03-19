import React from 'react'

export default function DashboardCard({ className = "", children } : {className?: string, children : React.ReactNode}) {
  return (
    <div className="w-screen shrink-0 snap-start">
        <div className="border-primary border-2 rounded-md mt-10 mx-10 min-h-[600px]">
            {children}
        </div>
    </div>
  )
}
