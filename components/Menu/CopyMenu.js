import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useState, useContext } from "react";
import { DarkModeContext } from "../../pages/_app";
import { makeStyles } from "@material-ui/core/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";

const useStyles = makeStyles({
  rootDark: {
    position: "absolute",
    right: "0em",
    top: "0",
    color: "#99AAB5",
    transition: "color 0.35s ease-in-out",
  },
  rootLight: {
    position: "absolute",
    right: "0em",
    top: "0",
    color: "#444444",
    transition: "color 0.35s ease-in-out",
  },
  menuBgDark: {
    background: "#353535",
    color: "#fff",
    fontWeight: "bold",
  },
  menuBgLight: {
    background: "#fff",
    color: "#353535",
    fontWeight: "bold",
  },
});

function CopyMenu({ text }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  const darkMode = useContext(DarkModeContext);

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={openMenu}
        className={darkMode ? classes.rootLight : classes.rootDark}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        classes={{ paper: darkMode ? classes.menuBgLight : classes.menuBgDark }}
      >
        <CopyToClipboard text={text}>
          <MenuItem onClick={closeMenu}>Copy Text</MenuItem>
        </CopyToClipboard>
      </Menu>
    </>
  );
}

export default CopyMenu;
