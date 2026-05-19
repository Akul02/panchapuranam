import { useRouter } from 'next/navigation';
import React, { FormEvent, ReactNode } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'

interface formProps {
    handleSubmit: (e: FormEvent) => void,
    formHeading: string,
    isError: boolean,
    errorString: string,
    isSuccess?: boolean,
    successString?: string,
    children: ReactNode
}

export default function Form({handleSubmit, formHeading, isError, errorString, isSuccess, successString, children} : formProps) {
    
    const router = useRouter();
    

    const handleOnClick = () => {
        router.back();
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-[350px] min-h-[400px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-primary text-secondary shadow-[0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)]">
            <div className="absolute right-1 top-1 p-3 cursor-pointer" onClick={handleOnClick}>
                <IoCloseCircleOutline color="secondary" size={28} />
            </div>

            <h1 className="font-bold text-2xl mt-10 mb-8 text-center">
                {formHeading}
            </h1>

            <div className={`text-red-600 mb-5 ${isError ? "": "hidden"}`}>
                {errorString}
            </div>

            <div className={`mb-5 ${isSuccess ? "": "hidden"}`}>
                {successString}
            </div>

            {children}

        </form>
    )
}
