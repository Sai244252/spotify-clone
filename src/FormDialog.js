import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CancelIcon from "@material-ui/icons/Cancel";
import { image } from "./Header";
import { spotify } from "./spotify";
import { useDataLayerValue } from "./DataLayer";
import "./FormDialog.css";

export default function FormDialog({
  openFormDialog,
  myPlaylistText,
  trackUris,
}) {
  const [open, setOpen] = useState(true);
  const [playlistName, setPlaylistName] = useState(myPlaylistText);
  const [description, setDescription] = useState();
  const [playlistId, setPlaylistId] = useState();
  const [{ user }] = useDataLayerValue();

  const createPlaylist = () => {
    const userId = user?.id;

    const options = {
      name: playlistName,
      description: description,
    };

    spotify.createPlaylist(userId, options).then((data) => {
      console.log(data);
      const id = data?.id;
      setPlaylistId(id);
      console.log(id, playlistId);
      trackUris !== null && addItemsToCurrentPlaylist(id);
    });
  };

  const addItemsToCurrentPlaylist = (id) => {
    const playlist_id = id;
    const uris = trackUris;
    console.log(playlist_id, uris);
    spotify
      .addTracksToPlaylist(playlist_id, uris)
      .then((data) => console.log(data));
  };

  const handleClose = () => {
    setOpen(false);
    openFormDialog();
  };

  const setName = (e) => setPlaylistName(e.target.value);

  const setDesc = (e) => setDescription(e.target.value);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <div
          className="form__dialog"
          style={{ backgroundColor: "#282828", color: "white" }}
        >
          <DialogTitle style={{ display: "flex" }}>
            Edit Details
            <CancelIcon
              onClick={handleClose}
              style={{
                fontSize: "larger",
                color: "red",
                marginLeft: "30vw",
                cursor: "pointer",
              }}
            />
          </DialogTitle>
          <DialogContent
            className="form__dialog"
            style={{ width: "40vw", height: "30vh", display: "flex" }}
          >
            <div
              className="form_dialog_input"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <img
                src={image}
                alt="poster"
                style={{
                  minWidth: "10rem",
                  minHeight: "10rem",
                  border: "1px solid gray",
                  borderRadius: "25px",
                  margin: "20px",
                }}
              />
              <div>
                <input
                  value={playlistName}
                  required
                  className="form__dialog"
                  onChange={setName}
                  type="text"
                  id="playlist_name"
                  placeholder="Enter name of playlist ..."
                  autoFocus
                  style={{
                    padding: "6px",
                    height: "5vh",
                    width: "15vw",
                    borderRadius: "10px",
                    margin: "10px",
                  }}
                />
                <textarea
                  className="form__dialog"
                  rows="6"
                  cols="50"
                  onChange={setDesc}
                  placeholder="Enter description..."
                  style={{
                    width: "15vw",
                    borderRadius: "10px",
                    margin: "10px",
                    padding: "6px",
                  }}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button style={{ color: "white" }} onClick={handleClose}>
              Cancel
            </Button>
            <Button style={{ color: "white" }} onClick={createPlaylist}>
              Create Playlist
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
