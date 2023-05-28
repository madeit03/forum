import './overlay.css';
import { connect } from 'react-redux';

const Overlay = (props) => {
    let classes = ""
    const classListOverlay = ["overlay"]

    if (props.store.navbarOptionHover) {
        classListOverlay.push("overlayStrong")

    }

    for (let i = 0; i < classListOverlay.length; i++) {
        classes += ' ' + classListOverlay[i];
    }

    return (

        <div className={classes}> </div >
    )
}



const store = (store) => {
    return ({
        store: store,
    })
}
export default connect(store, {})(Overlay);