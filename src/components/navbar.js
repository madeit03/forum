import './navbar.css';
import { connect } from 'react-redux';
import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Outlet, Link } from "react-router-dom";
import Overlay from './overlay'

import imgnavbarmobilestart from '../img/citymobile.jpg'
const Navbar = (props) => {


    useEffect(() => {
        let cookies = document.cookie;
        cookies = cookies.split(";");
        // console.log(cookies)
        // console.log(cookies.length)
        let login = "";
        if (cookies.length > 0) {
            for (let i = 0; i < cookies.length; i++) {
                if (cookies[i].indexOf("login") > -1) {
                    login = cookies[i].split("=")
                    console.log("login:", login)

                }
                else {
                    setWhoLogged("")
                }
            }
        }
        if (login.length > 0) {
            for (let j = 0; j < login.length; j++) {
                if (login[j] != "login") {
                    console.log(login[j])
                    setWhoLogged(login[j])

                }
                else {

                }
            }
        }



    })
    const [whoLogged, setWhoLogged] = useState("");

    const navbarmobileref = useRef();

    const mouseOverHandle = () => {
        props.NavBarOptionHoverTrue()
    }
    const mouseLeaveHandle = () => {
        props.NavBarOptionHoverFalse()

    }
    const classListOverlay = ["navbar"]
    if (props.store.navbarOptionHover) {
        classListOverlay.push("navbarDark")
    }
    let classes = ""
    for (let i = 0; i < classListOverlay.length; i++) {
        classes += ' ' + classListOverlay[i];
    }
    const navbarBarsClickHandle = () => {
        const navbarmobileTrue = props.navbarmobileTrue;
        navbarmobileTrue();
        const navbarXmarkClassStart = props.navbarXmarkClassStart;
        navbarXmarkClassStart();


    }
    const navbarXmarkClickHandle = () => {
        const navbarmobileFalse = props.navbarmobileFalse;
        navbarmobileref.current.className = "navbarmobileFinish";
        const navbarXmarkFinish = props.navbarXmarkClassFinish;
        navbarXmarkFinish();
        setTimeout(() => {
            navbarmobileFalse();
            // navbarmobileref.current.className = "navbarmobilestart";
        }, 400)

    }
    const handleClickLogo = () => {
        props.MainWebsiteFlagTrue();
    }
    const handleClickForum = () => {
        props.ForumFlagTrue();
    }
    const handleClickSignIn = () => {
        props.SignInFlagTrue();

    }
    const handleClickSingnUp = () => {
        props.SignUpFlagTrue();

    }
    const handleClickLogoMobile = () => {
        props.MainWebsiteFlagTrue();
        navbarXmarkClickHandle();
    }
    const handleClickForumMobile = () => {
        props.ForumFlagTrue();
        navbarXmarkClickHandle();
    }
    const handleClickSignInMobile = () => {
        props.SignInFlagTrue();
        navbarXmarkClickHandle();
    }
    const handleClickSignUpMobile = () => {
        props.SignUpFlagTrue();
        navbarXmarkClickHandle();
    }

    return (
        <>
            <div className={classes}>
                <Link onClick={handleClickLogo} className="navbarlogo" to="/" onMouseOver={mouseOverHandle} onMouseLeave={mouseLeaveHandle}>logo</Link>
                {whoLogged.length > 0 ? <div className="whologged">logged:{whoLogged}</div> : null}
                <div className="navbarcontent">
                    <Link onClick={handleClickForum} className="link" to="/forum" onMouseOver={mouseOverHandle} onMouseLeave={mouseLeaveHandle}>forum</Link>
                    <Link onClick={handleClickSignIn} className="link" to="/SignIn" onMouseOver={mouseOverHandle} onMouseLeave={mouseLeaveHandle}>sign in</Link>
                    <Link onClick={handleClickSingnUp} className="link" to="/SignUp" onMouseOver={mouseOverHandle} onMouseLeave={mouseLeaveHandle}>sign up</Link>
                </div>
                {/* 1400px */}
                <div onClick={navbarBarsClickHandle} className="navbarBars">

                    <FontAwesomeIcon icon={faBars} />
                </div>

            </div>
            {props.store.navbarmobile ? <div ref={navbarmobileref} className="navbarmobilestart">
                <img className="imgnavbarmobile" src={imgnavbarmobilestart} />
                <Overlay />

                <FontAwesomeIcon onClick={navbarXmarkClickHandle} className={props.store.navbarXmarkClass} icon={faXmark} />
                <Link to="/" onClick={handleClickLogoMobile} className="navbarmobilestartZero">Logo</Link>
                <Link onClick={handleClickForumMobile} to="/forum" className="navbarmobilestartFirst">Forum</Link>
                <Link onClick={handleClickSignInMobile} to="/SignIn" className="navbarmobilestartSecond">Sign In</Link>
                <Link onClick={handleClickSignUpMobile} to="/SignUp" className="navbarmobilestartThird">Sign Up</Link>
                {whoLogged.length > 0 ? <div className="navbarmobilestartFourth">logged:{whoLogged}</div> : null}

            </div> : null}
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
        NavBarOptionHoverTrue: () => {
            dispatch({ type: 'NavBarOptionHoverTrue' })
        },
        NavBarOptionHoverFalse: () => {
            dispatch({
                type: 'NavBarOptionHoverFalse'
            })
        },
        navbarmobileTrue: () => {
            dispatch({ type: 'navbarmobileTrue' })
        },
        navbarmobileFalse: () => {
            dispatch({
                type: 'navbarmobileFalse'
            })
        },
        navbarXmarkClassFinish: () => {
            dispatch({
                type: 'navbarXmarkClassFinish'
            })
        },
        navbarXmarkClassStart: () => {
            dispatch({
                type: 'navbarXmarkClassStart'
            })
        },
        MainWebsiteFlagTrue: () => {
            dispatch({
                type: 'MainWebsiteFlagTrue',
            })
        },
        SignInFlagTrue: () => {
            dispatch({
                type: 'SignInFlagTrue',
            })
        },
        SignUpFlagTrue: () => {
            dispatch({
                type: 'SignUpFlagTrue'
            })
        },
        ForumFlagTrue: () => {
            dispatch({
                type: 'ForumFlagTrue'
            })
        }
    })

}
export default connect(store, changeStore)(Navbar);