import React, { useEffect } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromUrl, spotify } from "./spotify";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";
import Footer from "./Footer";

function App() {
  const [{ token, playlistId }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    const _token = hash.access_token;
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      spotify.setAccessToken(_token);
      // console.log(token, _token);

      spotify.getMe().then((user) => {
        // console.log(user);
        dispatch({ type: "SET_USER", user: user });
      });

      // console.log(spotify.getAccessToken());

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });

      // console.log(playlistId);
      spotify.getPlaylist(playlistId).then((response) => {
        dispatch({ type: "SET_DISCOVER_WEEKLY", discover_weekly: response });
      });
    }
    // console.log(user);

    // console.log("I have a token ", token);
  }, [playlistId, dispatch, token]);

  return (
    <div className="app">
      {!token && <Login />}
      {token && (
        <>
          <Player spotify={spotify} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
