"use client"

import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import useUser from '../../../hooks/useUser';
import { UserRole } from '../../../constants/global';
import SimpleTextField from '../../ui/simpleTextField';
import { session } from '../../../types/session';
import PasswordPrompt from './PasswordPrompt';

export default function Login () {
    const [emailString, setEmailString] = useState("");
    const [passwordString, setPasswordString] = useState("");

    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");

    const [isFirstLogin, setIsFirstLogin] = useState(false);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [userRole, setUserRole] = useUser();

    const handleSubmit = (e: FormEvent) => {

        e.preventDefault();

        fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "email" : emailString,
                "password" : passwordString
            }),
            credentials: "include"
        })
        .then(async (res) => {
            if (!res.ok) {
                const errMsg = await res.text();
                throw new Error(errMsg);
            }
                        
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
                        // HANDLE THIS ERROR
                        // INCORRECT LOGIN
                        break;
                    default:
                        // HANDLE THIS ERRO
                        // INCORRECT ROLE VALUE
                        break;
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
        })
        . catch(err => {
            setIsError(true);
            setErrorString(err.message);
            console.log(err.message);
        })
    }

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='form_heading'>Teacher Login</h1>
                <div className={`form_error ${isError ? "" : "hide"}`}>
                    <p>{errorString}</p>
                </div>
                <SimpleTextField type="email" input="email" value={emailString} id={undefined} isError={isError} onChange={setEmailString}/>
                <SimpleTextField type="password" input="password" value={passwordString} id={"1"} isError={isError} onChange={setPasswordString}/>
                <button className="form_submit_btn" type='submit'>Log In</button>
                
            </form>
            <div className={`overlay ${isFirstLogin ? "" : "hide"}`}>
                <PasswordPrompt/>
            </div>
        </div>
    )
}
