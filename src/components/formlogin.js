import './formlogin.css';
import { useState } from 'react';
import { connect } from 'react-redux';

const FormLogin = (props) => {
    const [loginValue, setLoginValue] = useState("");
    const [passValue, setPassValue] = useState("")
    const [zalogowany, setZalogowany] = useState(false);
    const [niezalogwany, setNieZalogowany] = useState(false);
    const [loggedOn, setLoggedOn] = useState("");
    const [error, setError] = useState(false);
    const [errorInfo, setErrorInfo] = useState(false);
    const handleChange = (e) => {

        if (e.target.placeholder === "login") {
            setLoginValue(e.target.value)
        }
        if (e.target.placeholder === "password") {
            setPassValue(e.target.value)
        }
        else {
            return;
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoggedOn("");
        setZalogowany(false);
        setNieZalogowany(false);
        console.log("login:", loginValue);
        console.log("haslo:", passValue);
        setErrorInfo(false);
        if (error == false) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000)
            fetch("http://localhost:5500/login",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: "POST",
                    body: JSON.stringify({ login: loginValue, pass: passValue }),
                    credentials: "include",
                })
                .then((res) => {
                    setLoginValue("");
                    setPassValue("");
                    setLoggedOn(loginValue);
                    console.log("odp:", res);
                    return (res.json())
                })
                .then((res) => {
                    console.log("res")
                    if (res.zalogowany) {
                        console.log("Udalo sie zalogwac na konto: " + loginValue);
                        setZalogowany(true);
                        setTimeout(() => {
                            setZalogowany(false);
                            props.SignInFlagTrue();
                        }, 500)


                    }
                    else {
                        console.log("Nie ma takiego konta: " + loginValue);
                        setNieZalogowany(true);
                        setTimeout(() => {
                            setNieZalogowany(false);
                        }, 3000)

                    }
                })
        }
        else {
            setErrorInfo(true);
        }
    }

    return (


        <form className="formlogin" onSubmit={handleSubmit} action="SignIn">

            {errorInfo ? <div className="notlogged">too many requests</div> : null}

            {zalogowany ? <div className="logged">
                Logged successfully {loggedOn}
            </div> : null}

            {niezalogwany ? <div className="notlogged">
                Could not login to account {loggedOn}
            </div> : null}

            <div>Log in</div>
            <input onChange={handleChange} placeholder="login" type="text" value={loginValue} />
            <input onChange={handleChange} placeholder="password" type="password" value={passValue} />
            <input className="inputzaloguj" type="submit" value="Submit" />


        </form>
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
        },
        SignInFlagTrue: () => {
            dispatch({ type: 'SignInFlagTrue' })
        }

    })
}

export default connect(store, changeStore)(FormLogin);
