"use client"

import React, { useEffect, useState } from 'react';

export default function Songs () {

    const [message, setMessage] = useState("Loading");

    useEffect(() => {
      fetch("http://localhost:8080/hello").then(
        response => response.json()
      ).then((data) => {
            setMessage(data.msg);
        });
    }, []);
    


    return (
        <div className="songs">
            <div className="verse">
                <p>
                    {message}
                </p>
            </div>
            <div className="verse">
                <p>
                    song 2
                </p>
            </div> 
            <div className="verse">
                <p>
                    song 3
                </p>
            </div>
            <div className="verse">
                <p>
                    song 4
                </p>
            </div>
            <div className="verse">
                <p>
                    song 5
                </p>
            </div>
        </div>
    )
}