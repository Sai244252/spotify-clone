import React from "react";
import { useDataLayerValue } from "./DataLayer";
import "./Songrow.css";

function Songrow({ track = "test" }) {
  const [{}, dispatch] = useDataLayerValue();

  const playSelectedSong = () => {
    // console.log(track);
    dispatch({ type: "SET_SELECTED_SONG", selectedSong: track.id });
  };

  return (
    <div className="songRow" onClick={playSelectedSong}>
      <img className="songRow__album" src={track.album.images[0].url} alt="" />
      <div className="songRow__info">
        <h1>{track.name}</h1>
        <p>
          {track.artists.map((artist) => artist.name).join(",")}
          {track.album.name}
        </p>
      </div>
    </div>
  );
}

export default Songrow;
