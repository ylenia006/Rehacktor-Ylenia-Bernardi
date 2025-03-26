import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "../home.module.css";
export default function SearchGame(){
    const navigate = useNavigate();
    const [ search, setSearch ] = useState("");
    const [ ariaInvalid, setAriaInvalid ] = useState(null);

    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof search === 'string' && search.trim().length !== 0){
            navigate(`/search?query=${search}`)
        }else{
            setAriaInvalid(true)
        }
    };
    return(
        <form onSubmit={handleSearch} onKeyDown={(event) => event.key === "Enter" && handleSearch(event)}>
            <fieldset role="group" > 
                <input 
                className={styles.searchInput}
                type="text"
                name="search"
                placeholder={"Search a game"}
                onChange={(event) => setSearch(event.target.value)}
                value={search}
                aria-invalid={ariaInvalid}/>
                <input  className={styles.submitButton} type="submit" value="Go"/>
            </fieldset>
        </form>
    );
}