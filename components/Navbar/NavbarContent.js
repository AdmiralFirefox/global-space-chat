import React, { useState, useContext } from "react";
import { DarkModeContext, ToggleDarkModeContext } from "../../pages/_app";
import MoonDark from "../../assets/moondark.svg";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Sunlight from "../../assets/sunlight.svg";
import CardActionArea from "@material-ui/core/CardActionArea";
import navbarContentStyles from "../../styles/Navbar/NavbarContent.module.scss";

const useStyles = makeStyles({
  list: {
    width: "15em",
  },
  fullList: {
    width: "auto",
  },
  darkBG: {
    background: "#353535", //Change background of Drawer
  },
  lightBG: {
    background: "#fffded", //Change background of Drawer
  },
});

export default function NavBarContent({ handleOpen }) {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
  });

  const darkMode = useContext(DarkModeContext);
  const toggleDarkMode = useContext(ToggleDarkModeContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  //Drawer Content
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div
        className={
          darkMode
            ? navbarContentStyles["navbar-content-wrapper-light"]
            : navbarContentStyles["navbar-content-wrapper-dark"]
        }
      >
        <div>
          <IconButton style={{ marginTop: "0.15em" }} onClick={toggleDarkMode}>
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
        </div>
        <CardActionArea
          className={navbarContentStyles["navbar-logout"]}
          onClick={handleOpen}
        >
          <h2>Log Out</h2>
        </CardActionArea>
      </div>
    </div>
  );

  const navIcon = {
    fill: "#fff",
    fontSize: "1.9rem",
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <MenuIcon style={navIcon} />
          </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            classes={{ paper: darkMode ? classes.lightBG : classes.darkBG }}
            //Change background of Drawer
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
