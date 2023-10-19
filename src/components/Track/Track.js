import React from 'react';
import styles from "./Track.module.css";
import {IoIosAddCircle, IoIosRemoveCircle} from 'react-icons/io';

const Track = (props) => {

    const handleRemove = (e) => {
        console.log("Target is " + e.target.dataset.id);
        const targetId = e.target.dataset.id;
        props.removeFromList(targetId);
    }

    const handleAdd = (e) => {
        
        const targetId = e.target.dataset.id;
        props.addToList(targetId);
    }

    
    const address =  `https://open.spotify.com/track/${props.song.id}`;

    return (
        <div className={styles.track} key={props.song.id}>
            <div className={styles.trackText}>
                <a href = {address} target="blank">
                    <p className={styles.song}>{props.song.name}</p>
                </a>
                <p className={styles.artist}>{props.song.artist} - {props.song.album}</p>
            </div>
            <div>
            <p className={styles.trackMark} onClick={handleAdd} data-id={props.song.id}>+</p>
            <p className={styles.trackMark} onClick={handleRemove} data-id={props.song.id}>-</p>
            </div>
        </div>
        
    )
}

export default Track;