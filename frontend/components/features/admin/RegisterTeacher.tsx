"use client"

import { FormEvent, useState } from "react";
import SimpleTextField from "../../ui/simpleTextField";

export default function RegisterTeacher () {

    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : ""
    });

    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // generic handler for changing state
    // field is the exact state being changed
    // val is what the child component unwraps from the event and sends back
    const handleChange = (field: string, value: string) => {
        // uses prev, to persist other values
        setFormData((prev) => ({
            ...prev,
            [field]:value
        }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        fetch(`${apiUrl}/teacher/register`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                "firstName" : formData.firstName,
                "lastName" : formData.lastName,
                "email" : formData.email,
                "password" : formData.password
            }),
            credentials: "include"
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
            setIsError(true);
            setErrorString(err.message);
            console.log(err.message);
        })

    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <h1 className="form_heading">Teacher Enrolment</h1>
            <div className={`login_error ${isError ? "" : "hide"}`}>
                <p>{errorString}</p>
            </div>
            <SimpleTextField type="text" input="first name" value={formData.firstName} isError={false} onChange={(val : string) => handleChange("firstName", val)}/>
            <SimpleTextField type="text" input="last name" value={formData.lastName} isError={false} onChange={(val : string) => handleChange("lastName", val)}/>
            <SimpleTextField type="email" input="email" value={formData.email} isError={isError} onChange={(val : string) => handleChange("email", val)}/>
            <SimpleTextField type="password" input="password" value={formData.password} isError={false} onChange={(val : string) => handleChange("password", val)}/>
            <button className="form_submit_btn" type="submit">Register Teacher</button>
        </form>
    )
}