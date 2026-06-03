import React, { ReactNode } from 'react'

export default function SubmitButton ({children, className, onclick} : {children: ReactNode, className?: string, onclick?:() => void}) {
  return (
    <button onClick={onclick }className={`${className} rounded-md py-2.5 text-center font-bold font-heading text-sm bg-primary text-accent hover:bg-accent hover:text-primary transition-colors`}>
        {children}
    </button>
  )
}