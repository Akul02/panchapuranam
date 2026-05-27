
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
        <div className="mb-8 w-full flex justify-center">
            <label htmlFor={`${input}_input`}/>
            <input className={`w-3/5 bg-secondary text-primary font-medium rounded-md pl-2 placeholder-primary ${isError ? "border border-solid border-red-600" : ""}`} 
                id={`${input}_input${id}`} 
                type={`${type}`} 
                placeholder={`enter ${input}`} 
                value={value ?? ""} 
                required onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}