import React, { useContext } from "react";
import { DarkModeContext } from "../pages/_app";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import inittializingStyles from "../styles/Initializing.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Initializing() {
  const classes = useStyles();
  const darkMode = useContext(DarkModeContext);

  return (
    <div
      className={
        darkMode
          ? inittializingStyles["initializing-wrapper-light"]
          : inittializingStyles["initializing-wrapper-dark"]
      }
    >
      <div className={inittializingStyles["initializing-content"]}>
        <div className={classes.root}>
          <LinearProgress />
        </div>
        <div className={inittializingStyles["initializing-title"]}>
          <h1>Initializing Chat App...</h1>
        </div>
      </div>
    </div>
  );
}

export default Initializing;
