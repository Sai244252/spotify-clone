import React, { useEffect, useState } from "react";
import "./PlaylistOption.css";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { useDataLayerValue } from "./DataLayer";

function PlaylistOption({
  index,
  image,
  title,
  album,
  date_added,
  duration,
  addItemToPlaylist,
  removeFromPlaylist,
  topTrack,
  spotifyUri,
}) {
  const [songDuration, setSongDuration] = useState();
  const [{}, dispatch] = useDataLayerValue();

  useEffect(() => {
    setSongDuration(millisToMinutesAndSeconds(duration));
  }, []);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  const playTrack = () => {
    dispatch({ type: "SET_URI", uri: spotifyUri });
  };

  return (
    <tr className="playlist__option">
      {<td>{index + 1}</td>}
      <td className="title">
        <img className="playlist__img" src={image} alt="logo" />
        <p>{title}</p>
      </td>
      <td>{album}</td>
      {date_added && <p>{date_added}</p>}
      <td>{songDuration}</td>
      <td>
        {addItemToPlaylist ? (
          <AddIcon onClick={() => addItemToPlaylist(topTrack, topTrack?.id)} />
        ) : (
          <DeleteIcon
            onClick={() => {
              removeFromPlaylist(index);
            }}
          />
        )}
      </td>
      <td>
        <PlayArrowIcon onClick={playTrack} />
      </td>
    </tr>
  );
}

export default PlaylistOption;
