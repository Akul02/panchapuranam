import { hasNonStaticMethods } from 'next/dist/server/route-modules/app-route/module';
import React, { DOMAttributes, SyntheticEvent } from 'react'

export default function Audio({ sourceString, currentAudio }: { sourceString: string, currentAudio: React.RefObject<HTMLAudioElement | null> }) {

    const handlePlay = (e: SyntheticEvent<HTMLAudioElement>) => {
        // if no audio is currently playing, set the audio ref to the new audio ref
        if (currentAudio.current == null) {
            currentAudio.current = e.currentTarget;

        // if the current audio ref is different to the new, pause the current and set audio ref to new
        } else if (currentAudio.current != e.currentTarget) { 
            currentAudio.current.pause();
            currentAudio.current = e.currentTarget;
        }
        // if the current audio ref is the same as the new one, do nothing, browser plays audio as normal
    }

    // reset currentaudio ref when song has ended
    const handleEnded = (e: SyntheticEvent<HTMLAudioElement>) => {
        currentAudio.current = null;
    }


    return (
        <div className="mt-4">
            <audio controls onPlay={handlePlay} onEnded={handleEnded}>
                <source src={sourceString} type="audio/mpeg"></source>
                Your browser does not support the audio element
            </audio>
        </div>
    )
}
