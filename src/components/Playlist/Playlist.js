import React, { useState, useCallback } from 'react';
import styles from "./Playlist.module.css";
import Track from '../Track/Track.js';

const Playlist = (props) => {

    const trackURIs = props.myList.map((track) => track.uri);

    const sendToSpotify = () => {
        props.savePlaylist();
    }

    const handleNameChange = useCallback(
        (event) => {
          props.onNameChange(event.target.value);
        },
        [props.onNameChange]
   );

    if (props.myList) {
        return (
            <div className={styles.playlist}>
                <h2>{props.listName}</h2>
                <form className={styles.nameform}>
                    <input placeholder="Name your list" onChange={handleNameChange}></input>
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