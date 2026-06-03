'use client'

import { useState } from "react";
import NavButton from "../ui/buttons/NavButton";
import { OutlineEmailIcon } from "../ui/Icons";

export default function Contact () {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div onClick={() => setIsOpen(!isOpen)}>
            <NavButton>
                <h1 className={`flex gap-x-1 ${isOpen ? "hidden" : "null"}`}>Contact Info</h1>

                <div className={`flex gap-x-1 ${isOpen ? "null" : "hidden"}`}>
                    <h1>Name: Ananth &</h1>
                    <a href="mailto:ananth00@outlook.com" target="_blank">
                        <div className="flex gap-x-1">
                            <p>Email:</p>
                            <OutlineEmailIcon size={22}/>
                        </div>
                    </a>
                </div>
            </NavButton>
        </div>
    )
}