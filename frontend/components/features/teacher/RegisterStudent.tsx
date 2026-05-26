"use client"

import React, { FormEvent, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import SimpleTextField from '../../ui/SimpleTextField'
import Form from '../../ui/Form';
import SubmitButton from '../../ui/FormSubmitButton';
import { Programs } from '../../../constants/global';
import { SuccessResponse } from "../../../types/apiResponse";

export default function RegisterStudent() {

    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        programNames : [] as string[],
    })

    const options = Object.values(Programs).map((program) => ({value: program, label : program}));

    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [successString, setSuccessString] = useState("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]:value
        }))
    }

    const handleSelectChange = (selected : MultiValue<{value : string, label : string}>) => {
        const programs = selected.map((item) => item.value);
        setFormData((prev) => ({
            ...prev,
            programNames: programs
        }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSuccess(false);
        setIsError(false);

        fetch(`${apiUrl}/student/register`, {
            method: "post",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(formData),
            credentials: "include"
        })
        .then(async (res) => {
            if (!res.ok) {
                const errMsg = await res.text();
                throw new Error(errMsg);
            }

            const resSuccess: SuccessResponse = await res.json();
            console.log(resSuccess.message);
            setFormData({"firstName" : "", "lastName" : "", "email" : "", programNames:[]});
            setIsSuccess(true);
            setSuccessString("Successfully enrolled Student");
        })
        .catch(err => {
            setIsError(true);
            setErrorString(err.message);
            console.log(err.message);
        })

    }

    return (
        <Form handleSubmit={handleSubmit} formHeading="Student Enrolment" isError={isError} errorString={errorString} isSuccess={isSuccess} successString={successString}>
            <SimpleTextField type="text" input="first name" value={formData.firstName} isError={false} onChange={(val : string) => handleChange("firstName", val)} />
            <SimpleTextField type="text" input="last name" value={formData.lastName} isError={false} onChange={(val : string) => handleChange("lastName", val)} />
            <SimpleTextField type="text" input="email" value={formData.email} isError={isError} onChange={(val : string) => handleChange("email", val)} />
            <Select options={options} isMulti className="mb-8 w-3/5" onChange={handleSelectChange} instanceId="programs-select"
                styles={{
                    control: (base) => ({
                        ...base,
                        backgroundColor: "#CC9966",
                        color: "#6E3326",
                        fontWeight: "500",
                        borderRadius: "0.375rem",
                        border: "none",
                        boxShadow: "none",
                        paddingLeft: "0.5rem",
                        cursor: "pointer",
                        maxHeight: "80px",
                        overflow: "auto"
                    }),
                    menu: (base) => ({
                        ...base,
                        backgroundColor: "#CC9966",
                        borderRadius: "0.375rem",
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#6E3326" : "#CC9966",
                        color: state.isFocused ? "#CC9966" : "#6E3326",
                        fontWeight: "500",
                        cursor: "pointer",
                    }),
                    multiValue: (base) => ({
                        ...base,
                        backgroundColor: "#6E3326",
                    }),
                    multiValueLabel: (base) => ({
                        ...base,
                        color: "#CC9966",
                        fontWeight: "500",
                    }),
                    multiValueRemove: (base) => ({
                        ...base,
                        color: "#CC9966",
                        ":hover": {
                            backgroundColor: "#6E3326",
                            opacity: 0.8,
                        },
                    }),
                    placeholder: (base) => ({
                        ...base,
                        color: "#6E3326",
                        opacity: 0.6,
                    }),
                    input: (base) => ({
                        ...base,
                        color: "#6E3326",
                    }),
                }}
            />
            <SubmitButton>Register Student</SubmitButton> 
        </Form>
    )
}
