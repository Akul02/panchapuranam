"use client"
import { useRouter } from 'next/navigation';
import React, { FormEvent, useRef, useState } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5';
import Form from '../../ui/Form';
import SubmitButton from '../../ui/SubmitButton';

export default function BulkEnrolStudents() {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [successString, setSuccessString] = useState("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const handleOnClick = () => {
        router.push("/");
    }

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
                setSuccessString("Successfully enrolled all students");

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
        <Form handleSubmit={handleSubmit} formHeading="Bulk Student Enrolment" isError={isError} errorString={errorString} isSuccess={isSuccess} successString={successString}>
            <input className="bg-[#CC9966] text-[#6E3326] rounded-md w-3/4 mb-10" type='file' accept='.csv' ref={fileInputRef} onChange={handleFileChange} />
            <SubmitButton>Registers Students</SubmitButton>
        </Form>
    )
}
