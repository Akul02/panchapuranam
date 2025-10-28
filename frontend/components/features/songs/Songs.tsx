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
        <div className="songs">
            {songs.map((song) => (
                <div className="song_row song_background" key={song.songId}>
                    <p className='song_title'>{song.title} </p>
                    {song.verse.map((line, index) => (
                        <div key={index}>
                            <p>{line}</p>
                        </div>
                    ))}
                    <p>{song.verse[0]}</p>
                    <audio className='audio_controls' controls>
                        <source src={`${apiUrl}/audios?audioId=${song.audios[0].audioId}`} type='audio/mpeg'></source>
                        Your browser does not support the audio element
                    </audio>
                    {/* <Audio songId={song.songId}></Audio> */}

                </div>
            ))}
        </div>
    )
}