import React, { useState } from 'react';
import styles from "./Results.module.css";
import Track from '../Track/Track.js';


const Results = (props) => {

    const addToList = (event) => {
        const id = parseInt(event.target.dataset.id);
        const mySongs = props.myList;
        const songs = props.musicList;
        if (mySongs.find(song => song.key === id)) {
            return;
        } else {
            songs.find((song) =>  {
                if (song.key === id) {
                props.setMyList((prev) => {
                    return [song, ...prev];
                })};
            });
        } 
    }
    

    if (props.musicList) {
        return (
            <div className={styles.results}>
                <h2>Results</h2>
                {
                    props.musicList.map(music =>
                            <Track music = {music} addToList = {addToList} removeFromList={props.removeFromList}/>
                        )
                }
            </div>
        )
    }

}

export default Results;