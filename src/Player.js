import React from "react";
import "./Player.css";
import Sidebar from "./Sidebar";
import Body from "./Body";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDataLayerValue } from "./DataLayer";
import Login from "./Login";
import Home from "./Home";
import Library from "./Library";
import Search from "./Search";
import Profile from "./Profile";
import CreatePlaylist from "./CreatePlaylist";

function Player({ spotify }) {
  const [{ token, playlistId }, dispatch] = useDataLayerValue();
  // console.log(token);
  const player = (
    <div>
      <div className="player__body">
        <div className="player__sidebar">
          <Sidebar />
        </div>
        <Body spotify={spotify} />
      </div>
    </div>
  );

  const playlistid = playlistId;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={token ? <Home /> : <Login />} />
        <Route path="/yourLibrary" element={token && <Library />} />
        <Route path="/search" element={token && <Search />} />
        <Route path="/playlists/" element={token && player} />
        <Route
          path="/playlists/createplaylist"
          element={token && <CreatePlaylist />}
        />
        <Route path={`/playlists/:${playlistid}`} element={token && player} />
        <Route path="/user/*" element={token && <Profile />} />
      </Routes>

      {/* <div className="player">{token && player}</div> */}
    </BrowserRouter>
  );
}

export default Player;
