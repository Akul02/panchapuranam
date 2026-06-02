"use client"

import { useState } from 'react'
import { languages } from '../../../constants/global';
import useLanguage from '../../../hooks/useLanguage';
import { useRouter } from 'next/navigation';
import { ArrowDropdown, ArrowDropup } from "../../ui/Icons";

export default function Language () {

    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useLanguage();
    const router = useRouter();

    function toggleDropdown () {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }

    function selectLanguage (item:string) {
        setLanguage(item);
        toggleDropdown();
        router.push(`/?language=${item}`);
    }

    return (
        <div className="">
            <div className={`flex items-center cursor-pointer gap-x-1 border-2 border-primary p-3 rounded-xl  mt-8 ${isOpen ? "text-accent bg-primary" : "text-primary"}`} onClick={toggleDropdown}>
                <p>Select Language</p>
                {isOpen ? <ArrowDropup className="text-accent" size={21}/> : <ArrowDropdown className="text-primary" size={21}/>}
            </div>
            <div className={`flex flex-col items-center max-h-20 overflow-y-scroll mt-2 ${isOpen ? "" : "hidden"}`}>
                {languages.map((item, index) => (
                    <div className="p-2 w-full text-center cursor-pointer hover:border-primary hover:border-2 rounded-xl" key={index} onClick={() => selectLanguage(item)}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}
