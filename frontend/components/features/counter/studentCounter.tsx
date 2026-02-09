"use client"

import React, { useEffect, useState } from 'react'

import { PiStudentBold } from "react-icons/pi";


export default function StudentCounter() {

    const [counter, setCounter] = useState(0);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}/certificates/count`, {method: "GET"})
        .then(async (res) => {
            if (!res.ok) {
                const errMsg = await res.text();
                throw new Error(errMsg);
            }

            const count = await res.text();
            setCounter(+count);

        })
        .catch(err => {
            console.log(err.message);
        })
    }, []);

    return (
        <div className={`absolute right-24 ${counter == 0 ? "hidden" : ""}`}>
            <div className="font-bold text-4xl flex gap-x-5">
                {counter}
                <PiStudentBold color="secondary" size={40}/>
            </div>
            <p className="font-bold">Students Enlightened</p>
        </div>
    )
}
