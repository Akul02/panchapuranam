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

    ${counter == 0 ? "hidden" : ""}

    return (
        <div className={`bg-primary sm:relative sm:left-2 md:left-14 lg:left-28 xl:left-auto xl:top-6 xl:absolute xl:right-24 ${counter == 0 ? "hidden" : ""}`}>
            <div className="font-bold text-2xl flex gap-x-5 lg:text-4xl">
                {counter}
                <PiStudentBold color="secondary" size={38}/>
            </div>
            <p className="font-bold text-sm lg:text-base">Students Enlightened</p>
        </div>
    )
}
