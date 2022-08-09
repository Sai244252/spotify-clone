import React from "react";
import "./Body.css";
import { useDataLayerValue } from "./DataLayer";
import Header, { image } from "./Header";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Songrow from "./Songrow";

function Body({ spotify }) {
  const decodeSymbols = (text) => {
    const decoded = text?.replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCharCode(parseInt(code, 16))
    );
    return decoded;
  };

  const [{ discover_weekly }, dispatch] = useDataLayerValue();

  const playThePlaylist = () =>
    dispatch({ type: "SET_URI", uri: discover_weekly?.uri });

  return (
    <div className="body">
      <Header spotify={spotify} />
      <div className="body__info">
        {discover_weekly?.images?.length > 0 ? (
          <img
            className="body__img"
            src={discover_weekly?.images[0]?.url}
            alt=""
          />
        ) : (
          <img src={image} className="body__img" alt="poster" />
        )}
        <div className="body__infoText">
          <h2>{discover_weekly?.name}</h2>
          <h4>{decodeSymbols(discover_weekly?.description)}</h4>
        </div>
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            onClick={playThePlaylist}
          />
          <FavoriteIcon font-size="large" />
          <MoreHorizIcon />
        </div>

        <div>
          {discover_weekly?.tracks?.items?.length > 0 ? (
            discover_weekly?.tracks?.items?.map((item) => (
              <Songrow track={item.track} />
            ))
          ) : (
            <h4 style={{ marginLeft: "5vw" }}>
              Please add items to your playlist.
            </h4>
          )}
          <hr className="body__bottom" />
        </div>
      </div>
    </div>
  );
}

export default Body;
