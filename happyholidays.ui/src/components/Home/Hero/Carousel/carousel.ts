export const pauseReset = (ref: React.RefObject<HTMLVideoElement>) => {
    if (ref && ref.current) {
        ref.current.pause();
        setTimeout(() => {
            if (ref && ref.current) 
            ref.current.currentTime = 0;
        }, 1000);
    }
}

export const playrefVideo = (ref: React.RefObject<HTMLVideoElement>) => {
    if (ref && ref.current) {
        ref.current.play();
    }
}