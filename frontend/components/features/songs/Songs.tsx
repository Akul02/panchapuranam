"use client"

import { useRef } from 'react';
import { Song } from '../../../types/song';
import Audio from './Audio';

export default function Songs({songs} : {songs: Song[]}) {

    const currentAudioRef = useRef(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (songs.length == 0) {

        return (
            <div className="text-xl text-primary m-16 font-heading">No songs found for selected language</div>
        )
    }

    return (
        <div className="flex flex-col items-center gap-y-8 mt-8 mb-20 w-full">
            {songs.map((song) => (
                <div className="w-11/12 lg:w-4/5 xl:w-2/3 2xl:w-1/2 rounded-xl p-4 text-primary shadow-[0_4px_8px_0_rgba(0,0,0,0.2),_0_6px_20px_0_rgba(0,0,0,0.19)]" key={song.songId}>
                    <p className='text-2xl lg:text-3xl font-tamil font-bold'>{song.title} </p>
                    {song.verse.map((line, index) => (
                        <div key={index}>
                            <p className="text-primary lg:text-lg font-tamil font-extrabold">{line}</p>
                        </div>
                    ))}
                    {/* route uses query param not a url param as songs will eventually have multiple audios that need to be selected from */}
                    <Audio sourceString={`${apiUrl}/audio?audioId=${song.audios[0].audioId}`} currentAudio={currentAudioRef}/>
                </div>
            ))}
        </div>
    )
}