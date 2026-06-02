import React, { ReactNode } from 'react'

export default function SubmitButton ({children, className, onclick} : {children: ReactNode, className?: string, onclick?:() => void}) {
  return (
    <button onClick={onclick }className={`${className} rounded-md py-2.5 text-center font-bold text-sm bg-primary text-secondary hover:bg-secondary hover:text-primary transition-colors`}>
        {children}
    </button>
  )
}
