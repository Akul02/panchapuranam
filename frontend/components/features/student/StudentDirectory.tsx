"use client"

import Link from "next/link";
import React, { useEffect, useState } from 'react'

import { FaSearch } from "react-icons/fa";


export default function StudentDirectory() {

    interface studentSearchResult {
        id: string,
        name: string
    }

    const [searchBarValue, setSearchBarValue] = useState("");
    const [searchResults, setSearchResults] = useState<studentSearchResult[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchBarValue(e.target.value.toLowerCase());
    }

    // Make an api call with the searchbarvalue
    // display the api response
    // dont wanna make an api call every input change, so have a timeout

    useEffect(() => {
        if (searchBarValue.trim().length <= 2) {
            setSearchResults([]);
            return;
        }

        const timer = setTimeout(() => {
            fetch(`${apiUrl}/student/search?searchString=${searchBarValue}`, {method: "GET", credentials: "include"})
            .then(async (res) => {
                if (!res.ok) {
                    const errMsg = await res.text();
                    throw new Error(errMsg);
                }

                const results = await res.json();
                setSearchResults(results);
                console.log(results);
            })
            .catch(err => {
                console.log(err.message);
            })
        }, 300)

        return () => clearTimeout(timer);
    }, [searchBarValue]);

    return (
        <div className="flex flex-col flex-grow">
            <div className="font-bold text-2xl text-primary text-center mt-4 mb-6">Student Directory</div>
            <div className="border-2 border-primary rounded-md mx-4 p-2 flex items-center">
                <FaSearch color="#6E3326" className="shrink-0"/>
                <input className="text-primary bg-[#F4F4E8] ml-2 px-1 flex-1 min-w-0" placeholder="enter student's name" value={searchBarValue} onChange={handleChange}/>
            </div>
            <div className="border-2 border-primary rounded-md flex-1 m-4">
                {searchResults.map((student) => (
                    <div key={student.id} className="flex">
                        {student.name}
                        <Link href={`/student/${student.id}`}>View Profile</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
