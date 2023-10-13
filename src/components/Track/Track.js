import React from 'react';
import styles from "./Track.module.css";

const Track = (props) => {

    const handleRemove = (e) => {
        props.removeFromList(e);
    }

    return (
        <div className={styles.track} >
            <div className={styles.trackText}>
                <p className={styles.song}>{props.music.name}</p>
                <p className={styles.artist}>{props.music.artist}</p>
            </div>
            <div>
            <p className={styles.trackMark} onClick={props.addToList} data-id={props.music.key}>+</p>
            <p className={styles.trackMark} onClick={handleRemove} data-id={props.music.key}>x</p>
            </div>
        </div>
        
    )
}

export default Track;