import React from 'react';
import styles from "./Track.module.css";

const Track = (props) => {

    const handleRemove = (e) => {
        props.removeFromList(e);
    }

    const handleAdd = (e) => {
        props.addToList(e);
    }

    return (
        <div className={styles.track} key={props.song.id}>
            <div className={styles.trackText}>
                <p className={styles.song}>{props.song.name}</p>
                <p className={styles.artist}>{props.song.artist}</p>
            </div>
            <div>
            <p className={styles.trackMark} onClick={handleAdd} data-id={props.song.id}>+</p>
            <p className={styles.trackMark} onClick={handleRemove} data-id={props.song.id}>x</p>
            </div>
        </div>
        
    )
}

export default Track;