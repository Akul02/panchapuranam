"use client"

import { FormEvent, useRef, useState } from 'react'
import Form from '../../ui/form/Form';
import { bulkRegisterStudents } from "../../../api/client/student";
import SubmitButton from '../../ui/buttons/SubmitButton';
import { handleAppErrors } from "../../../lib/api/handlerAppErrors";

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

        // try {
        //     const resSuccess = await bulkRegisterStudents(formData);
        //     setIsSuccess(true);
        //     setSuccessString(resSuccess.message);

        // } catch (err) {
        //     setIsError(true);
        //     setErrorString(err instanceof Error ? err.message : "Something went wrong");

        // } finally {
        //     if (fileInputRef.current) {
        //         fileInputRef.current.value = "";
        //     }
        //     setSelectedFile(null);
        // }

        const apiResult = await handleAppErrors(bulkRegisterStudents(formData));

        if (apiResult.success == false) {
            setIsError(true);
            setErrorString(apiResult.data.message);
        } else {
            setIsSuccess(true);
            setSuccessString(apiResult.data.message);
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setSelectedFile(null);
    }

    return (
        <div className="h-full flex items-center justify-center">
            <Form handleSubmit={handleSubmit} formHeading="Bulk Student Enrolment" isError={isError} errorString={errorString} isSuccess={isSuccess} successString={successString}>
                <div>
                    <label htmlFor="file_input" className="block text-xs font-bold uppercase tracking-widest text-maroon/60 mb-1">Select File</label>
                    <input className="bg-white border-primary border text-primary rounded-md w-full" type='file' accept='.csv' ref={fileInputRef} onChange={handleFileChange} />
                </div>
                
                <SubmitButton className="mt-6 w-3/4">Register Students</SubmitButton>
            </Form>
        </div>
            
    )
}
