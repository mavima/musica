import React, { useState } from 'react';
import styles from "./Playlist.module.css";
import Track from '../Track/Track.js';

const Playlist = (props) => {


    const sendToSpotify = () => {
        console.log("sending to spotify");
    }


    const handleNameChange = (term) => {
        props.setListName(props.term);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleNameChange(props.term);
    }


    if (props.myList) {
        return (
            <div className={styles.playlist}>
                <h2>{props.listName}</h2>
                <form className={styles.nameform}>
                    <input placeholder="Name your list" onChange={props.handleTermChange}></input>
                    <button type="submit" onClick={handleSubmit}>Done!</button>
                </form>
                {
                    props.myList.map((song, index) =>
                            <Track song = {song} key = {song.id} removeFromList={props.removeFromList}/>
                        )
                }
                <button onClick={sendToSpotify}>Save in Spotify</button>
            </div>
        )
    }
}

export default Playlist;