import React from 'react';

const BackgroundVideo = () => {
    return (
        <div>
            <video loop autoPlay muted id="bg-video">
                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4"/>
            </video>
        </div>
    )
}

export default BackgroundVideo;
