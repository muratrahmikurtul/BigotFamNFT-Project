import React from 'react';
import videoBg from './assets/background.mp4';

const BackgroundVideo = () => {
    return (
        <div>
            <video loop autoPlay muted id="bg-video">
                <source src={videoBg} type="video/mp4"/>
            </video>
        </div>
    )
}

export default BackgroundVideo;
