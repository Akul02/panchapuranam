"use client"

import React, { FormEvent, useState } from 'react'
import SimpleTextField from '../../ui/simpleTextField'

export default function RegisterStudent() {

    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        email : ""
    })

    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]:value
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

            const resText = await res.text();
            console.log(resText);
            setFormData({"firstName" : "", "lastName" : "", "email" : ""});
            setIsSuccess(true);
        })
        .catch(err => {
            setIsError(true);
            setErrorString(err.message);
            console.log(err.message);
        })
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <h1 className='form_heading'>Student Enrolment</h1>

            <div className={`form_error ${isError ? "" : "hide"}`}>
                <p>{errorString}</p>
            </div>

            <div className={`form_msg ${isSuccess ? "" : "hide"}`}>
                <p>Successfully enrolled Student</p>
            </div>

            <SimpleTextField type="text" input="first name" value={formData.firstName} id={undefined} isError={false} onChange={(val : string) => handleChange("firstName", val)} />
            <SimpleTextField type="text" input="last name" value={formData.lastName} id={undefined} isError={false} onChange={(val : string) => handleChange("lastName", val)} />
            <SimpleTextField type="text" input="email" value={formData.email} id={undefined} isError={isError} onChange={(val : string) => handleChange("email", val)} />
            <button className="form_submit_btn" type="submit">Register Student</button>
        </form>
    )
}
