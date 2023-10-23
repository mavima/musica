import React, {useState} from 'react';

const redirectUri = 'http://localhost:3000/';
const clientId = process.env.REACT_APP_SPOTIFY_ID;
let accessToken;


const Spotify = {

    getAccessToken() {
        if (accessToken) {
          return accessToken;
    }

    const accessTokenCheck = window.location.href.match(/access_token=([^&]*)/);
    const expiresInCheck = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenCheck && expiresInCheck) {
      accessToken = accessTokenCheck[1];
      const expiresIn = Number(expiresInCheck[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // Clears the parameters, you are able to get a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

    search (term) {
      const accessToken = Spotify.getAccessToken();
      return fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
      }
      })
      .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
        if (jsonResponse.tracks) {
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
    },

    savePlaylist(name, trackUris) {
      if (!name || !trackUris.length) {
        console.log("empty");
        return;
      }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;