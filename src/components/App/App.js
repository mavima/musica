import React, {useState} from 'react';
import styles from "./App.module.css";
import SearchBar from '../SearchBar/SearchBar';
import Results from '../Results/Results';
import Playlist from '../Playlist/Playlist';

const musicList = [
  {
      name: "Old Song",
      artist: "Elvis",
      key: 1
  },
  {
      name: "Bad Song",
      artist: "Toto",
      key: 2
  },
  {
      name: "Good Song",
      artist: "Sting",
      key: 3
  },
  {
      name: "New Song",
      artist: "Taylor Swift",
      key: 4
  },
  {
      name: "My Song",
      artist: "Maria",
      key: 5
  },
]

function App() {

  const [track, setTrack] = useState();
  const [myList, setMyList] = useState([]);

  const removeFromList = (event) => {
    const id = parseInt(event.target.dataset.id);
    setMyList((prev) => {
      return prev.filter((song) => song.key !== id);
    });
  };

  return (
    <div className="App">
      <SearchBar musicList = {musicList} />
      <div className={styles.container}>
        <Results musicList = {musicList} myList = {myList} setMyList = {setMyList} removeFromList = {removeFromList}/>
        <Playlist myList = {myList} setMyList = {setMyList} removeFromList = {removeFromList}/>
      </div>
    </div>
  );
}

export default App;
