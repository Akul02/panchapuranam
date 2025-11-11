"use client"

import React, { useEffect, useState } from 'react'

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
        <div className="student_counter">Student with Certificates {counter}</div>
    )
}
