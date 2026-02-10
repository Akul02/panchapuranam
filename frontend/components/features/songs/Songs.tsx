"use client"

import React, { useEffect, useRef, useState } from 'react';
import useLanguage from '../../../hooks/useLanguage';
import { Song } from '../../../types/song';
import Audio from './Audio';

export default function Songs() {

    const [songs, setSongs] = useState<Song[]>([]);
    const [language] = useLanguage();

    const currentAudioRef = useRef(null);

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
                <div className="w-11/12 xl:w-2/3 2xl:w-1/2 rounded-xl p-4 text-primary shadow-[0_4px_8px_0_rgba(0,0,0,0.2),_0_6px_20px_0_rgba(0,0,0,0.19)]" key={song.songId}>
                    <p className='text-2xl lg:text-3xl font-bold'>{song.title} </p>
                    {song.verse.map((line, index) => (
                        <div key={index}>
                            <p className="text-base lg:text-lg font-semibold">{line}</p>
                        </div>
                    ))}
                    <Audio sourceString={`${apiUrl}/audios?audioId=${song.audios[0].audioId}`} currentAudio={currentAudioRef}/>
                </div>
            ))}
        </div>
    )
}