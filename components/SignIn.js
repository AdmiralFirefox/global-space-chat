import React, { useEffect, useContext } from "react";
import { DarkModeContext, ToggleDarkModeContext } from "../pages/_app";
import WebLogo from "../assets/web-logo.svg";
import SunLight from "../assets/sunlight.svg";
import MoonDark from "../assets/moondark.svg";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import signInStyles from "../styles/SignIn.module.scss";

const SignInButton = withStyles(() => ({
  root: {
    color: "#fff",
    background: "hsl(214, 73%, 19%)",
    transition: "background 0.35s ease-in-out",
    marginTop: "1.5em",
    "&:hover": {
      background: "hsl(214, 73%, 25%)",
    },
  },
}))(Button);

function SignIn({ signInWithgoogle }) {
  const darkMode = useContext(DarkModeContext);
  const toggleDarkMode = useContext(ToggleDarkModeContext);

  useEffect(() => {
    document.getElementsByTagName("body")[0].className =
      signInStyles["bg-sign-in"];
  }, []);

  return (
    <div className={signInStyles["sign-in-wrapper"]}>
      <div
        className={
          darkMode
            ? signInStyles["sign-in-content-light"]
            : signInStyles["sign-in-content-dark"]
        }
      >
        <div>
          <img
            src={WebLogo}
            height="55"
            width="55"
            className={signInStyles["sign-in-logo"]}
          />
        </div>
        <div className={signInStyles["sign-in-title"]}>
          <h1>
            Welcome to <br />
            Global Space Chat
          </h1>
        </div>
        <div>
          <SignInButton variant="contained" onClick={signInWithgoogle}>
            Sign In with Google
          </SignInButton>
        </div>
        <div className={signInStyles["sign-in-darkmode-toggle"]}>
          <IconButton onClick={toggleDarkMode}>
            {darkMode ? (
              <img src={MoonDark} height="45" width="45" />
            ) : (
              <img src={SunLight} height="45" width="45" />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
