import React, { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import "../styles/globals.scss";
import Meta from "../components/Meta/Meta";

export const DarkModeContext = createContext();
export const ToggleDarkModeContext = createContext();

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  //Save Dark Mode Changes
  useEffect(() => {
    const json = localStorage.getItem("darkMode");
    const saveDarkMode = JSON.parse(json);

    if (saveDarkMode) {
      setDarkMode(saveDarkMode);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(darkMode);
    localStorage.setItem("darkMode", json);
  }, [darkMode]);

  return (
    <React.Fragment>
      <Meta />
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <DarkModeContext.Provider value={darkMode}>
          <ToggleDarkModeContext.Provider value={toggleDarkMode}>
            <Component {...pageProps} />
          </ToggleDarkModeContext.Provider>
        </DarkModeContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
