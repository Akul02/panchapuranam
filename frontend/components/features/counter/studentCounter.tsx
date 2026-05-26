"use client"

import React, { useEffect, useState } from 'react'

import { PiStudentBold } from "react-icons/pi";
import { CertificateCountDto } from "../../../types/certificateCountDto";
import { certificatesCount } from "../../../api/certificate";


export default function StudentCounter() {

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        certificatesCount()
            .then((res) => {
                setCounter(+res.count);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);

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
