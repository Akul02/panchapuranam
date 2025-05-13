"use client"

import React, { useEffect, useState } from 'react';
import internal from 'stream';

type Song = {
    songId: number;
    title: string;
    verse: string[];
};

export default function Songs () {

    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
      fetch("http://localhost:8080/song").then(
        response => response.json()
      ).then((data) => { setSongs(data);})
      .catch((err) => console.error('Error fetching songs', err));
    }, []);

    return (
        <div className="songs">
            {songs.map((song) => (
                <div className="verse" key={song.songId}>
                    <p>{song.title} </p>
                    {song.verse.map((line, index) => (
                        <div key={index}>
                            <p>{line}</p>
                        </div>    
                    ))}
                    <p>{song.verse[0]}</p>
                </div>
            ))}
        </div>
    )
}