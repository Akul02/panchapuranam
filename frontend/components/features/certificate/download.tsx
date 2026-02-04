"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import SimpleTextField from '../../ui/SimpleTextField';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import SubmitButton from '../../ui/SubmitButton';
import Form from '../../ui/Form';

export default function Download() {

    const [urls, setUrls] = useState<string[]>([])
    const [showUrls, setShowUrls] = useState(false);

    const [emailString, setEmailString] = useState("");
    
    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [successString, setSuccessString] = useState("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const handleOnClick = () => {
        router.push("/");
    }

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

            const data: string[] = await res.json();

            setUrls(data);

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
        // <form onSubmit={handleSubmit} className="w-[350px] min-h-[400px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#6E3326] color-[#CC9966] shadow-[0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)]">
        //     <div className="absolute right-2 top-2 cursor-pointer" onClick={handleOnClick}>
        //         <IoCloseCircleOutline color="#CC9966" size={28} />
        //     </div>
            
        //     <div className={`flex flex-col items-center${showUrls ? "hidden" : ""}`}>
        //         <h1 className="font-bold text-2xl text-[#CC9966] mt-10 mb-8 text-center">Certificate Download</h1>
        //         <div className={`text-red-600 mb-5 ${isError ? "": "hidden"}`}>
        //             <p>{errorString}</p>
        //         </div>
        //         <p className="mb-5 text-[#CC9966]">Enter your email to retrieve your certificates</p>
        //         <SimpleTextField type="email" input="email" value={emailString} id={undefined} isError={isError} onChange={setEmailString}/>
        //         <SubmitButton>Submit</SubmitButton>
        //     </div>
        //     <div className={`certificates ${showUrls ? "" : "hidden"}`}>
        //         <p className="form_heading">{successString}</p>
        //         <div className='scroll_box'>
        //             {urls.map((url, index) => (
        //             <div key={url} className="cert_url">
        //                 <a className="cert_url"href={url} target="_blank">Open Certificate {index + 1}</a>
        //             </div>
        //             ))}
        //         </div>
        //     </div>
        // </form>
        <div>
            <div className={showUrls ? "hidden" : ""}>
                <Form handleSubmit={handleSubmit} formHeading="Certificate Download" isError={isError} errorString={errorString}>
                    <p className="mb-5 text-[#CC9966]">Enter your email to retrieve your certificates</p>
                    <SimpleTextField type="email" input="email" value={emailString} id={undefined} isError={isError} onChange={setEmailString}/>
                    <SubmitButton>Submit</SubmitButton>
                </Form>
            </div>

            <div className={`${showUrls ? "" : "hidden"} flex flex-col items-center w-[350px] min-h-[400px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#6E3326] color-[#CC9966] shadow-[0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)]`}>
                
                <div className="absolute right-2 top-2 cursor-pointer" onClick={handleOnClick}>
                    <IoCloseCircleOutline color="#CC9966" size={28} />
                </div>

                <p className="font-bold text-2xl text-[#CC9966] mt-10 mb-8 text-center">{successString}</p>

                <div className="max-h-60 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {urls.map((url, index) => (
                    <div key={url} className="mb-5 text-[#CC9966] px-4 py-1 border-2 rounded-md border-[#CC9966] hover:underline">
                        <a className=""href={url} target="_blank">Open Certificate {index + 1}</a>
                    </div>
                    ))}
                </div>

            </div>

            
        </div>
    )
}
