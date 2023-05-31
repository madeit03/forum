import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import './searching.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Searching = (props) => {
    const [searchingField, setSearchingField] = useState(false);
    const [searchingFieldClasses, setSearchingFieldClasses] = useState("");
    // const [searchingFieldValue, setSearchingFieldValue] = useState("");
    // const [newPosts, setNewPosts] = useState([]);

    const handleClickSearch = () => {

        switch (searchingFieldClasses) {
            case "": {
                setSearchingFieldClasses("searchingfieldstart");
                setSearchingField(true)
            }
                break;
            case "searchingfieldend": {
                setSearchingFieldClasses("searchingfieldstart")
                setSearchingField(true)
            }
                break;
            case "searchingfieldstart": {
                setSearchingFieldClasses("searchingfieldend")
                props.setPosts(props.originalRes)
                setTimeout(() => {
                    setSearchingField(false);
                }, 500)
                setTimeout(() => {
                    let xd = document.getElementsByClassName("showcomments");
                    console.log("haha", xd.length)
                    for (let i = 0; i < xd.length; i++) {
                        xd.item(i).innerHTML = "Show comments"
                    }
                }, 300)
            }
                break;
        }


    }
    const handleChangeInput = (e) => {
        console.log(e.target.value);
        let input = e.target.value;
        let newPosts = [];
        let nr = -1;
        if (input.length > 0) {
            props.originalRes.map((post) => {
                console.log(post.temat);
                let flag = true;
                for (let i = 0; i < input.length; i++) {
                    if (input[i].toLowerCase() == post.temat[i].toLowerCase()) {

                    }
                    else {

                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    nr++;
                    newPosts.push({
                        ...post,
                        nr: nr,
                        comments: [],
                    })
                }



            })
            console.log("newPosts:", newPosts);
            props.setPosts(newPosts);
        }
        else {
            console.log("ustawiamy all")
            console.log(props.originalRes)
            props.setPosts(

                props.originalRes,
            )
            setTimeout(() => {
                let xd = document.getElementsByClassName("showcomments");
                console.log("haha", xd.length)
                for (let i = 0; i < xd.length; i++) {
                    xd.item(i).innerHTML = "Show comments"
                }
            }, 300)


        }


    }

    return (
        <>
            <div className="searching">
                <FontAwesomeIcon className="searchicon " onClick={handleClickSearch} icon={faSearch} />
                {searchingField ? <input type="search" placeholder="topic" onChange={handleChangeInput} className={searchingFieldClasses} /> : null}

            </div>

        </>
    )
}
export default Searching;