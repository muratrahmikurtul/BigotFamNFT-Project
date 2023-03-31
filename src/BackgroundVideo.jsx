import React from 'react';
import videoBg from './assets/background.mp4';
import { useState } from "react";

const BackgroundVideo = () => {
    const [muted, setMuted] = useState(true);
    const handleToggleMute = () => setMuted(current => !current);

    return (
        <div>
            <video loop autoPlay muted id="bg-video">
                <button onClick={handleToggleMute} className="control">Unmute</button>
                <source src="https://www.youtube.com/watch?v=hqDd7lN38hw" type="video/mp4"/>
            </video>
        </div>
    )
}

export default BackgroundVideo;
