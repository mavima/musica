import React, { useState, useEffect } from 'react';
import styles from "./App.module.css";
import SearchBar from '../SearchBar/SearchBar';
import Results from '../Results/Results';
import Playlist from '../Playlist/Playlist';
// import SpotifySearch from './/../../utils/SpotifySearch';


function App() {

  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_ID;
  const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_SECRET;

  const [track, setTrack] = useState();
  const [myList, setMyList] = useState([]);
  const [results, setResults] = useState([]);
  const [listName, setListName] = useState("My playlist");
  const [term, setTerm] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);


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
  const SpotifySearch = {
  search (term, accessToken) {
      return fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, resultParameters)
      .then((response) => {
      return response.json();
  })
  .then((jsonResponse) => {
      if (jsonResponse.tracks) {
        console.log(jsonResponse.tracks.items[0].name);
          return jsonResponse.tracks.items.map((track) => ({
              id: track.id,
              // imageSrc: track.image_url,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
          }));
      } else {
          return;
      }
  });
  }}

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
        SpotifySearch = {SpotifySearch}
        accessToken = {accessToken}
        handleTermChange={handleTermChange} 
        setTerm = {setTerm} 
        term = {term}
        results = {results}
        setResults = {setResults}
        track = {track}
        setTrack = {setTrack}
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
