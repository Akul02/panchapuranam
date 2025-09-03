import React from "react";

type FunctionProps = {
    type: string;
    input: string;
    value: string;
    onChange: (value : string) => void;
    isError: boolean;
}

export default function SimpleTextField ({ type, input, value, onChange, isError }: FunctionProps) {
    return (
        <div className="form_input">
            <label htmlFor={`${input}_input`}/>
            <input className={`${isError ? "error" : ""}`} id={`${input}_input`} type={`${type}`} placeholder={`enter ${input}`} value={value ?? ""} required onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}