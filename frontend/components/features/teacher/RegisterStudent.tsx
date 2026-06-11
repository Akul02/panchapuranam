"use client";

import { FormEvent, useState } from "react";
import { MultiValue } from "react-select";
import SimpleTextField from "../../ui/form/SimpleTextField";
import Form from "../../ui/form/Form";
import { registerStudent } from "../../../api/client/student";
import SubmitButton from "../../ui/buttons/SubmitButton";
import StyledSelect from "../../ui/form/StyledSelect";
import { handleAppErrors } from "../../../lib/api/handlerAppErrors";

export default function RegisterStudent( {availablePrograms} : {availablePrograms: string[]}) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        programNames: [] as string[],
    });

    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [successString, setSuccessString] = useState("");

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSelectChange = (
        selected: MultiValue<{ value: string; label: string }>,
    ) => {
        const programs = selected.map((item) => item.value);
        setFormData((prev) => ({
            ...prev,
            programNames: programs,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSuccess(false);
        setIsError(false);

        // try {
        //     const resSuccess = await registerStudent(formData);
        //     setFormData({
        //         firstName: "",
        //         lastName: "",
        //         email: "",
        //         programNames: [],
        //     });
        //     setIsSuccess(true);
        //     setSuccessString(resSuccess.message);
        // } catch (err) {
        //     setIsError(true);
        //     setErrorString(
        //         err instanceof Error ? err.message : "Something went wrong",
        //     );
        // }

        const apiResult = await handleAppErrors(registerStudent(formData));

        if (apiResult.success == false) {
            setIsError(true);
            setErrorString(apiResult.data.message);
        } else {
            setFormData({firstName: "", lastName: "", email: "", programNames: []});
            setIsSuccess(true);
            setSuccessString(apiResult.data.message);
        }
    };

    return (
        <div className="h-full flex justify-center items-center">
            <Form
                handleSubmit={handleSubmit}
                formHeading="Student Enrolment"
                isError={isError}
                errorString={errorString}
                isSuccess={isSuccess}
                successString={successString}
            >
                <SimpleTextField
                    type="text"
                    input="first name"
                    value={formData.firstName}
                    isError={false}
                    onChange={(val: string) => handleChange("firstName", val)}
                />
                <SimpleTextField
                    type="text"
                    input="last name"
                    value={formData.lastName}
                    isError={false}
                    onChange={(val: string) => handleChange("lastName", val)}
                />
                <SimpleTextField
                    type="text"
                    input="email"
                    value={formData.email}
                    isError={isError}
                    onChange={(val: string) => handleChange("email", val)}
                />
                <StyledSelect
                    options={availablePrograms.map((p) => ({ value: p, label: p }))}
                    handleSelectInput={handleSelectChange}
                    instanceId="programs-select"
                    label="Select Programs"
                />
                <SubmitButton className="w-3/4">
                    Register Student
                </SubmitButton>
            </Form>
        </div>
    );
}
