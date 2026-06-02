"use client"

import { FormEvent, useState } from 'react'
import SimpleTextField from '../../ui/form/SimpleTextField';
import { useRouter } from 'next/navigation';
import Form from '../../ui/form/Form';
import { CertificateDto } from "../../../types/certficateDto";
import { downloadCertificates } from "../../../api/client/certificate";
import SubmitButton from "../../ui/buttons/SubmitButton";
import { CloseIcon } from "../../ui/Icons";

export default function Download() {

    const [certificates, setCertificates] = useState<CertificateDto[]>([])
    const [showUrls, setShowUrls] = useState(false);

    const [emailString, setEmailString] = useState("");
    
    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [successString, setSuccessString] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsError(false);
        setErrorString("");
        setIsSuccess(false);
        setSuccessString("")
        
        try {
            const data = await downloadCertificates(emailString);

            setCertificates(data);
            if (data.length == 0) {
                setSuccessString("You have no certificates")
            } else{
                setSuccessString("Here are your certificates:")
            }
            setShowUrls(true);

        } catch (err) {
            setIsError(true);
            setErrorString(err instanceof Error ? err.message : "Something went wrong");
        }
    }

    return (
        <div className="h-full">
            <div className={`h-full flex justify-center items-center ${showUrls ? "hidden" : ""}`}>
                <Form handleSubmit={handleSubmit} formHeading="Certificate Download" isError={isError} errorString={errorString}>
                    <p className="text-primary">Enter your email to retrieve your certificates</p>
                    <SimpleTextField type="email" input="email" value={emailString} id={undefined} isError={isError} onChange={setEmailString}/>
                    <SubmitButton className="w-3/4 mt-4">Submit</SubmitButton>
                </Form>
            </div>

            <div className={`${showUrls ? "" : "hidden"} flex flex-col items-center w-[350px] min-h-[400px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-primary color-accent shadow-[0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)]`}>
                
                <div className="absolute right-2 top-2 cursor-pointer" onClick={() => router.back()}>
                    <CloseIcon className="text-accent" size={28} />
                </div>

                <p className="font-bold text-2xl text-accent mt-10 mb-8 text-center">{successString}</p>

                <div className="max-h-60 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {certificates ? certificates.map((certificate) => (
                    <div key={certificate.certUrl} className="mb-5 text-accent px-4 py-1 border-2 rounded-md border-accent hover:underline">
                        <a className="" href={certificate.certUrl} target="_blank">{certificate.programName}.pdf</a>
                    </div>
                    )) : null}
                </div>

            </div>
        </div>
    )
}
