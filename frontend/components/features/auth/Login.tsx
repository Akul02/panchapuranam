"use client"

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import useUser from '../../../hooks/useUser';
import { UserRole } from '../../../constants/global';
import SimpleTextField from '../../ui/form/SimpleTextField';
import PasswordPrompt from './PasswordPrompt';
import Form from '../../ui/form/Form';
import { getUserSession, login } from "../../../api/client/auth";
import SubmitButton from "../../ui/buttons/SubmitButton";
import { getApiData } from "../../../lib/api/apiData";
import { handleAppErrors } from "../../../lib/api/handlerAppErrors";



export default function Login () {
    const [emailString, setEmailString] = useState("");
    const [passwordString, setPasswordString] = useState("");

    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");

    const [isFirstLogin, setIsFirstLogin] = useState(false);

    const router = useRouter();
    const [userRole, setUserRole] = useUser();

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();

        try {

            await login(emailString, passwordString);

            try {
                const sessionInfo = await getApiData(handleAppErrors(getUserSession()));
                
                switch (sessionInfo.role) {
                    case UserRole.ADMIN:
                        setUserRole(UserRole.ADMIN);
                        break;
        
                    case UserRole.TEACHER:
                        setUserRole(UserRole.TEACHER);
                        break;
        
                    case UserRole.NO_USER:
                        setUserRole(UserRole.NO_USER);
                        break;

                    default:
                        throw new Error("unknown role value");
                }

                // if first login, display password prompt
                if (sessionInfo.firstLogin) {
                    setIsFirstLogin(true);
                } else {
                    if (sessionInfo.role == UserRole.TEACHER) {
                        router.push("/dashboard");
                    } else {
                        router.push("/")    
                    }   
                }

            } catch (err) {
                setIsError(true);
                setErrorString(err instanceof Error ? err.message : "Something went wrong");
            }

        } catch (err) {
            setIsError(true);
            setErrorString(err instanceof Error ? err.message : "Something went wrong");
        }
    }

    return (
        <div className="h-full flex justify-center items-center">
            <Form handleSubmit={handleSubmit} formHeading="Teacher Login" isError={isError} errorString={errorString}>
                <SimpleTextField type="email" input="email" value={emailString} isError={isError} onChange={setEmailString}/>
                {/* hardcoded id also present in passwordprompt file */}
                <SimpleTextField type="password" input="password" value={passwordString} id={"1"} isError={isError} onChange={setPasswordString}/>
                <SubmitButton className="w-3/4">Log In</SubmitButton>
            </Form>
            {/* might need to comeback to the bg inherit  */}
            <div className={`fixed h-full w-full bg-inherit ${isFirstLogin ? "" : "hidden"}`}>
                <PasswordPrompt/>
            </div>
        </div>
    )
}
