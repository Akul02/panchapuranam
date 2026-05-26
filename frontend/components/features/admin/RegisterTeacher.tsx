"use client"

import { FormEvent, useState } from "react";
import SimpleTextField from "../../ui/SimpleTextField";
import Form from "../../ui/Form";
import SubmitButton from "../../ui/FormSubmitButton";
import { registerTeacher } from "../../../api/teacher";
import { SuccessResponse } from "../../../types/apiResponse";

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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSuccess(false);
        setIsError(false);

        try {
            const resSuccess = await registerTeacher(formData);
            setFormData({"firstName": "", "lastName" : "", "email" : "", "password" : ""});
            setIsSuccess(true);
            setSuccessString(resSuccess.message);
        } catch (err) {
            setIsError(true);
            setErrorString(err instanceof Error ? err.message : "Something went wrong");
        }
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