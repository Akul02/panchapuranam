"use client"

import React, { FormEvent, useRef, useState } from 'react'
import Form from '../../ui/Form';
import SubmitButton from '../../ui/FormSubmitButton';
import { bulkRegisterStudents } from "../../../api/student";

export default function BulkEnrolStudents() {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [successString, setSuccessString] = useState("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = async (e: FormEvent) => {

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

        try {
            const resSuccess = await bulkRegisterStudents(formData);
            setIsSuccess(true);
            setSuccessString(resSuccess.message);

        } catch (err) {
            setIsError(true);
            setErrorString(err instanceof Error ? err.message : "Something went wrong");

        } finally {
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            setSelectedFile(null);
        }
    }

    return (
        <Form handleSubmit={handleSubmit} formHeading="Bulk Student Enrolment" isError={isError} errorString={errorString} isSuccess={isSuccess} successString={successString}>
            <input className="bg-secondary text-primary rounded-md w-3/4 mb-10" type='file' accept='.csv' ref={fileInputRef} onChange={handleFileChange} />
            <SubmitButton>Registers Students</SubmitButton>
        </Form>
    )
}
