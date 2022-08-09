import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import "./CreatePlaylist.css";
import Header, { image } from "./Header";
import { useDataLayerValue } from "./DataLayer";
import EditIcon from "@material-ui/icons/Edit";
import FormDialog from "./FormDialog";
import { spotify } from "./spotify";
import PlaylistOption from "./PlaylistOption";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Table from "react-bootstrap/Table";

function CreatePlaylist() {
  const [{ playlistsTotal, user }] = useDataLayerValue();

  const [formDialogOpened, setFormDialogOpened] = useState(false);
  const [topTracks, setTopTracks] = useState();
  const [playlistItems, setPlaylistItems] = useState();
  const [selectedTracks, setSelectedTracks] = useState([]);

  const openFormDialog = () => {
    setFormDialogOpened(!formDialogOpened);
  };

  const addToPlaylist = (track, id) => {
    const t = [];
    if (selectedTracks?.length > 0) {
      let existed = false;
      selectedTracks?.map((item) => {
        if (item.id === id) {
          existed = true;
          alert("Track already added to playlist ...");
        }
      });
      !existed && t.push(track) && selectedTracks.push(track);
    } else if (selectedTracks?.length === 0) {
      selectedTracks.push(track);
      t.push(track);
    }

    const tracks = t;
    setSelectedTracks(selectedTracks);
    updatePlaylist(tracks);
  };

  const removeFromPlaylist = (trackIndex) => {
    const filteredPlaylist = selectedTracks.filter(
      (track, index) => index !== trackIndex
    );

    const tracks = filteredPlaylist;
    setSelectedTracks(tracks);
    updatePlaylist(tracks);
  };

  useEffect(() => {
    !topTracks &&
      spotify.getMyTopTracks({ limit: 50 }).then((data) => {
        const topTracks = data?.items;
        setTopTracks(topTracks);
      });
    updatePlaylist();
  }, [playlistItems, updatePlaylist, selectedTracks]);

  function updatePlaylist(tracks = selectedTracks) {
    // console.log(tracks);
    setPlaylistItems(tracks);
  }

  return (
    <div className="create__playlist">
      <Sidebar />
      <div className="create__playlist__body">
        <div className="create__playlist__top">
          <Header />
        </div>
        <div className="create__playlist__bottom">
          <div className="create__playlist__info">
            <img src={image} alt="playlist" className="create__playlist__img" />

            <div className="info">
              <h4>Playlist</h4>
              <p className="myplaylist" onClick={openFormDialog}>
                My Playlist #{1 + playlistsTotal} <EditIcon fontSize="large" />
              </p>
              <h3>{user?.display_name}</h3>
            </div>
          </div>

          <hr style={{ margin: "5%", opacity: "0.5" }} />

          {playlistItems?.length > 0 && (
            <div className="addToPlaylist">
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>TITLE</th>
                    <th>ALBUM</th>
                    <th>
                      <AccessTimeIcon fontSize="small" />
                    </th>
                    <th>Remove</th>
                    <th>Play</th>
                  </tr>
                </thead>
                <tbody>
                  {playlistItems.map((item, index) => (
                    <PlaylistOption
                      removeFromPlaylist={removeFromPlaylist}
                      key={index}
                      index={index}
                      title={item?.name}
                      album={item?.album?.name}
                      duration={item?.duration_ms}
                      image={item?.album?.images[0].url}
                      spotifyUri={item?.uri}
                    />
                  ))}
                </tbody>
              </Table>
            </div>
          )}
          <br />
          <h2>Add your top Tracks to playlist..</h2>
          <hr style={{ margin: "5%", opacity: "0.5" }} />
          {topTracks?.length > 0 ? (
            <div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>TITLE</th>
                    <th>ALBUM</th>
                    <th>
                      <AccessTimeIcon fontSize="small" />
                    </th>
                    <th>Add</th>
                    <th>Play</th>
                  </tr>
                </thead>
                <tbody>
                  {topTracks?.map((topTrack, index) => (
                    <PlaylistOption
                      key={index}
                      addItemToPlaylist={addToPlaylist}
                      topTrack={topTrack}
                      index={index}
                      title={topTrack?.name}
                      album={topTrack?.album?.name}
                      duration={topTrack?.duration_ms}
                      image={topTrack?.album?.images[0].url}
                      spotifyUri={topTrack?.uri}
                    />
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p>No Tracks available currently...</p>
          )}
        </div>
        {formDialogOpened && (
          <FormDialog
            openFormDialog={openFormDialog}
            myPlaylistText={`My Playlist #${1 + playlistsTotal}`}
            trackUris={selectedTracks.map((track) => track?.uri)}
            className="formDialog"
          />
        )}
      </div>
    </div>
  );
}

export default CreatePlaylist;
