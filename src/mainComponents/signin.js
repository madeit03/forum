import { connect } from 'react-redux';
import { useEffect } from 'react';
import './signin.css';
import Loading from '../components/loading'
import Video from '../components/video';
import Overlay from '../components/overlay';
import Navbar from '../components/navbar';
import FormLogin from '../components/formlogin';
import { BrowserView, MobileView } from 'react-device-detect'
import ImgBg from '../components/imgbg';
const SignIn = (props) => {

    if (props.store.SignInFlag) {
        props.SignInFlagFalse();
        props.loadingTrue()
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
                </Loading> : <section className="signin">
                    <Video />
                    <Overlay />
                    <Navbar />
                    <FormLogin />
                </section>}
            </BrowserView>
            <MobileView className="app">
                <section className="signin">
                    <ImgBg />
                    <Navbar />
                    <FormLogin />
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
        SignInFlagFalse: () => {
            dispatch({
                type: 'SignInFlagFalse'
            })
        }

    })
}

export default connect(store, changeStore)(SignIn);

