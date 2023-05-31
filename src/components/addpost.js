import './addpost.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
const AddPost = (props) => {
    const [page, setPage] = useState({
        page1: true,
        page2: false,
        page3: false,
    });
    const [page1Classes, setPage1Classes] = useState("page1")
    const [page2Classes, setPage2Classes] = useState("page2")
    const [page3Classes, setPage3Classes] = useState("page3");
    const [topic, setTopic] = useState("")
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);
    const [errorInfo, setErrorInfo] = useState("")
    const [errorSend, setErrorSend] = useState(false);

    const handleClickDownArrow = (e) => {
        return new Promise((resolve, reject) => {
            let flag = true;
            if (flag) {
                switch (page.page1) {
                    case true: {
                        if (topic.length > 5 && topic.length < 20) {
                            setError(false);
                            setErrorInfo("");
                            console.log("zmieniam na 2")
                            setPage2Classes("page2")
                            setPage1Classes(page1Classes + " page1Up")

                            setTimeout(() => {
                                setPage({
                                    page1: false,
                                    page2: true,
                                    page3: false,

                                })
                            }, 150)
                            resolve(flag = false)
                        }


                    }
                        break;

                    default: {
                        resolve(flag = true)
                    }
                }
            }
        })
            .then((flag) => {
                switch (page.page2) {
                    case true: {
                        console.log("zmieniam na 3")
                        setPage2Classes(page2Classes + " page2up")
                        setPage3Classes("page3")
                        setTimeout(() => {
                            setPage({
                                page1: false,
                                page2: false,
                                page3: true,
                            })
                        }, 150)
                        return (flag = false);
                    }
                        break;
                }
            })


    }
    const handleClickUpArrow = (e) => {
        return new Promise((resolve, reject) => {
            let flag = true;
            switch (page.page2) {
                case true: {
                    setError(false);
                    setErrorInfo("");
                    setPage1Classes("page1")
                    setPage2Classes(page2Classes + " page2down")
                    setTimeout(() => {
                        setPage({
                            page1: true,
                            page2: false,
                            page3: false,
                        })
                    }, 150)

                    resolve(flag = false)
                }
                    break;
                default: {
                    resolve(flag = true);
                }
            }
        })
            .then((flag) => {
                console.log(flag);

                switch (page.page3) {
                    case true: {
                        setPage2Classes("page2 page2downxd");
                        setPage3Classes("page3 page3down");
                        setTimeout(() => {
                            setPage({
                                page1: false,
                                page2: true,
                                page3: false,
                            })
                        }, 150)
                        return (flag = false);
                    }
                        break;
                    default: {
                        return (flag = true);
                    }
                }
            })
    }
    const handleChange = (e) => {
        if (e.target.name == "topic") {
            console.log(e.target.value)
            setTopic(e.target.value);
            if (e.target.value.length > 5 && e.target.value.length < 20) {
                setError(false);
            }
            else {
                if (e.target.value.length > 0) {
                    setErrorInfo("topic must be > 5 and < 20")
                    setError(true);
                }
                else {
                    setError(false)
                }


            }


        }
        else if (e.target.name = "content") {

            setContent(e.target.value);

            if (e.target.value.length > 10 && e.target.value.length < 70) {
                setError(false);
            }
            else {
                if (e.target.value.length > 0) {
                    setErrorInfo("content > 10 and < 70")
                    setError(true);
                }
                else {
                    setError(false);
                }
            }



        }


    }
    const handleSendPost = () => {
        setErrorSend(false);
        console.log(document.cookie)
        if (topic.length > 5 && topic.length < 20 && content.length < 70 && content.length > 10) {
            if (document.cookie != undefined && document.cookie.length > 5) {

                console.log("topic:", topic);
                console.log("content:", content);
                fetch("http://localhost:5500/addpost", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        topic: topic,
                        content: content,
                    }),
                    credentials: 'include'


                })
                    .then((res) => {
                        return (res.json())
                    })
                    .then((res) => {
                        console.log(res)
                        if (res.dodano) {
                            setTopic("");
                            setContent("");

                            props.ForumFlagTrue();

                        }
                        else {
                            setErrorSend(true)
                        }
                    })



            }
            else {
                console.log("musisz byc zalogowany aby wysylac posty")
                setErrorSend(true)
            }
        }


    }
    return (
        <div className="addpost">
            {errorSend ? <div className="errorsend">You have to be logged to send post</div> : null}
            {/* first */}
            {page.page1 ? <div className={page1Classes}>
                <div className="page1info">Make post</div>
                <div className="dots">
                    <FontAwesomeIcon className="page1dot1" icon={faCircle} />
                    <FontAwesomeIcon className="page1dot2" icon={faCircle} />
                    <FontAwesomeIcon className="page1dot3" icon={faCircle} />
                </div>
                <input name="topic" className="page1input" type="text" placeholder="topic" value={topic} onChange={handleChange} />
                {topic.length > 5 && topic.length < 20 ? <FontAwesomeIcon onClick={handleClickDownArrow} className="page1arrow" icon={faArrowDown} /> : null}
                {error ? <div className="error">{errorInfo}</div> : null}
            </div> : null}
            {/* second */}

            {page.page2 ? <div className={page2Classes}>
                <FontAwesomeIcon onClick={handleClickUpArrow} className="page2arrowfirst" icon={faArrowUp} />
                <textarea name="content" onChange={handleChange} value={content} className="page2input" id="" cols="30" rows="10" placeholder="content"></textarea>
                <div className="dots">
                    <FontAwesomeIcon className="page2dot1" icon={faCircle} />
                    <FontAwesomeIcon className="page2dot2" icon={faCircle} />
                    <FontAwesomeIcon className="page2dot3" icon={faCircle} />
                </div>
                {content.length > 10 && content.length < 70 ? <FontAwesomeIcon onClick={handleClickDownArrow} className="page2arrowsecond" icon={faArrowDown} /> : null}
                {error ? <div className="error">{errorInfo}</div> : null}


            </div> : null
            }

            {/* third */}

            {
                page.page3 ? <div className={page3Classes}>
                    <FontAwesomeIcon onClick={handleClickUpArrow} className="page3arrow" icon={faArrowUp} />
                    <div className="dots">
                        <FontAwesomeIcon className="page3dot1" icon={faCircle} />
                        <FontAwesomeIcon className="page3dot2" icon={faCircle} />
                        <FontAwesomeIcon className="page3dot3" icon={faCircle} />

                    </div>
                    <div onClick={handleSendPost} className="page3submit">Send</div>

                </div> : null
            }
        </div >
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
        ForumFlagFalse: () => {
            dispatch({
                type: 'ForumFlagFalse'
            })
        },
        ForumFlagTrue: () => {
            dispatch({
                type: "ForumFlagTrue"
            })
        }
    })
}

export default connect(store, changeStore)(AddPost);

