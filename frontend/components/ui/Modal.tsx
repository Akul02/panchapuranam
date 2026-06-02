import { CloseIcon } from "./Icons"

export default function Modal( {onClose, title, className, children} : {onClose: () => void, title: string, className?: string, children : React.ReactNode}) {
    return (
        <div className={`${className} fixed inset-0 bg-primary/20 flex items-center justify-center z-50 px-4`} onClick={onClose} >
            <div className="w-full max-w-md max-h-[96vh] bg-white border border-primary rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="h-1.5 bg-primary"/>
                <div className="p-6 flex flex-col">
                    <div className="flex justify-between mb-2"> 
                        <h2 className="text-lg font-bold text-primary">{title}</h2>
                        <div onClick={onClose}>
                            <CloseIcon size={26} className="text-primary"/>
                        </div>
                    </div>
                    {children}
                </div>
            </div>

        </div>
    )
}