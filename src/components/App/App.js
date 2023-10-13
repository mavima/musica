import React, {useState} from 'react';
import styles from "./App.module.css";
import SearchBar from '../SearchBar/SearchBar';
import Results from '../Results/Results';
import Playlist from '../Playlist/Playlist';

const musicList = [
  {
      name: "Old Song",
      artist: "Elvis",
      album: "E-album",
      id: 1
  },
  {
      name: "Bad Song",
      artist: "Toto",
      album: "O-album",
      id: 2
  },
  {
      name: "Good Song",
      artist: "Sting",
      album: "S-album",
      id: 3
  },
  {
      name: "New Song",
      artist: "Taylor Swift",
      album: "T-album",
      id: 4
  },
  {
      name: "My Song",
      artist: "Maria",
      album: "M-album",
      id: 5
  },
]

function App() {

  const [track, setTrack] = useState();
  const [myList, setMyList] = useState([]);
  const [results, setResults] = useState([]);
  const [listName, setListName] = useState("My playlist");
  const [term, setTerm] = useState("");

  const handleTermChange = (event) => {
      setTerm(event.target.value);
  }

  const addToList = (event) => {
    const TargetId = parseInt(event.target.dataset.id);
    const mySongs = myList;
    const songs = results;
    if (mySongs.find(song => song.id === TargetId)) {
        return;
    } else {
        songs.find((song) =>  {
            if (song.id === TargetId) {
              setMyList((prev) => {
                return [song, ...prev];
            })};
        });
    } 
}

  const removeFromList = (event) => {
    const targetId = parseInt(event.target.dataset.id);
    setMyList((prev) => {
      return prev.filter((song) => song.id !== targetId);
    });
  };

  return (
    <div className="App">
      <SearchBar 
        musicList = {musicList} 
        handleTermChange={handleTermChange} 
        setTerm = {setTerm} 
        term = {term}
        results = {results}
        setResults = {setResults}
      />
      <div className={styles.container}>
        <Results 
          results = {results} 
          addToList = {addToList} 
          removeFromList = {removeFromList}
        />
        <Playlist 
          myList = {myList} 
          removeFromList = {removeFromList} 
          listName = {listName} 
          setListName = {setListName}
          handleTermChange = {handleTermChange}
          term = {term}
        />
      </div>
    </div>
  );
}

export default App;
