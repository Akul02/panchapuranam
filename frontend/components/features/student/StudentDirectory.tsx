"use client"

import React, { useState } from 'react'

import { FaSearch } from "react-icons/fa";
import SimpleTextField from "../../ui/SimpleTextField";


export default function StudentDirectory() {

    const [searchBarResult, setSearchBarResult] = useState("");

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchBarResult(e.target.value);
        console.log(searchBarResult);
    }

    // 

    return (
        <div className="flex flex-col flex-grow">
            <div className="font-bold text-2xl text-primary text-center mt-4 mb-6">Student Directory</div>
            <div className="border-2 border-primary rounded-md mx-4 p-2 flex items-center">
                <FaSearch color="#6E3326" className="shrink-0"/>
                <input className="text-primary bg-[#F4F4E8] ml-2 px-1 flex-1 min-w-0" placeholder="enter student's email" value={searchBarResult} onChange={handleChange}/>
            </div>
            <div className="border-2 border-primary rounded-md flex-1 m-4">

            </div>
        </div>
    )
}
