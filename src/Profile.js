import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDataLayerValue } from "./DataLayer";
import Header from "./Header";
import "./Profile.css";
import Sidebar from "./Sidebar";
import { spotify } from "./spotify";

const Profile = () => {
  const location = useLocation();
  const [{ user }, dispatch] = useDataLayerValue();
  const [profile, setProfile] = useState();
  const [playlistsTotal, setPlaylistsTotal] = useState();
  const [following, setFollowing] = useState();

  useEffect(() => {
    const path = location.pathname;

    if (path.includes("Log%20out")) {
      dispatch({ type: "CLEAR_TOKEN" });
    } else {
      setProfile(user);
    }

    spotify?.getUserPlaylists()?.then((data) => {
      const playlistsTotal = data?.total;
      setPlaylistsTotal(playlistsTotal);
    });

    spotify?.getFollowedArtists()?.then((data) => {
      const following = data?.artists?.total;
      setFollowing(following);
    });
  }, []);

  return (
    <div className="profile">
      <div className="profile__sidebar">
        <Sidebar />
      </div>
      <div className="profile__body">
        <Header />

        <div className="profile__box">
          <div className="profile__box__title">
            <h1 className="profile__box__text">Profile</h1>
          </div>
          <hr className="profile__line" />
          <div className="profile__box__info">
            <img
              className="profile__box__img"
              src={profile?.images[0].url}
              alt="profile"
            />
            <div className="profile__info">
              <h4>Profile</h4>
              <p className="profile__text"> {profile?.display_name}</p>
              <i>
                {playlistsTotal} Public Playlists, Following :{following}
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
