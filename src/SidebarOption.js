import React from "react";
import { useDataLayerValue } from "./DataLayer";
import "./SidebarOption.css";
import { spotify } from "./spotify";
import { NavLink } from "react-router-dom";
function SidebarOption({ title, Icon }) {
  const [{ playlists, playlistId }, dispatch] = useDataLayerValue();

  // console.log(playlists?.items?.map((item) => console.log(item.name, item.id)));
  const getPlaylistSongs = () => {
    const listId = playlists?.items
      ?.filter((item) => item.name === title)
      .reduce((i, record) => record.id, 0);
    // console.log(listId);

    dispatch({ type: "SET_PLAYLISTID", playlistId: listId });
    // console.log(playlistId)  ;
    spotify.getPlaylist(listId).then((response) => {
      dispatch({ type: "SET_DISCOVER_WEEKLY", discover_weekly: response });
    });
  };

  // const activeHome = "sidebarOption__home";
  // const activeLibrary = "sidebarOption__library";

  return (
    <div className="sidebarOption">
      {/* {Icon && <Icon className="sidebarOption__Icon" />} */}
      {Icon ? (
        <>
          <Icon className="sidebarOption__Icon" />
          <h4>{title}</h4>
        </>
      ) : (
        <i onClick={getPlaylistSongs}>
          <strong>
            <NavLink
              to={"/playlists/" + playlistId}
              style={{ textDecoration: "none", color: "gray" }}
            >
              {title}
            </NavLink>
          </strong>
        </i>
      )}
      {/* <p onClick={getPlaylistSongs}>{title}</p> */}
    </div>
  );
}

export default SidebarOption;
