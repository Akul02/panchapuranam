"use client"

import React, { useState } from 'react'

import { languages } from '../constants/global';
import useLanguage from '../hooks/useLanguage';

import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";


const Language = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useLanguage();

    function toggleDropdown () {
        if (isOpen) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }

    function selectLanguage (item:string) {
        setLanguage(item)
        toggleDropdown()
    }

    return (
        <div>
            <div className='dropdown_btn' onClick={toggleDropdown}>
                Select Language
                <span className='toggle_icon'>
                    {isOpen ? <IoIosArrowDropup/> : <IoIosArrowDropdown/>}
                </span>
            </div>
            <div className={`dropdown_options ${isOpen ? "null" : "hide"}`}>
                {languages.map((item, index) => (
                    <div className='dropdown_item' key={index} onClick={() => selectLanguage(item)}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Language