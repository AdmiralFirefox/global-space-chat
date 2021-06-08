import React, { useContext } from "react";
import { DarkModeContext } from "../pages/_app";
import Particles from "react-particles-js";

function ParticlesBackground() {
  const particleStyles = {
    position: "fixed",
    width: "100%",
    top: "0",
    zIndex: "-1",
  };

  const darkMode = useContext(DarkModeContext);

  return (
    <div style={particleStyles}>
      <Particles
        params={{
          particles: {
            number: {
              value: 160,
              density: {
                enable: false,
              },
            },
            color: {
              value: darkMode ? "#000" : "#fff",
            },
            size: {
              value: 4,
              random: true,
              anim: {
                speed: 4,
                size_min: 0.3,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              random: true,
              speed: 1,
              direction: "top",
              out_mode: "out",
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
              onclick: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              bubble: {
                distance: 250,
                duration: 2,
                size: 0,
                opacity: 0,
              },
              repulse: {
                distance: 400,
                duration: 4,
              },
            },
          },
        }}
        height="100vh"
      />
    </div>
  );
}

export default ParticlesBackground;
