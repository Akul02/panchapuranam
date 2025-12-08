"use client"

import React, { useState } from 'react'

import { languages } from '../../../constants/global';
import useLanguage from '../../../hooks/useLanguage';

import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { useRouter } from 'next/navigation';


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
    }

    return (
        <div>
            <div className={`flex items-center cursor-pointer gap-x-1 border-2 border-[#6E3326] p-3 rounded-xl text-[#6E3326] mt-8 ${isOpen ? "bg-[#6E3326] text-[#CC9966]" : ""}`} onClick={toggleDropdown}>
                <p>Select Language</p>
                {isOpen ? <IoIosArrowDropup size={21}/> : <IoIosArrowDropdown size={21}/>}
            </div>
            <div className={`flex flex-col items-center max-h-20 overflow-y-scroll mt-2 ${isOpen ? "" : "hidden"}`}>
                {languages.map((item, index) => (
                    <div className="p-2 w-full text-center cursor-pointer hover:border-[#6E3326] hover:border-2 rounded-xl" key={index} onClick={() => selectLanguage(item)}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}
