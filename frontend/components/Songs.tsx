"use client"

import React, { useEffect, useState } from 'react';
import useLanguage from '../hooks/useLanguage';

type Song = {
    songId: number;
    title: string;
    verse: string[];
};

export default function Songs () {

    const [songs, setSongs] = useState<Song[]>([]);
    const [language] = useLanguage();

    useEffect(() => {
      fetch(`http://localhost:8080/song?languageString=${language}`).then(
        response => response.json()
      ).then((data) => { setSongs(data); console.log(songs)})
      .catch((err) => console.error('Error fetching songs', err));
    }, [language]);

    return (
        <div className="songs song_background">
            {songs.map((song) => (
                <div className="song_row text_colour" key={song.songId}>
                    <div className='lyrics'>
                        <p className='song_title'>{song.title} </p>
                        {song.verse.map((line, index) => (
                            <div key={index}>
                                <p>{line}</p>
                            </div>    
                        ))}
                        <p>{song.verse[0]}</p>
                        <audio className='test' controls>
                            <source src={`http://localhost:8080/audios/${song.songId}`} type='audio/mpeg'></source>
                            Your browser does not support the audio element
                        </audio>
                    </div>
                    {/* <Audio songId={song.songId}></Audio> */}
                    
                </div>
            ))}
        </div>
    )
}