import SpotifyWebApi from "spotify-web-api-js";
//documentation : https://developer.spotify.com/documentation/web-playback-sdk/quick-start/

export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "http://localhost:3000/";
const clientId = "e5a07861dc6e4b5fb4bcfc26dd070900";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-follow-read",
  "user-modify-playback-state",
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-library-modify",
  "user-follow-modify",
  "playlist-modify-private",
  "playlist-modify-public",
  "playlist-read-collaborative",
  "user-top-read",
  "app-remote-control",
  "ugc-image-upload",
];

/*
1. window.location.hash gets the address from address bar gets the indexOf(hash) , hash means => #
2. we get reponse as accessToken=someNumText&...
3. we decode the generated accessToken and assign and return the initial value in below function
 -> most of the scopes are used.
*/

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

//%20 is ascii num of space char.
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export const spotify = new SpotifyWebApi();
