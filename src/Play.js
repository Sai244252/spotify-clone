import React from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";
import { useDataLayerValue } from "./DataLayer";
import "./Play.css";

const Play = () => {
  const [{ token, uri }] = useDataLayerValue();

  const player = (
    <SpotifyWebPlayer
      className="spotifyPlayer"
      token={token}
      autoPlay={true}
      initialVolume={0.3}
      magnifySliderOnHover={true}
      // uris={[`spotify:track:${selectedSong}`]}
      uris={uri}
      showSaveIcon={true}
      play={uri}
      persistDeviceSelection={true}
      styles={{
        activeColor: "#fff",
        bgColor: "black",
        color: "#fff",
        loaderColor: "cyan",
        sliderColor: "cyan",
        trackArtistColor: "#ccc",
        trackNameColor: "#fff",
        errorColor: "red",
        height: 75,
        sliderHandleBorderRadius: 12,
        sliderHandleColor: "black",
        sliderHeight: 5,
        sliderTrackBorderRadius: 15,
        sliderTrackColor: "#ccc",
      }}
    />
  );

  return <div className="play">{uri && player}</div>;
};

export default Play;
