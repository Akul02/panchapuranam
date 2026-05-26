"use client"

import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

import useUser from '../../../hooks/useUser';
import { UserRole } from '../../../constants/global';
import SimpleTextField from '../../ui/SimpleTextField';
import { session } from '../../../types/session';
import PasswordPrompt from './PasswordPrompt';
import Form from '../../ui/Form';
import SubmitButton from '../../ui/FormSubmitButton';
import { login } from "../../../api/auth";



export default function Login () {
    const [emailString, setEmailString] = useState("");
    const [passwordString, setPasswordString] = useState("");

    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");

    const [isFirstLogin, setIsFirstLogin] = useState(false);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [userRole, setUserRole] = useUser();

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();

        try {

            await login(emailString, passwordString);

            // useRoleSetter();
            fetch(`${apiUrl}/session`,{credentials: "include"})
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error("failed to fetch user role")
                }
        
                const sessionInfo: session = await res.json();

                switch (sessionInfo.role) {
                    case UserRole.ADMIN:
                        setUserRole(UserRole.ADMIN);
                        break;
        
                    case UserRole.TEACHER:
                        setUserRole(UserRole.TEACHER);
                        break;
        
                    case UserRole.NO_USER:
                        setUserRole(UserRole.NO_USER);
                        break;

                    default:
                        throw new Error("unknown role value");
                }

                // if first login, display password prompt
                if (sessionInfo.firstLogin) {
                    setIsFirstLogin(true);
                } else {
                    router.push("/")
                }
            })
            . catch(err => {
                setIsError(true);
                setErrorString(err.message);
                console.log(err.message);
            })
        } catch (err) {
            setIsError(true);
            setErrorString(err instanceof Error ? err.message : "Something went wrong");
        }
    }

    return (
        <div>
            <Form handleSubmit={handleSubmit} formHeading="Teacher Login" isError={isError} errorString={errorString}>
                <SimpleTextField type="email" input="email" value={emailString} isError={isError} onChange={setEmailString}/>
                {/* hardcoded id also present in passwordprompt file */}
                <SimpleTextField type="password" input="password" value={passwordString} id={"1"} isError={isError} onChange={setPasswordString}/>
                <SubmitButton>Log In</SubmitButton>
            </Form>
            {/* might need to comeback to the bg inherit  */}
            <div className={`fixed h-full w-full bg-inherit ${isFirstLogin ? "" : "hidden"}`}>
                <PasswordPrompt/>
            </div>
        </div>
    )
}
