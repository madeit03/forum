import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import './searching.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Searching = (props) => {
    const [searchingField, setSearchingField] = useState(false);
    const [searchingFieldClasses, setSearchingFieldClasses] = useState("");
    const [searchingFieldValue, setSearchingFieldValue] = useState("");
    const [newPosts, setNewPosts] = useState([]);

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
                setTimeout(() => {
                    setSearchingField(false);
                }, 500)
            }
                break;
        }


    }
    const handleChangeInput = (e) => {
        setSearchingFieldValue(e.target.value);
        props.setPosts([])
        console.log("handleChange:", props.posts);



    }

    return (
        <>
            <div className="searching">
                <FontAwesomeIcon className="searchicon " onClick={handleClickSearch} icon={faSearch} />
                {searchingField ? <input placeholder="topic" onChange={handleChangeInput} value={searchingFieldValue} className={searchingFieldClasses} /> : null}

            </div>

        </>
    )
}
export default Searching;