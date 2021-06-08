import React, { useContext } from "react";
import { DarkModeContext } from "../pages/_app";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  rootDark: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "min(100%, 45em)",
    borderRadius: "0",
    marginBottom: "1em",
    background: "#444444",
    transition: "background 0.35s ease-in-out",
  },
  rootLight: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "min(100%, 45em)",
    borderRadius: "0",
    marginBottom: "1em",
    background: "#99AAB5",
    transition: "background 0.35s ease-in-out",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButtonDark: {
    padding: 10,
    color: "#7289DA",
    transition: "color 0.35s ease-in-out",
  },
  iconButtonLight: {
    padding: 10,
    color: "#0D2C54",
    transition: "color 0.35s ease-in-out",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function SendMessageForm({ handleOnSubmit, newMessage, handleOnChange }) {
  const darkMode = useContext(DarkModeContext);
  const classes = useStyles();

  return (
    <>
      <Paper
        component="form"
        className={darkMode ? classes.rootLight : classes.rootDark}
        onSubmit={handleOnSubmit}
      >
        <InputBase
          className={classes.input}
          placeholder="Send Message"
          value={newMessage}
          onChange={handleOnChange}
          inputProps={{
            "aria-label": "search google maps",
            style: {
              color: darkMode ? "#000" : "#fff",
              fontWeight: "500",
              transition: "color 0.35s ease-in-out",
            },
          }}
        />
        <IconButton
          type="submit"
          className={
            darkMode ? classes.iconButtonLight : classes.iconButtonDark
          }
          aria-label="search"
          disabled={!newMessage}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </>
  );
}

export default SendMessageForm;
