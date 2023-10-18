import React from 'react';
import styles from "./SearchBar.module.css";



const SearchBar = (props) => {

    const handleTermChange = (event) => {
        props.setTerm(event.target.value);
    }

    const searchMusic = (term, tracks) => {
        console.log("from searchmusic " + tracks);
        // const filteredList = tracks.filter((song) => song.name.toLowerCase().includes(term.toLowerCase()) || song.album.toLowerCase().includes(term.toLowerCase()) || song.artist.toLowerCase().includes(term.toLowerCase()));
        // const filteredList = props.musicList.filter((song) => song.name.toLowerCase().includes(term.toLowerCase()) || song.album.toLowerCase().includes(term.toLowerCase()) || song.artist.toLowerCase().includes(term.toLowerCase()));
        // return filteredList;
    }

    const handleSearch = async (event, term, accessToken) => {
        event.preventDefault();
        const data = await props.SpotifySearch.search(props.term, props.accessToken);
        props.setResults(data);
      };
    


    return (
        <div className={styles.searchHeader} style={{ backgroundImage: "linear-gradient(rgba(80, 79, 87, 0.6),rgba(50, 38, 126, 0.2)), url(/images/bandbgp.jpg)" }}>
            <div className={styles.searchbar} >
                <form 
                    className={styles.searchform} 
                    onSubmit={handleSearch}>
                    <input placeholder="Search" onChange={handleTermChange}></input>
                    <button type="submit">Let's Go</button>
                </form>
            </div>
        </div>
    )

}

export default SearchBar;