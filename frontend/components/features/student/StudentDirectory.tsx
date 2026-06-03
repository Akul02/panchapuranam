"use client"

import Link from "next/link";
import { useEffect, useState } from 'react'
import { StudentSearchResult } from "../../../types/student";
import { searchStudentDirectory } from "../../../api/client/student";
import { SearchIcon } from "../../ui/Icons";

export default function StudentDirectory() {

    const [searchBarValue, setSearchBarValue] = useState("");
    const [searchResults, setSearchResults] = useState<StudentSearchResult[]>([]);
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
        const timer = setTimeout( async () => {
            try {
                const results = await searchStudentDirectory(searchBarValue);
                setSearchResults(results);
            } catch (err) {
                console.log(err instanceof Error ? err.message : "Something went wrong");
            }
        }, 300)
        return () => clearTimeout(timer);
    }, [searchBarValue]);

    return (
        <div className=" flex-1 flex flex-col">
            <div className="font-bold font-heading text-2xl text-primary text-center mt-4 mb-6">Student Directory</div>
            <div className="border-2 border-primary rounded-md mx-4 p-2 flex items-center">
                <SearchIcon className="shrink-0 text-primary"/>
                <input className="text-primary bg-surface ml-2 px-1 flex-1 min-w-0" placeholder="enter student's name" value={searchBarValue} onChange={handleChange}/>
            </div>
            <div className="border-2 border-primary rounded-md flex-1 m-4">
                {searchResults.map((student, index) => (
                    <div key={student.id} className={`flex items-center justify-between gap-x-1 px-4 py-2 text-primary hover:bg-primary hover:text-surface transition-colors duration-150 border-b border-primary border-opacity-30`}> 
                        {student.name}
                        <Link href={`/student/${student.id}`}>
                            <div className="whitespace-nowrap border-2 rounded-md px-2 py-1 border-primary bg-surface text-primary font-semibold">
                                View Profile
                            </div>
                        </Link>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}
