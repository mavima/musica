import React, { useState, useEffect, useCallback } from 'react';
import styles from "./App.module.css";
import SearchBar from '../SearchBar/SearchBar';
import Results from '../Results/Results';
import Playlist from '../Playlist/Playlist';
import Spotify from "../../utils/Spotify";

function App() {

  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_ID;
  const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_SECRET;

  const [track, setTrack] = useState();
  const [myList, setMyList] = useState([]);
  const [results, setResults] = useState([]);
  const [listName, setListName] = useState("My new playlist");
  const [term, setTerm] = useState("");
  const [accessToken, setAccessToken] = useState("");
  // const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
  }, []);

  const handleTermChange = (event) => {
      setTerm(event.target.value);
  }

  const resultParameters = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    },

}

  const search = useCallback((term) => {
    Spotify.search(term).then(setResults);
  }, []);
  
  const updateName = useCallback((name) => {
    setListName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    const trackUris = myList.map((track) => track.uri); 
    Spotify.savePlaylist(listName, trackUris).then(() => {
      setListName(listName);
      setMyList([]);
    });
  }, [listName, myList]);
  
    // Get request using search to get the Artist / track / album ID
    // const artistID = await fetch(`https://api.spotify.com/v1/search?q=${term}&type=artist`, resultParameters)
    // .then(response => response.json())
    // .then((data) => {
    //     return data.artists.items[0].id  });

    // const responseAlbums = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`, resultParameters)
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data.items);
    // })


  const addToList = (targetId) => {
    const songs = results;
    if (myList.find(song => song.id === targetId)) {
        alert("It's already on your list");
        return;
    } else {
        songs.find((song) =>  {
            if (song.id === targetId) {
              setMyList((prev) => {
                return [song, ...prev];
            })};
        });
    } 
}

  const removeFromList = (targetId) => {
    setMyList((prev) => {
      return prev.filter((song) => song.id !== targetId);
    });
  };

  return (
    <div className="App">

      <SearchBar 
        accessToken = {accessToken}
        handleTermChange={handleTermChange} 
        setTerm = {setTerm} 
        term = {term}
        results = {results}
        setResults = {setResults}
        onSearch = {search}
        onAdd = {addToList}
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
          onNameChange = {updateName}
          listName = {listName} 
          setListName = {setListName}
          savePlaylist = {savePlaylist}
        />
      </div>
    </div>
  );
}

export default App;
