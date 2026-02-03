import { hasNonStaticMethods } from 'next/dist/server/route-modules/app-route/module';
import React, { DOMAttributes, SyntheticEvent } from 'react'

export default function Audio({ sourceString, currentAudio }: { sourceString: string, currentAudio: React.RefObject<HTMLAudioElement | null> }) {

    const handlePlay = (e: SyntheticEvent<HTMLAudioElement>) => {
        // if no audio is currently playing, play the selected audio
        if (currentAudio.current == null) {
            e.currentTarget.play();
            currentAudio.current = e.currentTarget;
        } else { // otherwise, pause the current audio playing, play the new audio and modify currentaudio ref
            currentAudio.current.pause();
            e.currentTarget.play();
            currentAudio.current = e.currentTarget;
        }
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
