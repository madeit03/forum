import './slajder.css';
import imgFirst from '../img/img1.jpg';
import imgSecond from '../img/img2.jpg';
import imgThird from '../img/img3.jpg';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

const Slajder = (props) => {
    let interval;
    const [flag, setFlag] = useState(true)
    const imgHandle = useRef();
    useEffect(() => {
        let intervalSlajder;

        if (flag) {

            setFlag(false)
            let randomImgNumber = Math.floor(Math.random() * 3) + 1;
            switch (randomImgNumber) {
                case 1: {
                    imgHandle.current.src = imgFirst;
                }
                    break;
                case 2: {
                    imgHandle.current.src = imgSecond;
                }
                    break;
                case 3: {
                    imgHandle.current.src = imgThird;
                }
                    break;
            }
            intervalSlajder = setInterval(() => {

                if (randomImgNumber == 3) {
                    randomImgNumber = 0;
                }
                randomImgNumber++;
                switch (randomImgNumber) {
                    case 1: {
                        try {
                            imgHandle.current.src = imgFirst;
                        }
                        catch (e) {
                            console.log("e")
                            clearInterval(intervalSlajder);
                        }

                    }
                        break;
                    case 2: {
                        try {
                            imgHandle.current.src = imgSecond;
                        }
                        catch (e) {
                            console.log("e")
                            clearInterval(intervalSlajder);
                        }
                    }
                        break;
                    case 3: {
                        try {
                            imgHandle.current.src = imgThird;
                        }
                        catch (e) {
                            console.log("e")
                            clearInterval(intervalSlajder);
                        }
                    }
                        break;
                }

            }, 5000)
        }

    })
    return (
        <div className="slajder">
            <div className="running" >
                <img ref={imgHandle} alt="" />
                <div className="runningOverlay"></div>

            </div>




        </div>
    )
}
const store = (store) => {
    return ({
        store: store,
    })
}
const changeStore = (dispatch) => {
    return ({
        loadingTrue: () => {
            dispatch({ type: 'loadingTrue' })
        },
        loadingFalse: () => {
            dispatch({
                type: 'loadingFalse'
            })
        },
        intervalid: () => {
            dispatch({
                type: 'intervalid'
            })
        }
    })
}
export default connect(store, changeStore)(Slajder);