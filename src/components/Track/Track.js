import React from 'react';
import styles from "./Track.module.css";
import {IoIosAddCircle, IoIosRemoveCircle} from 'react-icons/io';

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
                <p className={styles.artist}>{props.song.artist} - {props.song.album}</p>
            </div>
            <div>
            <p className={styles.trackMark} ><IoIosAddCircle onClick={handleAdd} data-id={props.song.id} /></p>
            <p className={styles.trackMark} ><IoIosRemoveCircle onClick={handleRemove} data-id={props.song.id} /></p>
            </div>
        </div>
        
    )
}

export default Track;