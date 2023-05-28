import './forum.css'
import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import Loading from '../components/loading'
import Video from '../components/video';
import Overlay from '../components/overlay';
import Navbar from '../components/navbar';
import Searching from '../components/searching'
import { BrowserView, MobileView } from 'react-device-detect';
import ImgBg from '../components/imgbg';

const Forum = (props) => {
    const [posts, setPosts] = useState([]);
    const [komDodanyFalse, setKomDodanyFalse] = useState(false);
    const [refresh, setRefresh] = useState(false);


    if (props.store.ForumFlag) {

        fetch("http://localhost:5500/posts", {
            method: "GET"
        })
            .then((res) => {
                return (res.json());
            })
            .then((res) => {
                console.log("HERE");
                let nr = -1;
                let changeRes = res.map((ele) => {
                    nr++;
                    return (
                        {
                            ...ele,
                            nr: nr,
                            comments: []
                        }

                    )
                })
                return (changeRes)
            })
            .then((res) => {
                console.log(res);
                setPosts(res);
            })

        props.loadingTrue();
        props.ForumFlagFalse();
    }


    useEffect(() => {

        if (props.store.loading) {
            setTimeout(() => {
                const loadingFalse = props.loadingFalse;
                loadingFalse();
            }, 1200)
        }
    })



    const handleSendComment = (ele, tresc) => {
        setKomDodanyFalse(false);

        console.log(ele);
        console.log(tresc);
        if (tresc.length > 0) {
            fetch("http://localhost:5500/addcomment",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({ id: ele.id, tresc: tresc, }),
                    credentials: 'include',
                })
                .then((res) => {
                    return (res.json());

                })
                .then((res) => {
                    console.log(res)
                    if (res.komdodany) {
                        props.ForumFlagTrue();
                        setRefresh(false);
                        setTimeout(() => {
                            try {
                                const where = document.getElementsByClassName("forumContainerPost")[ele.nr]
                                where.scrollIntoView({ behavior: "smooth" });
                            }
                            catch (error) {
                                console.log(error)
                            }

                        }, 1500)





                    }
                    else {
                        setKomDodanyFalse(true);

                    }

                })
        }

    }
    return (
        <>
            <BrowserView className="app">
                {props.store.loading ? <Loading>
                </Loading> : <section className="forumContainer">
                    <Video />
                    <Overlay />
                    <Navbar />
                    <Searching posts={posts} setPosts={setPosts} />
                    {komDodanyFalse ? <div className="komDodanyFalse">Muisz być zalogowany aby dodac komentarz</div> : null}

                    {props.store.navbarmobile ? null :
                        posts.map((ele) => {
                            return (

                                <div className="forumContainerPost">



                                    <div className="ask">
                                        <div className="forumautor">Author: {ele.autor}</div>
                                        <div className="topicandcontent">
                                            <div className="forumtemat">Topic: {ele.temat}</div>
                                            <div className="forumtresc">Content: {ele.tresc}</div>
                                        </div>

                                    </div>

                                    <form className="addcomment" onSubmit={handleSendComment}>
                                        <textarea placeholder="Write comment here"></textarea>
                                        <div onClick={() => {
                                            const form = document.getElementsByClassName("addcomment")[ele.nr];
                                            // console.log(form);
                                            const textAreaValue = form.querySelector("textarea").value;
                                            // console.log(textAreaValue);
                                            handleSendComment(ele, textAreaValue)
                                        }} className="sendcomment">Add comment</div>
                                    </form>

                                    <div className="comments">

                                        <div onClick={() => {

                                            if (document.getElementsByClassName("showcomments")[ele.nr].innerHTML === "Show comments") {
                                                console.log("pobieram komentarze");

                                                document.getElementsByClassName("showcomments")[ele.nr].innerHTML = "Hide comments"

                                                console.log("click")
                                                console.log(ele);
                                                fetch("http://localhost:5500/posts", {
                                                    method: "GET",
                                                })
                                                    .then((res) => {
                                                        return (
                                                            res.json()
                                                        )
                                                    })
                                                    .then((res) => {
                                                        console.log(ele.comments);
                                                        console.log(res[ele.id - 1].comments);
                                                        const comments = ele.comments = res[ele.id - 1].comments;
                                                        console.log(comments);
                                                        setRefresh(true);
                                                    })
                                            }
                                            else {
                                                document.getElementsByClassName("showcomments")[ele.nr].innerHTML = "Show comments"
                                                console.log("click else")
                                                ele.comments = [];
                                                console.log(refresh);
                                                setRefresh(false);
                                            }





                                        }} className="showcomments">Show comments</div>
                                        {ele.comments.map((ele) => {
                                            return (
                                                <div className="comment">
                                                    <div className="commentautor">author: {ele.autor}</div>
                                                    <div className="commentodp">answer: {ele.odp}</div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                            )
                        })}



                </section >}
            </BrowserView>
            <MobileView className="app">
                <section className="forumContainer">
                    <Navbar />
                    {/* <Overlay /> */}
                    <ImgBg />


                    {komDodanyFalse ? <div className="komDodanyFalse">Muisz być zalogowany aby dodac komentarz</div> : null}
                    {props.store.navbarmobile ? null :
                        posts.map((ele) => {
                            return (

                                <div className="forumContainerPost">



                                    <div className="ask">
                                        <div className="forumautor">Author: {ele.autor}</div>
                                        <div className="topicandcontent">
                                            <div className="forumtemat">Topic: {ele.temat}</div>
                                            <div className="forumtresc">Content: {ele.tresc}</div>
                                        </div>

                                    </div>

                                    <form className="addcomment" onSubmit={handleSendComment}>
                                        <textarea placeholder="Write comment here"></textarea>
                                        <div onClick={() => {
                                            const form = document.getElementsByClassName("addcomment")[ele.nr];
                                            // console.log(form);
                                            const textAreaValue = form.querySelector("textarea").value;
                                            // console.log(textAreaValue);
                                            handleSendComment(ele, textAreaValue)
                                        }} className="sendcomment">Add comment</div>
                                    </form>

                                    <div className="comments">

                                        <div onClick={() => {

                                            if (document.getElementsByClassName("showcomments")[ele.nr].innerHTML === "Show comments") {
                                                console.log("pobieram komentarze");

                                                document.getElementsByClassName("showcomments")[ele.nr].innerHTML = "Hide comments"

                                                console.log("click")
                                                console.log(ele);
                                                fetch("http://localhost:5500/posts", {
                                                    method: "GET",
                                                })
                                                    .then((res) => {
                                                        return (
                                                            res.json()
                                                        )
                                                    })
                                                    .then((res) => {
                                                        console.log(ele.comments);
                                                        console.log(res[ele.id - 1].comments);
                                                        const comments = ele.comments = res[ele.id - 1].comments;
                                                        console.log(comments);
                                                        setRefresh(true);
                                                    })
                                            }
                                            else {
                                                document.getElementsByClassName("showcomments")[ele.nr].innerHTML = "Show comments"
                                                console.log("click else")
                                                ele.comments = [];
                                                console.log(refresh);
                                                setRefresh(false);
                                            }





                                        }} className="showcomments">Show comments</div>
                                        {ele.comments.map((ele) => {
                                            return (
                                                <div className="comment">
                                                    <div className="commentautor">author: {ele.autor}</div>
                                                    <div className="commentodp">answer: {ele.odp}</div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                            )
                        })}



                </section >

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

export default connect(store, changeStore)(Forum);

