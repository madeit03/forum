import './video.css'
import video from '../videos/bgcvideo.mp4'
const Video = () => {
    return (
        <video className="video" src={video} autoPlay muted loop></video>

    )
}
export default Video;