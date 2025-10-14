"use client"
import React, { FormEvent, useRef, useState } from 'react'

export default function BulkEnrolStudents() {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: FormEvent) => {

        e.preventDefault();
        setIsSuccess(false);
        setIsError(false);

        if (!selectedFile) {
            setIsError(true);
            setErrorString("Please select a file first");
            return;
        }

        const formData = new FormData;
        formData.append("file", selectedFile);

        fetch(`${apiUrl}/student/bulk/register`, {
            method: "POST",
            body: formData,
            credentials: "include",
        })
            .then(async (res) => {
                if (!res.ok) {
                    const errMsg = await res.text();
                    throw new Error(errMsg);
                }

                const resText = await res.text();
                console.log(resText);
                setIsSuccess(true);

            })
            .catch(err => {
                setIsError(true);
                setErrorString(err.message);
                console.log(err.message);
            })
            .finally(() => {
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                setSelectedFile(null);
            })
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <h1 className='form_heading'>Bulk Student Enrolment</h1>

            <div className={`form_error ${isError ? "" : "hide"}`}>
                <p>{errorString}</p>
            </div>

            <div className={`form_msg ${isSuccess ? "" : "hide"}`}>
                <p>Successfully enrolled all students</p>
            </div>

            <input className="form_input" type='file' accept='.csv' ref={fileInputRef} onChange={handleFileChange} />
            <button className='form_submit_btn' type="submit">Register Students</button>
        </form>
    )
}
