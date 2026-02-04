import React from "react";

type FunctionProps = {
    type: string;
    input: string;
    value: string;
    onChange: (value : string) => void;
    isError: boolean;
    id?: string; // required for passwordprompt component, contains 2 password text fields needng unique ids
}

export default function SimpleTextField ({ type, input, value, onChange, isError, id = ""}: FunctionProps) {
    return (
        <div className="mb-8">
            <label htmlFor={`${input}_input`}/>
            <input className={`bg-[#CC9966] text-[#6E3326] font-medium rounded-md pl-2 placeholder-[#6E3326] ${isError ? "border border-solid border-red-600" : ""}`} 
                id={`${input}_input${id}`} 
                type={`${type}`} 
                placeholder={`enter ${input}`} 
                value={value ?? ""} 
                required onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}