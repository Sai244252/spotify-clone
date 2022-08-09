import React, { useEffect } from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusician from "@material-ui/icons/LibraryMusic";
import { useDataLayerValue } from "./DataLayer";
import { NavLink } from "react-router-dom";
import AddBoxIcon from "@material-ui/icons/AddBox";

function Sidebar() {
  const [{ playlists, playlistsTotal }, dispatch] = useDataLayerValue();
  const showPlaylists = () => {
    // console.log(playlists?.items?.map((item) => item.name));
  };

  const addPlaylist = () => {};

  useEffect(() => {
    dispatch({ type: "SET_PLAYLISTS_TOTAL", playlistsTotal: playlists.total });
  }, []);

  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <div className="sidebar__top">
        <NavLink to="/home" className="sidebar_nav">
          <SidebarOption title="Home" Icon={HomeIcon} />
        </NavLink>
        <NavLink to="/search" className="sidebar_nav">
          <SidebarOption title="Search" Icon={SearchIcon} />
        </NavLink>
        <NavLink
          to="/yourLibrary"
          onClick={showPlaylists}
          className="sidebar_nav"
        >
          <SidebarOption title="Your library" Icon={LibraryMusician} />
        </NavLink>
      </div>
      <div className="sidebar__playlists">
        <strong className="sidebar__title">PLAYLISTS</strong>
        <NavLink to="/playlists/createPlaylist">
          <AddBoxIcon
            fontSize="medium"
            className="sidebar__create__playlist__icon "
            onClick={addPlaylist}
          />
        </NavLink>
      </div>
      <hr />
      <div className="sidebar__bottom">
        {/* {console.log(playlists)} */}
        {playlists?.items?.map((playlist) => (
          <SidebarOption title={playlist.name} />
        ))}
      </div>
      {/* <SidebarOption title="Hip Hop" />
      <SidebarOption title="Rock" />
      <SidebarOption title="RnB" /> */}
    </div>
  );
}

export default Sidebar;
