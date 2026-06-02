
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
        <div className="flex flex-col w-full">
            <label htmlFor={`${input}_input`} className="block text-xs font-bold uppercase tracking-widest text-maroon/60 mb-1">{input}</label>
            <input className={`bg-white text-primary border-primary border rounded-md pl-2 ${isError ? "border border-solid border-red-600" : ""}`} 
                id={`${input}_input${id}`} 
                type={`${type}`} 
                value={value ?? ""} 
                required onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}