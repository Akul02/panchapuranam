import { FormEvent, useState } from "react";
import SimpleTextField from "../../ui/simpleTextField";
import { useRouter } from "next/navigation";

export default function PasswordPrompt () {

    const [password1String, setPassword1String] = useState("");
    const [password2String, setPassword2String] = useState("");

    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const handleSubmit = (e :FormEvent) => {
        
        e.preventDefault();

        // validate password
        if (password1String != password2String) {
            setIsError(true);
            setErrorString("Passwords do not match");
            return;
        }

        fetch(`${apiUrl}/password`, {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
                "password" : password1String
            }),
            credentials: "include"
        })
        .then(async (res) => {
            if (!res.ok) {
                const errMsg = await res.text();
                throw new Error(errMsg);
            }

            // successfully changed password
            const msg = await res.text();
            console.log(msg);
            router.push("/");
            
        })
        .catch(err => {
            setIsError(true);
            setErrorString(err.message);
            console.log(err.message);
        })
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h1 className='form_heading'>Please Set Password</h1>
            <div className={`form_error ${isError ? "" : "hide"}`}>
                <p>{errorString}</p>
            </div>
            <SimpleTextField type="password" input="password" value={password1String} isError={isError} onChange={setPassword1String}/>
            <SimpleTextField type="password" input="password" value={password2String} isError={isError} onChange={setPassword2String}/>
            <button className="form_submit_btn" type='submit'>Submit</button>
        </form>
    )
}   