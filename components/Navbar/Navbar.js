import React, { useState, useContext } from "react";
import NavBarContent from "./NavbarContent";
import WebLogo from "../../assets/web-logo.svg";
import Sunlight from "../../assets/sunlight.svg";
import MoonDark from "../../assets/moondark.svg";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LogOutModal from "../Modal/LogOutModal";
import IconButton from "@material-ui/core/IconButton";
import { DarkModeContext, ToggleDarkModeContext } from "../../pages/_app";
import navStyles from "../../styles/Home.module.scss";

const LogOutButton = withStyles(() => ({
  root: {
    marginLeft: "0.3em",
    color: "#fff",
    background: "hsl(0, 100%, 37%)",
    transition: "background 0.35s ease-in-out",
    "&:hover": {
      background: "hsl(0, 100%, 47%)",
    },
  },
}))(Button);

function Navbar({ signOut }) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const darkMode = useContext(DarkModeContext);
  const toggleDarkMode = useContext(ToggleDarkModeContext);

  return (
    <div
      className={
        darkMode
          ? navStyles["navbar-content-light"]
          : navStyles["navbar-content-dark"]
      }
    >
      <LogOutModal
        openModal={openModal}
        handleClose={handleClose}
        signOut={signOut}
      />
      <div className={navStyles["navbar-title"]}>
        <img
          src={WebLogo}
          alt="Web Logo"
          width="45"
          height="45"
          className={navStyles["navbar-logo"]}
        />
        <h1>Global Space Chat</h1>
      </div>
      <div className={navStyles["navbar-items"]}>
        <div className={navStyles["navbar-items-user"]}>
          <IconButton onClick={toggleDarkMode}>
            {darkMode ? (
              <img
                src={MoonDark}
                alt="Toggle Dark Mode Logo"
                width="35"
                height="35"
              />
            ) : (
              <img
                src={Sunlight}
                alt="Toggle Dark Mode Logo"
                width="35"
                height="35"
              />
            )}
          </IconButton>
          <LogOutButton variant="contained" onClick={handleOpen}>
            Log Out
          </LogOutButton>
        </div>
        <div className={navStyles["nav-icon"]}>
          <NavBarContent handleOpen={handleOpen} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
