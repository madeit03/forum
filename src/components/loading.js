import './loading.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import video from '../videos/loadingvideo.mp4';

const Loading = () => {
    return (

        <div className="loading">
            <div className="overlayLoading"></div>
            <video className="videoLoading" src={video} autoPlay muted loop ></video>
        </div>
    )
}
export default Loading;