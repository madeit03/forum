import './formregister.css';
import { useState, useRef, useEffect } from 'react';
const FormRegister = () => {
    const [loginValue, setLoginValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passValue, setPassValue] = useState("");
    const [repeatPassValue, setRepeatPassValue] = useState("");
    const [registered, setRegistered] = useState(false);
    const [notregistered, setNotRegistered] = useState(false);
    const [info, setInfo] = useState("");
    const notregisteredref = useRef();
    const [send, setSend] = useState(false);



    const handleChange = (e) => {
        switch (e.target.placeholder) {
            case 'login': {
                setLoginValue(e.target.value);
            }
                break;
            case 'email': {
                setEmailValue(e.target.value);

            }
                break;
            case 'haslo': {
                setPassValue(e.target.value);
            }
                break;
            case 'powtorz haslo': {
                setRepeatPassValue(e.target.value);
            }
                break;
        }
    }
    const handleSubmit = (e) => {
        console.log("submit")
        e.preventDefault();
        if (notregistered) {
            notregisteredref.current.className = "notregistered";
        }

        if (send == false) {
            setSend(true);

            setTimeout(() => {
                setSend(false);
            }, 5000)

            setRegistered(false);

            setInfo("");
            console.log("login:", loginValue);
            console.log("email;", emailValue);
            console.log("haslo:", passValue)
            console.log("powtorzone haslo:", repeatPassValue);

            fetch("http://localhost:5500/register", {

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({ login: loginValue, email: emailValue, pass: passValue, repeatPass: repeatPassValue })

            })
                .then((res) => {
                    return (
                        res.json()
                    )
                })
                .then((res) => {
                    console.log(res);
                    setInfo(res.info);
                    if (res.zarejestrowano) {
                        setRegistered(true);
                        setNotRegistered(false);
                        setLoginValue("");
                        setEmailValue("");
                        setPassValue("");
                        setRepeatPassValue("")
                    }
                    else {
                        setRegistered(false);
                        setNotRegistered(true);

                    }

                })


        }
        else {
            setNotRegistered(true);
            setInfo("hej zwolnij troche")
        }
    }



    return (
        <form className="formregister" action="SignUp" onSubmit={handleSubmit}>
            {registered ? <div className="registered">{info}</div> : null}
            {notregistered ? <div ref={notregisteredref} className="notregistered">
                <div className="infonotregistered">{info}</div>
                <div onClick={() => {
                    console.log("HERE", notregisteredref.current.className += " notregisteredup")
                    console.log(notregisteredref.current.className);
                }} className="infonotregisteredhide">Hide</div>
            </div> : null}
            <div>Register</div>
            <input placeholder="login" type="text" value={loginValue} onChange={handleChange} />
            <input placeholder="email" type="text" value={emailValue} onChange={handleChange} />
            <input placeholder="haslo" type="password" value={passValue} onChange={handleChange} />
            <input placeholder="powtorz haslo" type="password" value={repeatPassValue} onChange={handleChange} />
            <input className="inputzarejestruj" type="submit" value="Submit" />

        </form>
    )
}
export default FormRegister;