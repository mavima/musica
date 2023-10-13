import React, { useState } from 'react';
import styles from "./SearchBar.module.css";



const SearchBar = (props) => {

    const handleTermChange = (event) => {
        props.setTerm(event.target.value);
    }

    const searchMusic = (term) => {
        console.log(props.musicList);
        const filteredList = props.musicList.filter((song) => song.name.toLowerCase().includes(term.toLowerCase()) || song.artist.toLowerCase().includes(term.toLowerCase()));
        return filteredList;
    }

    const handleSearch = (event) => {
        event.preventDefault();
        const songs = searchMusic(props.term);
        props.setResults(songs);
      };

    return (
        <div className={styles.searchHeader} style={{ backgroundImage: "linear-gradient(rgba(80, 79, 87, 0.6),rgba(50, 38, 126, 0.2)), url(/images/bandbgp.jpg)" }}>
            <div className={styles.searchbar} >
                <form className={styles.searchform} onSubmit={handleSearch}>
                    <input placeholder="Search" onChange={handleTermChange}></input>
                    <button type="submit">Let's Go</button>
                </form>
            </div>
        </div>
    )

}

export default SearchBar;