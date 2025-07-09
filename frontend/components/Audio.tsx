import React, { useRef, useState } from "react";

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

export default function Audio ({songId} : {songId: number}) {

    const audioRef = useRef<HTMLAudioElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);

    function togglePlay() {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) { 
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play();
            setIsPlaying(true);
            
        }
    }
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // THIS COMPONENT NOT IN USE
    return (
        <div className="audio">
            <audio ref={audioRef}>
                <source src={`${apiUrl}/audios?songId=${songId}`} type='audio/mpeg'></source>
                Your browser does not support the audio element
            </audio>

            <button onClick={togglePlay}>{isPlaying ? <FaPause/> : <FaPlay/>}</button>
            <div className="audio_progress">
                <div>0:00</div>
                <input type="range"></input>
                <div>3:26</div>
            </div>
            

        </div>
    );
}