"use client"

import { FormEvent, useState } from "react";
import SimpleTextField from "../../ui/form/SimpleTextField";
import Form from "../../ui/form/Form";
import { registerTeacher } from "../../../api/client/teacher";
import SubmitButton from "../../ui/buttons/SubmitButton";

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
        <div className="h-full flex justify-center items-center">
            <Form handleSubmit={handleSubmit} formHeading="Teacher Enrolment" isError={isError} errorString={errorString} isSuccess={isSuccess} successString={successString}>
                <SimpleTextField type="text" input="first name" value={formData.firstName} isError={false} onChange={(val : string) => handleChange("firstName", val)}/>
                <SimpleTextField type="text" input="last name" value={formData.lastName} isError={false} onChange={(val : string) => handleChange("lastName", val)}/>
                <SimpleTextField type="email" input="email" value={formData.email} isError={isError} onChange={(val : string) => handleChange("email", val)}/>
                <SimpleTextField type="password" input="password" value={formData.password} isError={false} onChange={(val : string) => handleChange("password", val)}/>
                <SubmitButton className="w-3/4">Enrol Teacher</SubmitButton>
            </Form>
        </div>
        
    )
}