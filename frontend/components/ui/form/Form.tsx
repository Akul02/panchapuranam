import { useRouter } from 'next/navigation';
import { FormEvent, ReactNode } from 'react'
import StyledPageCard from "../cards/StyledPageCard";
import { CloseIcon } from "../Icons";

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
        <StyledPageCard className="flex flex-col w-[350px] min-h-[400px] pb-8 fixed">
        
            <form onSubmit={handleSubmit} className=" ">

                <div className="mt-4 flex flex-col items-center gap-6 px-12">
                    <div className="absolute right-1 top-1 p-3 cursor-pointer" onClick={handleOnClick}>
                    <CloseIcon className="text-primary" size={28} />
                    </div>

                    <h1 className="mt-2 font-bold font-heading text-2xl text-primary text-center">
                        {formHeading}
                    </h1>

                    <div className={`text-red-600 ${isError ? "": "hidden"}`}>
                        {errorString}
                    </div>

                    <div className={`${isSuccess ? "": "hidden"}`}>
                        {successString}
                    </div>

                    {children}
                </div>
            </form>
        </StyledPageCard>
    )
}
