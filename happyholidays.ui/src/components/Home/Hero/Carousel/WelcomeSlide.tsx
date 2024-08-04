import { useEffect, useRef } from "react";
import { pauseReset, playrefVideo } from "./carousel";

interface Props {
    active: boolean
}

const WelcomeSlide = ({ active }: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && !active) {
            pauseReset(videoRef);
        } else if (videoRef.current && active) {
            playrefVideo(videoRef);
        }
    }, [active]);

    return (
        <div className="defaule_slider welcome_slide">
            <video ref={videoRef} src="/src/assets/videos/welcome.mp4" autoPlay muted loop style={{ width: "100%", height: "100%", objectFit: "cover" }}></video>
        </div>
    );
}

export default WelcomeSlide;