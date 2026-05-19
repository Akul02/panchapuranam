"use client"
import React, { FormEvent, useState } from 'react'
import SimpleTextField from '../../ui/SimpleTextField';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import SubmitButton from '../../ui/FormSubmitButton';
import Form from '../../ui/Form';
import { CertificateDto } from "../../../types/certficateDto";

export default function Download() {

    const [certificates, setCertificates] = useState<CertificateDto[]>([])
    const [showUrls, setShowUrls] = useState(false);

    const [emailString, setEmailString] = useState("");
    
    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [successString, setSuccessString] = useState("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsError(false);
        setErrorString("");
        setIsSuccess(false);
        setSuccessString("")

        fetch(`${apiUrl}/certificate?email=${emailString}`, {
            method: "GET"
        })
        .then(async (res) => {
            
            if (!res.ok) {
                const errMsg = await res.text();
                console.log(errMsg)
                throw new Error(errMsg);
            }

            const data: CertificateDto[] = await res.json();

            setCertificates(data);

            if (data.length == 0) {
                setSuccessString("You have no certificates")
            } else{
                setSuccessString("Here are your certificates:")
            }
            setShowUrls(true);
            

        })
        .catch(err => {
            setIsError(true);
            setErrorString(err.message)
        })
    }

    return (
        <div>
            <div className={showUrls ? "hidden" : ""}>
                <Form handleSubmit={handleSubmit} formHeading="Certificate Download" isError={isError} errorString={errorString}>
                    <p className="mb-5 text-secondary">Enter your email to retrieve your certificates</p>
                    <SimpleTextField type="email" input="email" value={emailString} id={undefined} isError={isError} onChange={setEmailString}/>
                    <SubmitButton>Submit</SubmitButton>
                </Form>
            </div>

            <div className={`${showUrls ? "" : "hidden"} flex flex-col items-center w-[350px] min-h-[400px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-primary color-secondary shadow-[0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)]`}>
                
                <div className="absolute right-2 top-2 cursor-pointer" onClick={() => router.back()}>
                    <IoCloseCircleOutline color="#CC9966" size={28} />
                </div>

                <p className="font-bold text-2xl text-secondary mt-10 mb-8 text-center">{successString}</p>

                <div className="max-h-60 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {certificates ? certificates.map((certificate) => (
                    <div key={certificate.certUrl} className="mb-5 text-secondary px-4 py-1 border-2 rounded-md border-secondary hover:underline">
                        <a className="" href={certificate.certUrl} target="_blank">{certificate.programName}.pdf</a>
                    </div>
                    )) : null}
                </div>

            </div>
        </div>
    )
}
