"use client"

import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import useUser from '../hooks/useUser';

const Login = () => {
    const [emailString, setEmailString] = useState("");
    const [passwordString, setPasswordString] = useState("");

    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [userRole, setUserRole] = useUser();

    const handleSubmit = (e: FormEvent) => {

        e.preventDefault();

        const request_body = {emailString, passwordString};

        fetch(`${apiUrl}/login`, {
            method: 'POST',
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
            const headers = await res.headers.has("Set-Cookie");
            const msg = await res.text();
            console.log(headers);
            console.log(msg);
            router.push("/")
            //  do something here related to user role??
            // call backend to get user that just logged in role
            // setUserRole(what backend returned)

        })
        . catch(err => {
            setIsError(true);
            setErrorString(err.message);
            console.log(err.message);
        })
    }

    return (
        <form className='login_form' onSubmit={handleSubmit}>
            <h1 className='login_heading'>Teacher Login</h1>
            <div className={`login_error ${isError ? "" : "hide"}`}>
                <p>{errorString}</p>
            </div>
            <div className='email_input'>
                <label htmlFor='email'></label>
                <input className={`${isError ? "error" : ""}`} id='email' type='email' placeholder='enter email' required onChange={(e) => setEmailString(e.target.value)}></input>
            </div>
            <div className='password_input'>
                <label htmlFor='password'></label>
                <input className={`${isError ? "error" : ""}`} id='password' type='password' placeholder='enter password' required onChange={(e) => setPasswordString(e.target.value)}></input>
            </div>
            <div>
                <button className='login_btn' type='submit'>Log In</button>
            </div>
        </form>
    )
}

export default Login