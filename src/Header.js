import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useDataLayerValue } from "./DataLayer";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { NavLink } from "react-router-dom";
import image from "./assets/playlist.PNG";

// import { Dropdown } from "rsuite";

const DropDown = ({ option }) => {
  return (
    <div className="header__dropdown">
      <NavLink to={`/user/${option}`} className="header__dropdown__nav">
        {option}
      </NavLink>
    </div>
  );
};

function Header({ hideSearch, hideUserDetails }) {
  const [{ user }] = useDataLayerValue();
  const [isDropdownOpened, setDropdownOpened] = useState(false);
  const [list] = useState(["Account", "Log out"]);
  const toggleDropDown = () => setDropdownOpened(!isDropdownOpened);
  const DropDownlist = () => list.map((li) => <DropDown option={li} />);

  return (
    <div className="header">
      {!hideSearch && (
        <div className="header__left">
          <SearchIcon />
          <input
            className="header__input"
            placeholder="Search for Artists, Songs, Podcasts..."
            type="text"
          />
        </div>
      )}

      {!hideUserDetails && (
        <div className="header__right__full">
          <div className="header__right">
            <Avatar src={user?.images[0].url} alt={user?.display_name} />
            <h4>{user?.display_name}</h4>
            <div className="header__right__down">
              <div onClick={toggleDropDown}>
                {!isDropdownOpened && (
                  <ArrowDropDownIcon className="header__icon" />
                )}
                {isDropdownOpened && (
                  <ArrowDropUpIcon className="header__icon" />
                )}
              </div>
            </div>
          </div>
          <div className="dropDown">{isDropdownOpened && <DropDownlist />}</div>
        </div>
      )}
    </div>
  );
}
export { image };

export default Header;
