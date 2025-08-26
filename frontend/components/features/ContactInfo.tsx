'use client'

import { useState } from "react";
import { MdEmail } from "react-icons/md";

export default function Contact () {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="contact_info">
            <h1 onClick={() => setIsOpen(!isOpen)}>Contact Info</h1>
            <div className={`${isOpen ? "null" : "hide"}`}>
                <h1>Name: Ananth</h1>
                <a className="email_link"href="mailto:ananth00@outlook.com">Email<span className="email_icon"><MdEmail/></span></a>
            </div>
        </div>
    )
}