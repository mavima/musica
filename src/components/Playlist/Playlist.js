import React from 'react';
import styles from "./Playlist.module.css";
import Track from '../Track/Track.js';

const Playlist = (props) => {


    if (props.myList) {
        return (
            <div className={styles.playlist}>
                <h2>Playlist</h2>
                {
                    props.myList.map((music, index) =>
                            <Track music = {music} id = {music.key} removeFromList={props.removeFromList}/>
                        )
                }
            </div>
        )
    }
}

export default Playlist;