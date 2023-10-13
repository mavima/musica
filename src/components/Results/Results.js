import React, { useState } from 'react';
import styles from "./Results.module.css";
import Track from '../Track/Track.js';


const Results = (props) => {

    if (props.results) {
        return (
            <div className={styles.results}>
                <h2>Results</h2>
                {
                    props.results.map(song =>
                            <Track song = {song} key = {song.id} addToList = {props.addToList} removeFromList={props.removeFromList}/>
                        )
                }
            </div>
        )
    }

}

export default Results;