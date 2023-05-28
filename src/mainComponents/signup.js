import { connect } from 'react-redux';
import { useEffect } from 'react';
import './signup.css'
import Loading from '../components/loading'
import Video from '../components/video';
import Overlay from '../components/overlay';
import Navbar from '../components/navbar';
import FormRegister from '../components/formregister';
import { BrowserView, MobileView } from 'react-device-detect';
import ImgBg from '../components/imgbg';
const SignUp = (props) => {
    if (props.store.SignUpFlag) {
        props.loadingTrue();
        props.SignUpFlagFalse();

    }
    useEffect(() => {
        if (props.store.loading) {
            setTimeout(() => {
                props.loadingFalse();
            }, 1200)
        }
    })
    return (
        <>
            <BrowserView className="app">
                {props.store.loading ? <Loading>
                </Loading> : <section className="signup">
                    <Video />
                    <Overlay />
                    <Navbar />
                    <FormRegister />
                </section>}
            </BrowserView>
            <MobileView className="app">
                <section className="signup">
                    <ImgBg />
                    {/* <Overlay /> */}
                    <Navbar />
                    <FormRegister />
                </section>
            </MobileView>
        </>
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
        SignUpFlagFalse: () => {
            dispatch({
                type: 'SignUpFlagFalse'
            })
        }


    })
}

export default connect(store, changeStore)(SignUp);

