import React from 'react'

export default function Button({ className = "", children } : {className?: string, children : React.ReactNode}) {
  return (
    <div className={`${className} font-semibold border-2 p-2 rounded-xl border-[#CC9966] cursor-pointer hover:bg-[#CC9966] hover:text-[#6E3326]`}>
        {children}
    </div>
  )
}
