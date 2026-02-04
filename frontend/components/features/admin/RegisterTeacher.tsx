"use client"

import { FormEvent, useState } from "react";
import SimpleTextField from "../../ui/SimpleTextField";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Form from "../../ui/Form";
import SubmitButton from "../../ui/SubmitButton";

export default function RegisterTeacher () {

    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : ""
    });

    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");

    const [isSuccess, setIsSuccess] = useState(false);
    const [successString, setSuccessString] = useState("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    

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

    const handleOnClick = () => {
        router.push("/");
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSuccess(false);
        setIsError(false);

        fetch(`${apiUrl}/teacher/register`, {
            method: "POST",
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
            setFormData({"firstName": "", "lastName" : "", "email" : "", "password" : ""});
            setIsSuccess(true);
            setSuccessString("Successfully added Teacher");

        })
        .catch(err => {
            setIsError(true);
            setErrorString(err.message);
            console.log(err.message);
        })

    }

    return (
        <Form handleSubmit={handleSubmit} formHeading="Teacher Enrolment" isError={isError} errorString={errorString} isSuccess={isSuccess} successString={successString}>
            <SimpleTextField type="text" input="first name" value={formData.firstName} isError={false} onChange={(val : string) => handleChange("firstName", val)}/>
            <SimpleTextField type="text" input="last name" value={formData.lastName} isError={false} onChange={(val : string) => handleChange("lastName", val)}/>
            <SimpleTextField type="email" input="email" value={formData.email} isError={isError} onChange={(val : string) => handleChange("email", val)}/>
            <SimpleTextField type="password" input="password" value={formData.password} isError={false} onChange={(val : string) => handleChange("password", val)}/>
            <SubmitButton>Enrol Teacher</SubmitButton>
        </Form>
    )
}