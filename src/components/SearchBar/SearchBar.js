import React, { useState } from 'react';
import styles from "./SearchBar.module.css";



const SearchBar = () => {

    const [term, setTerm] = useState();

    const handleTermChange = (event) => {
        setTerm(event.target.value);
    }

    const searchMusic = (musicList, name, artist) => {
        const filteredList = musicList.filter((e) => {
            return e.name === name || e.artist === artist
        });
        return filteredList;
    }

    const handleSearch = (event) => {
        event.preventDefault();
        const result = searchMusic(term);
        console.log(result);
      };

    return (
        <div className={styles.searchHeader} style={{ backgroundImage: "linear-gradient(rgba(80, 79, 87, 0.6),rgba(50, 38, 126, 0.2)), url(/images/bandbgp.jpg)" }}>
            <div className={styles.searchbar} >
                <form className={styles.searchform}>
                    <input placeholder="Search" onChange={handleTermChange}></input>
                    <button type="submit">Let's Go</button>
                </form>
            </div>
        </div>
    )

}

export default SearchBar;