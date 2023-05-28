import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loading from '../components/loading'
import Video from '../components/video';
import Overlay from '../components/overlay';
import Navbar from '../components/navbar';
import Main from '../components/main';
import Slajder from '../components/slajder';
import './mainwebsite.css';
import { BrowserView, MobileView } from 'react-device-detect'
import ImgBg from '../components/imgbg';

const MainWebsite = (props) => {

    useEffect(() => {
        if (props.store.MainWebsiteFlag) {
            props.MainWebsiteFlagFalse();
            props.loadingTrue();

        }

        if (props.store.loading) {
            setTimeout(() => {
                const loadingFalse = props.loadingFalse;
                loadingFalse();

            }, 1200)
        }
    })

    return (
        <>
            <BrowserView className="app">
                {props.store.loading ? <Loading>
                </Loading> :
                    <section className="mainwebsiteconainter">
                        <Video />
                        <Overlay />
                        <Navbar />
                        <Main />
                        <Slajder />
                    </section>}
            </BrowserView>
            <MobileView className="app">
                <section className="mainwebsiteconainter">
                    <Navbar />
                    <ImgBg />
                    <Slajder />
                    <Main />

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
        MainWebsiteFlagFalse: () => {
            dispatch({
                type: 'MainWebsiteFlagFalse'
            })
        }

    })
}

export default connect(store, changeStore)(MainWebsite);

