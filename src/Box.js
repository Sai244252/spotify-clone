import React from "react";
import "./Box.css";
import { useDataLayerValue } from "./DataLayer";

const Box = ({ img, name, albumTrack, spotifyUrl }) => {
  const [{ selectedSong }, dispatch] = useDataLayerValue();

  const box = (
    <div>
      <img className="box__img" src={img} alt={name} />
      <p className="box__text">{name}</p>
    </div>
  );

  return (
    <div className="box">
      <div className="box__artists">
        <div className="box__artists">{box}</div>
      </div>
    </div>
  );
};

export default Box;
