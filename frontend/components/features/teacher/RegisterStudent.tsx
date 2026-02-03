"use client"

import React, { FormEvent, useState } from 'react'
import SimpleTextField from '../../ui/simpleTextField'
import { useRouter } from 'next/navigation';
import { IoCloseCircleOutline } from 'react-icons/io5';

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
    const router = useRouter();
    

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]:value
        }))
    }

    const handleOnClick = () => {
        router.push("/");
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

            <div className="absolute right-2 top-2 cursor-pointer" onClick={handleOnClick}>
                <IoCloseCircleOutline color="#CC9966"size={28}/>
            </div>

            <h1 className='form_heading'>Student Enrolment</h1>

            <div className={`form_error ${isError ? "" : "hidden"}`}>
                <p>{errorString}</p>
            </div>

            <div className={`form_msg ${isSuccess ? "" : "hidden"}`}>
                <p>Successfully enrolled Student</p>
            </div>

            <SimpleTextField type="text" input="first name" value={formData.firstName} id={undefined} isError={false} onChange={(val : string) => handleChange("firstName", val)} />
            <SimpleTextField type="text" input="last name" value={formData.lastName} id={undefined} isError={false} onChange={(val : string) => handleChange("lastName", val)} />
            <SimpleTextField type="text" input="email" value={formData.email} id={undefined} isError={isError} onChange={(val : string) => handleChange("email", val)} />
            <button className="font-semibold form_submit_btn" type="submit">Register Student</button>
        </form>
    )
}
