import React, { useCallback } from 'react';
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {

    const handleTermChange = (event) => {
        props.setTerm(event.target.value);
    }

    const searchMusic = useCallback(() => {
        props.onSearch(props.term);
    }, [props.onSearch, props.term]);
    

    const handleSearch = async (event, term, accessToken) => {
        event.preventDefault();
        const data = await props.onSearch(props.term, props.accessToken);
        props.setResults(data);
      };
    


    return (
        <div className={styles.searchHeader} style={{ backgroundImage: "linear-gradient(rgba(80, 79, 87, 0.6),rgba(50, 38, 126, 0.2)), url(/images/bandbgp.jpg)" }}>
            <div className={styles.searchbar} >
                
                <form 
                    className={styles.searchform} 
                    >
                    <input placeholder="Search" onChange={handleTermChange}></input>
                    <button onClick={handleSearch}>Let's Go</button>
                </form>
            </div>
        </div>
    )

}

export default SearchBar;
