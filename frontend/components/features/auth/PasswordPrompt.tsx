import { FormEvent, useState } from "react";
import SimpleTextField from "../../ui/SimpleTextField";
import { useRouter } from "next/navigation";
import Form from "../../ui/Form";
import SubmitButton from "../../ui/FormSubmitButton";
import { changePassword } from "../../../api/auth";

export default function PasswordPrompt () {

    const [password1String, setPassword1String] = useState("");
    const [password2String, setPassword2String] = useState("");

    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const handleSubmit = async (e :FormEvent) => {
        
        e.preventDefault();

        // validate password
        if (password1String != password2String) {
            setIsError(true);
            setErrorString("Passwords do not match");
            return;
        }

        try {
            await changePassword(password1String);
            router.push("/");
        } catch (err) {
            setIsError(true);
            setErrorString(err instanceof Error ? err.message : "Something went wrong");
        }
    }

    return (
        <Form handleSubmit={handleSubmit} formHeading="First Time Login, Please Set Password" isError={isError} errorString={errorString}>
            {/* hardcoded id also present in login */}
            <SimpleTextField type="password" input="password" value={password1String} id={"2"} isError={isError} onChange={setPassword1String}/>
            <SimpleTextField type="password" input="password" value={password2String} id={"3"} isError={isError} onChange={setPassword2String}/>
            <SubmitButton>Submit</SubmitButton>
        </Form>
    )
}   