import React, { useEffect, useReducer, useState } from "react";
import "./Library.css";
import Sidebar from "./Sidebar";
import { spotify } from "./spotify";
import Header from "./Header";
import Box from "./Box";

function Library() {
  const [title, setTitle] = useState();
  const [library, setLibrary] = useState();

  const addClassList = (param) => {
    document.getElementById(param).classList.add("library__box__text__focus");
  };

  const removeClassList = (param1, param2) => {
    document
      .getElementById(param1)
      .classList.remove("library__box__text__focus");
    document
      .getElementById(param2)
      .classList.remove("library__box__text__focus");
  };

  function setAlbums() {
    setTitle("Albums");
    spotify.getMySavedAlbums().then((data) => {
      const albums = data?.items?.map((item) => item.album);
      setLibrary(albums);
    });
    addClassList("albums");
    removeClassList("tracks", "shows");
  }

  function setTracks() {
    setTitle("Tracks");
    spotify.getMySavedTracks().then((data) => {
      const tracks = data?.items?.map((item) => item?.track);
      setLibrary(tracks.map((track) => track.album));
    });
    addClassList("tracks");
    removeClassList("albums", "shows");
  }

  function setShows() {
    setTitle("Shows");
    spotify.getMySavedShows().then((data) => {
      const shows = data?.items;
      console.log(shows);
      setLibrary(shows?.map((show) => show.show));
    });
    addClassList("shows");
    removeClassList("albums", "tracks");
  }

  useEffect(() => {
    setTracks();
  }, []);

  /* 

Albums :  data?.items?.map(item => img : item?.album?.images[0]?.url, name : item?.album?.name)

Tracks : data?.items?.map(item => img : item?.track?.album?.images[0].url , name:item?.track?.album?.name)

Shows : data?.items?.map(item => img : item?.show?.images[0]?.url} , name : item?.show?.name))

*/

  return (
    <div className="library">
      <div>
        <Sidebar className="library__sidebar" />
      </div>
      <div className="library__body">
        <Header spotify={spotify} hideSearch />
        <h1 className="library__title">Library - {title}</h1>
        <div className="library__box">
          <div className="library__box__title">
            <h3 className="library__box__text" id="albums" onClick={setAlbums}>
              Albums
            </h3>
            <h3 className="library__box__text" id="tracks" onClick={setTracks}>
              Tracks
            </h3>
            <h3 className="library__box__text" id="shows" onClick={setShows}>
              Shows
            </h3>
          </div>
          <hr className="library__line" />
          <div className="library__box__info">
            {library?.length > 0 ? (
              library?.map((lib) => (
                <Box img={lib?.images[0]?.url} name={lib?.name} />
              ))
            ) : (
              <p className="no__content">
                No such {title} are present at the moment.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;
