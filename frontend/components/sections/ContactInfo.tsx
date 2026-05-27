'use client'

import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import NavButton from "../ui/NavButton";

export default function Contact () {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div onClick={() => setIsOpen(!isOpen)}>
            <NavButton>
                <h1 className={`flex gap-x-1 font-semibold ${isOpen ? "hidden" : "null"}`}>Contact Info</h1>

                <div className={`flex gap-x-1 font-semibold ${isOpen ? "null" : "hidden"}`}>
                    <h1>Name: Ananth &</h1>
                    <a href="mailto:ananth00@outlook.com" target="_blank">
                        <div className="flex gap-x-1">
                            <p>Email:</p>
                            <MdOutlineEmail size={22}/>
                        </div>
                    </a>
                </div>
            </NavButton>
        </div>
    )
}