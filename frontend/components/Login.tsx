"use client"

import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

const Login = () => {
    const [emailString, setEmailString] = useState("");
    const [passwordString, setPasswordString] = useState("");

    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const request_body = {emailString, passwordString};
        console.log(request_body);
        fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "email" : emailString,
                "password" : passwordString
            })
        })
        .then(async (res) => {
            if (!res.ok) {
                const errMsg = await res.text();
                throw new Error(errMsg);
            }
            console.log("success");
            router.push("/")
            //  do something here related to user role??    
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