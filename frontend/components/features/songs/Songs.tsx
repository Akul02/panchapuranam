"use client"

import React, { useEffect, useState } from 'react';
import useLanguage from '../../../hooks/useLanguage';
import { Song } from '../../../types/song';

export default function Songs() {

    const [songs, setSongs] = useState<Song[]>([]);
    const [language] = useLanguage();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}/song?languageString=${language}`)
            .then(response => response.json())
            .then((data) => { setSongs(data)})
            .catch((err) => console.log(err));
    }, [language]);

    return (
        <div className="flex flex-col items-center gap-y-8 mt-8 mb-20 w-full">
            {songs.map((song) => (
                <div className="w-1/2 rounded-xl p-4 shadow-[0_4px_8px_0_rgba(0,0,0,0.2),_0_6px_20px_0_rgba(0,0,0,0.19)]" key={song.songId}>
                    <p className='text-3xl font-semibold'>{song.title} </p>
                    {song.verse.map((line, index) => (
                        <div key={index}>
                            <p className="text-lg">{line}</p>
                        </div>
                    ))}
                    <audio className='mt-4' controls>
                        <source src={`${apiUrl}/audios?audioId=${song.audios[0].audioId}`} type='audio/mpeg'></source>
                        Your browser does not support the audio element
                    </audio>
                    {/* <Audio songId={song.songId}></Audio> */}

                </div>
            ))}
        </div>
    )
}