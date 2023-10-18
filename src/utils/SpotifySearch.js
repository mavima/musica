import React, {useState} from 'react';



const SpotifySearch = async (term, accessToken) => {

    const [albums, setAlbums] = useState([]);

    console.log(`Searching Spotify for ${term}`);
    console.log(`Searching data with ${accessToken}`);

    

    const resultParameters = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },

    }

    // Get request using search to get the Artist / track / album ID
    const artistID = await fetch(`https://api.spotify.com/v1/search?q=${term}&type=artist`, resultParameters)
    .then(response => response.json())
    .then((data) => {
        return data.artists.items[0].id  });

    const responseAlbums = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`, resultParameters)
    .then(response => response.json())
    .then(data => {
        setAlbums(data.items);
    })
   
    
  

    const trackID = await fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, resultParameters)
    .then(response => response.json())
    .then((data) => {
        return data.tracks.items[0].id
        // return data.tracks.items.map((track) => ({
        //         name: track.name,
        //         artist: track.artists[0].name,
        //         album: track.album.name,
        //         uri: track.uri
        //     }));
        
    });
    return responseAlbums;

    // Get request using search to get the artist / track / album
}




export default SpotifySearch;