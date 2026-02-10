import React from 'react'

export default function NavButton({ className = "", children } : {className?: string, children : React.ReactNode}) {
  return (
    <div className={`${className} font-semibold border-2 p-2 rounded-xl flex justify-center text-secondary border-secondary cursor-pointer hover:bg-secondary hover:text-primary`}>
        {children}
    </div>
  )
}
