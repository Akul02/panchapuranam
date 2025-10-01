import React from "react";

type FunctionProps = {
    type: string;
    input: string;
    value: string;
    onChange: (value : string) => void;
    isError: boolean;
    id: string | undefined; // required for passwordprompt component, contains 2 password text fields needng unique ids
}

export default function SimpleTextField ({ type, input, value, onChange, isError, id = ""}: FunctionProps) {
    return (
        <div className="form_input">
            <label htmlFor={`${input}_input`}/>
            <input className={`${isError ? "error" : ""}`} id={`${input}_input${id}`} type={`${type}`} placeholder={`enter ${input}`} value={value ?? ""} required onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}