"use client"
import { responseCookiesToRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import React, { FormEvent, useRef, useState } from 'react'

export default function bulk () {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const fileInputRef = useRef<HTMLInputElement | null>(null); 

    const handleSubmit = (e: FormEvent) => {

        e.preventDefault();


        if (!selectedFile) {
            console.log("Please select a file first");
            return;
        }
    
        const formData = new FormData;
        formData.append("file", selectedFile);

        fetch(`${apiUrl}/student/bulk/register`, {
            method : "POST",
            body: formData,
        })
        .then(async (res) => {
            if (!res.ok) {
                const errMsg = await res.text();
                throw new Error(errMsg);
            }

            const resText = await res.text();
            console.log(resText);

        })
        .catch(err => {
            console.log(err.message);
        })
        .finally(() => {
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        })
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <input type='file' accept='.csv' ref={fileInputRef} onChange={handleFileChange} />
            <button className='form_submit_btn' type="submit">Register Students</button>
        </form>
    )
}
