"use client"
import React, { FormEvent, useState } from 'react'
import SimpleTextField from '../../ui/simpleTextField';

export default function Download() {

    const [urls, setUrls] = useState<string[]>([])
    const [showUrls, setShowUrls] = useState(false);

    const [emailString, setEmailString] = useState("");
    
    const [isError, setIsError] = useState(false);
    const [errorString, setErrorString] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [successString, setSuccessString] = useState("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
        <form className="form" onSubmit={handleSubmit}>
            <div className={showUrls ? "hide" : ""}>
                <h1 className="form_heading">Certificate Download</h1>
                <div className={`form_error ${isError ? "" : "hide"}`}>
                    <p>{errorString}</p>
                </div>
                <p className="form_msg">Enter your email to retrieve your certificates</p>
                <SimpleTextField type="text" input="email" value={emailString} id={undefined} isError={isError} onChange={setEmailString}/>
                <button className="form_submit_btn" type='submit'>Submit</button>
            </div>
            <div className={`certificates ${showUrls ? "" : "hide"}`}>
                <p className="form_heading">{successString}</p>
                <div className='scroll_box'>
                    {urls.map((url, index) => (
                    <div key={url} className="cert_url">
                        <a className="cert_url"href={url} target="_blank">Open Certificate {index + 1}</a>
                    </div>
                    ))}
                </div>
            </div>
        </form>
    )
}
