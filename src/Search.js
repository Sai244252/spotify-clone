import React, { useEffect, useReducer, useRef, useState } from "react";
import { useDataLayerValue } from "./DataLayer";
import "./Search.css";
import Sidebar from "./Sidebar";
import { spotify } from "./spotify";
import Header from "./Header";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";

function Search() {
  const [{ selectedSong }, dispatch] = useDataLayerValue();
  const searchInputRef = useRef();
  const typeInputRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("");

  useEffect(() => {
    spotify
      .searchTracks({ query: "Vikram" })
      .then((data) =>
        data?.tracks?.items?.map((item) => (
          <img src={item?.album?.images[0]?.url} alt="img" />
        ))
      );
  });

  const search = (e) => {
    e.preventDefault();
    spotify.searchTracks().then((data) => console.log(data));
  };

  const onTextChange = () => {
    // console.log(searchInputRef.current.value);
    // console.log(typeInputRef.current.value);
    setSearchTerm(searchInputRef.current.value);
    setSearchType(typeInputRef.current.value);
  };

  const onSearchItem = () => {
    // dispatch({type : "SET_SELECTED_SONG", selectedSong : })
  };

  return (
    <div className="search">
      <div>
        <Sidebar className="search__sidebar" />
      </div>
      <div className="search__body">
        <Header spotify={spotify} hideSearch />
        <h1>Search</h1>
        <form className="search__input" onSubmit={search}>
          <input
            ref={searchInputRef}
            onChange={onTextChange}
            type="text"
            name="Search"
            placeholder="Search for albums, tracks, and more..."
          />
          <select
            className="selectpicker"
            ref={typeInputRef}
            onChange={onTextChange}
          >
            <option value="Album">Album</option>
            <option value="Artist">Artist</option>
            <option value="Track">Track</option>
            <option value="Playlists">Playlists</option>
          </select>
          <button type="submit" className="search__icon">
            <SearchRoundedIcon onClick={onSearchItem} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Search;
