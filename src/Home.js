import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { spotify } from "./spotify";
import "./Home.css";
import Box from "./Box";

function Home() {
  let [followedArtists, setFollowedArtists] = useState("");
  let [recommendations, setRecommendations] = useState(null);
  let [recentlyPlayed, setRecentlyPlayed] = useState(null);
  let [newReleases, setNewReleases] = useState(null);

  useEffect(() => {
    const albumIds = [];
    const recent = [];
    const newRelease = [];
    //followed Artists
    spotify.getFollowedArtists().then((artistsFollowed) => {
      setFollowedArtists(artistsFollowed?.artists);
    });
    const seed_artists = ["4zCH9qm4R2DADamUHMCa6O"];
    const seed_tracks = ["6yvxu91deFKt3X1QoV6qMv"];
    const seed_genres = ["hip-hop,indian,movies"];

    //Recommendations
    spotify
      .getRecommendations({
        seed_artists,
        seed_tracks,
        seed_genres,
        limit: "10",
      })
      .then((data) => {
        data.tracks?.map((track) => {
          //   console.log(track.album);
          albumIds.push(track.album);
          setRecommendations(albumIds);
        });
      });

    //recenlty Played tracks
    spotify.getMyRecentlyPlayedTracks()?.then((data) => {
      data?.items?.map((item) => recent.push(item?.track?.album));
      setRecentlyPlayed(recent);
      //   console.log(data?.items?.map((item) => item?.track?.album));
    });

    // recentlyPlayed?.filter(recent => recent?.)

    //get new releases
    spotify.getNewReleases({ country: ["IN"] })?.then((data) =>
      data?.albums?.items?.map((item) => {
        newRelease.push(item);
        setNewReleases(newRelease);
      })
    );
    // console.log(newReleases);
  }, []);

  return (
    <div className="home">
      <div>
        <Sidebar className="home__sidebar" />
      </div>
      <div className="home__body">
        <Header spotify={spotify} />
        <h1>Welcome To Spotify!!</h1>

        <div className="home__box">
          <div className="home__box__title">
            <h3 className="home__box__text">Recently Played</h3>
          </div>
          <hr className="home__line" />
          <div className="home__box__info">
            {recentlyPlayed ? (
              recentlyPlayed
                ?.slice(0, 5)
                ?.map((recent) => (
                  <Box
                    img={recent?.images[0]?.url}
                    name={recent?.name}
                    albumTrack={recent?.id}
                  />
                ))
            ) : (
              <h3>No recentlty played Tracks/Albums</h3>
            )}
          </div>
        </div>

        <div className="home__box">
          <div className="home__box__title">
            <h3 className="home__box__text">New Releases</h3>
          </div>
          <hr className="home__line" />
          <div className="home__box__info">
            {newReleases?.map((release) => (
              <Box img={release.images[0].url} name={release.name} />
            ))}
          </div>
        </div>

        <div className="home__box">
          <div className="home__box__title">
            <h3 className="home__box__text"> Artists you're following ... </h3>
          </div>
          <hr className="home__line" />

          <div className="home__box__info">
            {followedArtists?.items
              ?.slice(0, 5)
              ?.sort((i1, i2) => i1.popularity < i2.popularity)
              ?.map((item) => (
                <Box img={item?.images[0]?.url} name={item.name} id={item.id} />
                //idead to reuse a card component to display thesse
              ))}
          </div>
        </div>

        <div className="home__box">
          <div className="home__box__title">
            <h3 className="home__box__text"> Recommendations</h3>
          </div>
          <hr className="home__line" />

          <div className="home__box__info">
            {recommendations?.map((item) => (
              <Box
                img={item?.images[0]?.url}
                name={item?.name}
                id={item?.id}
                spotifyUrl={item?.external_urls?.spotify}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
